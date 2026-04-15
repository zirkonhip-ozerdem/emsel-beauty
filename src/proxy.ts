import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  clearAuthCookies,
  setAccessCookie,
  setRefreshCookie,
} from "@/lib/auth/cookies";
import {
  getActiveAdminSessionFromRequest,
  refreshAdminSessionFromRequest,
} from "@/lib/auth/admin-auth";
import { signAdminAccessToken, verifyAdminAccessToken } from "@/lib/auth/jwt";

function unauthorizedResponse(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/admin")) {
    const response = NextResponse.json(
      {
        ok: false,
        message: "Oturum bulunamadi. Lutfen tekrar giris yapin.",
      },
      { status: 401 },
    );
    clearAuthCookies(response);
    return response;
  }

  const loginUrl = new URL("/login", request.url);
  const response = NextResponse.redirect(loginUrl);
  clearAuthCookies(response);
  return response;
}

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("emsel_admin_access")?.value;
  const accessPayload = accessToken
    ? await verifyAdminAccessToken(accessToken)
    : null;

  if (accessPayload?.role === "ADMIN") {
    return NextResponse.next();
  }

  const activeSession = await getActiveAdminSessionFromRequest(request);

  if (!activeSession || activeSession.admin.role !== "ADMIN") {
    return unauthorizedResponse(request);
  }

  const refreshed = await refreshAdminSessionFromRequest(request);

  if (!refreshed || refreshed.admin.role !== "ADMIN") {
    return unauthorizedResponse(request);
  }

  const response = NextResponse.next();
  const renewedAccessToken = await signAdminAccessToken({
    userId: refreshed.admin.id,
    role: refreshed.admin.role,
  });

  setAccessCookie(response, renewedAccessToken);
  setRefreshCookie(response, refreshed.refreshToken);
  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
