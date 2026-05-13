import crypto from "node:crypto";

import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { prisma, hasDatabaseConfig } from "@/lib/prisma";
import {
  GENERIC_LOGIN_ERROR_MESSAGE,
  LOCKOUT_AFTER_ATTEMPTS,
  LOCKOUT_WINDOW_MS,
  REFRESH_COOKIE_NAME,
  REFRESH_TOKEN_MAX_AGE_SECONDS,
} from "@/lib/auth/constants";
import { setAccessCookie, setCsrfCookie, setRefreshCookie, clearAuthCookies } from "@/lib/auth/cookies";
import { createCsrfToken, validateCsrfToken } from "@/lib/auth/csrf";
import { signAdminAccessToken, verifyAdminAccessToken } from "@/lib/auth/jwt";
import { verifyPassword } from "@/lib/auth/password";
import { getClientIp, getUserAgent, isSameOriginRequest } from "@/lib/auth/request";
import { consumeLoginRateLimit } from "@/lib/auth/rate-limit";

export type AdminSessionUser = {
  id: number;
  email: string;
  role: "ADMIN";
};

type AdminRecordForAuth = {
  id: number;
  email: string;
  role: "ADMIN";
  passwordHash: string;
  lastLogin: Date | null;
  failedAttempts: number;
  lockedUntil: Date | null;
};

function isMissingPreparedStatementError(error: unknown) {
  return (
    error instanceof Error &&
    error.message.includes("prepared statement") &&
    error.message.includes("does not exist")
  );
}

async function withPrismaReconnectRetry<T>(operation: () => Promise<T>) {
  try {
    return await operation();
  } catch (error) {
    if (!isMissingPreparedStatementError(error)) {
      throw error;
    }

    await prisma.$disconnect().catch(() => undefined);
    return operation();
  }
}

function genericLoginErrorResponse(status = 401) {
  return NextResponse.json(
    {
      ok: false,
      message: GENERIC_LOGIN_ERROR_MESSAGE,
    },
    { status },
  );
}

export async function logAdminAuthEvent(input: {
  adminId?: number | null;
  email?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  eventType:
    | "LOGIN_SUCCESS"
    | "LOGIN_FAILED"
    | "LOGIN_LOCKED"
    | "LOGIN_RATE_LIMITED"
    | "LOGIN_SUSPICIOUS"
    | "SESSION_REFRESHED"
    | "LOGOUT"
    | "SESSION_REVOKED";
  details?: string | null;
}) {
  if (!hasDatabaseConfig()) {
    console.warn(`[auth:${input.eventType}]`, {
      email: input.email,
      ipAddress: input.ipAddress,
      userAgent: input.userAgent,
      details: input.details,
    });
    return;
  }

  await prisma.adminAuthLog.create({
    data: {
      adminId: input.adminId ?? null,
      email: input.email ?? null,
      ipAddress: input.ipAddress ?? null,
      userAgent: input.userAgent ?? null,
      eventType: input.eventType,
      details: input.details ?? null,
    },
  });
}

async function getAdminByEmail(email: string) {
  return prisma.admin.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      role: true,
      passwordHash: true,
      lastLogin: true,
      failedAttempts: true,
      lockedUntil: true,
    },
  }) as Promise<AdminRecordForAuth | null>;
}

async function createRefreshSession(input: {
  adminId: number;
  ipAddress: string;
  userAgent: string;
}) {
  const refreshToken = crypto.randomUUID();
  const expires = new Date(Date.now() + REFRESH_TOKEN_MAX_AGE_SECONDS * 1000);

  await prisma.adminSession.create({
    data: {
      sessionToken: refreshToken,
      userId: input.adminId,
      expires,
      ipAddress: input.ipAddress,
      userAgent: input.userAgent,
    },
  });

  return {
    refreshToken,
    expires,
  };
}

async function rotateRefreshSession(input: {
  sessionId: string;
  ipAddress: string;
  userAgent: string;
}) {
  const nextRefreshToken = crypto.randomUUID();
  const expires = new Date(Date.now() + REFRESH_TOKEN_MAX_AGE_SECONDS * 1000);

  const updated = await prisma.adminSession.update({
    where: { id: input.sessionId },
    data: {
      sessionToken: nextRefreshToken,
      expires,
      revokedAt: null,
      ipAddress: input.ipAddress,
      userAgent: input.userAgent,
    },
    include: {
      admin: {
        select: {
          id: true,
          email: true,
          role: true,
        },
      },
    },
  });

  return {
    session: updated,
    refreshToken: nextRefreshToken,
  };
}

async function getActiveAdminSessionByToken(refreshToken: string) {
  return withPrismaReconnectRetry(() =>
    prisma.adminSession.findUnique({
      where: { sessionToken: refreshToken },
      include: {
        admin: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    }),
  );
}

export async function issueAdminAuthCookies(
  response: NextResponse,
  admin: AdminSessionUser,
  refreshToken: string,
) {
  const accessToken = await signAdminAccessToken({
    userId: admin.id,
    role: admin.role,
  });
  const csrfToken = createCsrfToken();

  setAccessCookie(response, accessToken);
  setRefreshCookie(response, refreshToken);
  setCsrfCookie(response, csrfToken);
}

export async function requireAdminAccess() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("emsel_admin_access")?.value;

  const payload = accessToken ? await verifyAdminAccessToken(accessToken) : null;

  if (payload?.role === "ADMIN") {
    return payload;
  }

  if (!hasDatabaseConfig()) {
    redirect("/admin-login");
  }

  const refreshToken = cookieStore.get(REFRESH_COOKIE_NAME)?.value;

  if (!refreshToken) {
    redirect("/admin-login");
  }

  const session = await getActiveAdminSessionByToken(refreshToken);

  if (!session || session.revokedAt || session.expires <= new Date()) {
    redirect("/admin-login");
  }

  if (session.admin.role !== "ADMIN") {
    redirect("/admin-login");
  }

  return {
    userId: session.admin.id,
    role: session.admin.role,
  };
}

export async function assertAdminApiAccess(request: NextRequest) {
  const accessToken = request.cookies.get("emsel_admin_access")?.value;
  const payload = accessToken ? await verifyAdminAccessToken(accessToken) : null;

  if (!payload || payload.role !== "ADMIN") {
    const response = NextResponse.json(
      { ok: false, message: "Oturum süresi doldu. Lütfen tekrar giriş yapın." },
      { status: 401 },
    );
    clearAuthCookies(response);
    return {
      ok: false as const,
      response,
    };
  }

  if (!["GET", "HEAD", "OPTIONS"].includes(request.method)) {
    const csrfHeader = request.headers.get("x-csrf-token");

    if (!isSameOriginRequest(request) || !validateCsrfToken(request, csrfHeader)) {
      return {
        ok: false as const,
        response: NextResponse.json(
          { ok: false, message: "CSRF doğrulaması başarısız." },
          { status: 403 },
        ),
      };
    }
  }

  return {
    ok: true as const,
    admin: payload,
  };
}

export async function handleAdminLogin(request: NextRequest, body: {
  email?: string;
  password?: string;
  csrfToken?: string;
}) {
  if (!hasDatabaseConfig()) {
    return NextResponse.json(
      {
        ok: false,
        message: "Veritabanı bağlantısı henüz tanımlı değil.",
      },
      { status: 503 },
    );
  }

  if (!isSameOriginRequest(request) || !validateCsrfToken(request, body.csrfToken)) {
    return NextResponse.json(
      {
        ok: false,
        message: "CSRF doğrulaması başarısız.",
      },
      { status: 403 },
    );
  }

  const ipAddress = getClientIp(request);
  const userAgent = getUserAgent(request);
  const rateLimit = consumeLoginRateLimit(ipAddress);

  if (!rateLimit.allowed) {
    await logAdminAuthEvent({
      email: body.email?.trim().toLowerCase() ?? null,
      ipAddress,
      userAgent,
      eventType: "LOGIN_RATE_LIMITED",
      details: `IP dakika limiti aşıldı. Retry after ${rateLimit.retryAfterSeconds}s`,
    });

    const response = genericLoginErrorResponse(429);
    response.headers.set("Retry-After", String(rateLimit.retryAfterSeconds));
    return response;
  }

  if (rateLimit.suspicious) {
    console.warn(`[auth-alert] Suspicious login activity detected from ${ipAddress}`);
    await logAdminAuthEvent({
      email: body.email?.trim().toLowerCase() ?? null,
      ipAddress,
      userAgent,
      eventType: "LOGIN_SUSPICIOUS",
      details: "10+ deneme/saat eşiği aşıldı.",
    });
  }

  const email = body.email?.trim().toLowerCase();
  const password = body.password ?? "";

  if (!email || !password) {
    return genericLoginErrorResponse();
  }

  const admin = await getAdminByEmail(email);
  const now = new Date();

  if (admin?.lockedUntil && admin.lockedUntil > now) {
    await logAdminAuthEvent({
      adminId: admin.id,
      email,
      ipAddress,
      userAgent,
      eventType: "LOGIN_LOCKED",
      details: `Hesap ${admin.lockedUntil.toISOString()} tarihine kadar kilitli.`,
    });
    return genericLoginErrorResponse();
  }

  const passwordValid =
    admin && (await verifyPassword(password, admin.passwordHash));

  if (!admin || !passwordValid) {
    if (admin) {
      const failedAttempts = admin.failedAttempts + 1;
      const shouldLock = failedAttempts >= LOCKOUT_AFTER_ATTEMPTS;

      await prisma.admin.update({
        where: { id: admin.id },
        data: {
          failedAttempts,
          lockedUntil: shouldLock
            ? new Date(Date.now() + LOCKOUT_WINDOW_MS)
            : null,
        },
      });

      await logAdminAuthEvent({
        adminId: admin.id,
        email,
        ipAddress,
        userAgent,
        eventType: shouldLock ? "LOGIN_LOCKED" : "LOGIN_FAILED",
        details: shouldLock
          ? "5 hatalı deneme nedeniyle hesap 15 dakika kilitlendi."
          : "Hatalı şifre girildi.",
      });
    } else {
      await logAdminAuthEvent({
        email,
        ipAddress,
        userAgent,
        eventType: "LOGIN_FAILED",
        details: "Kayıtlı olmayan e-posta ile giriş denemesi.",
      });
    }

    return genericLoginErrorResponse();
  }

  await prisma.admin.update({
    where: { id: admin.id },
    data: {
      lastLogin: now,
      failedAttempts: 0,
      lockedUntil: null,
    },
  });

  const refreshSession = await createRefreshSession({
    adminId: admin.id,
    ipAddress,
    userAgent,
  });

  await logAdminAuthEvent({
    adminId: admin.id,
    email: admin.email,
    ipAddress,
    userAgent,
    eventType: "LOGIN_SUCCESS",
    details: "Admin girişi başarılı.",
  });

  const response = NextResponse.json({
    ok: true,
    redirectTo: "/admin",
  });

  await issueAdminAuthCookies(
    response,
    {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    },
    refreshSession.refreshToken,
  );

  return response;
}

export async function handleAdminLogout(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_COOKIE_NAME)?.value;
  const ipAddress = getClientIp(request);
  const userAgent = getUserAgent(request);

  if (hasDatabaseConfig() && refreshToken) {
    const session = await withPrismaReconnectRetry(() =>
      prisma.adminSession.findUnique({
        where: { sessionToken: refreshToken },
        include: {
          admin: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      }),
    );

    if (session) {
      await prisma.adminSession.update({
        where: { id: session.id },
        data: {
          revokedAt: new Date(),
        },
      });

      await logAdminAuthEvent({
        adminId: session.admin.id,
        email: session.admin.email,
        ipAddress,
        userAgent,
        eventType: "LOGOUT",
        details: "Admin oturumu kapatıldı.",
      });
    }
  }

  const response = NextResponse.json({
    ok: true,
    redirectTo: "/login",
  });
  clearAuthCookies(response);
  return response;
}

export async function refreshAdminSessionFromRequest(request: NextRequest) {
  if (!hasDatabaseConfig()) {
    return null;
  }

  const refreshToken = request.cookies.get(REFRESH_COOKIE_NAME)?.value;

  if (!refreshToken) {
    return null;
  }

  const session = await getActiveAdminSessionByToken(refreshToken);

  if (!session || session.revokedAt || session.expires <= new Date()) {
    return null;
  }

  const ipAddress = getClientIp(request);
  const userAgent = getUserAgent(request);
  const rotated = await rotateRefreshSession({
    sessionId: session.id,
    ipAddress,
    userAgent,
  });

  await logAdminAuthEvent({
    adminId: rotated.session.admin.id,
    email: rotated.session.admin.email,
    ipAddress,
    userAgent,
    eventType: "SESSION_REFRESHED",
    details: "Refresh token rotation uygulandi.",
  });

  return {
    admin: rotated.session.admin,
    refreshToken: rotated.refreshToken,
  };
}

export async function getActiveAdminSessionFromRequest(request: NextRequest) {
  if (!hasDatabaseConfig()) {
    return null;
  }

  const refreshToken = request.cookies.get(REFRESH_COOKIE_NAME)?.value;

  if (!refreshToken) {
    return null;
  }

  const session = await getActiveAdminSessionByToken(refreshToken);

  if (!session || session.revokedAt || session.expires <= new Date()) {
    return null;
  }

  return session;
}
