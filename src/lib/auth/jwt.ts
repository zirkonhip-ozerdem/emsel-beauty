import { SignJWT, jwtVerify, type JWTPayload } from "jose";

import { ACCESS_TOKEN_MAX_AGE_SECONDS } from "@/lib/auth/constants";

export type AdminAccessTokenPayload = JWTPayload & {
  userId: number;
  role: "ADMIN";
};

function getJwtSecret() {
  return new TextEncoder().encode(
    process.env.NEXTAUTH_SECRET || "dev-only-change-this-secret",
  );
}

export async function signAdminAccessToken(payload: {
  userId: number;
  role: "ADMIN";
}) {
  return new SignJWT({
    userId: payload.userId,
    role: payload.role,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime(`${ACCESS_TOKEN_MAX_AGE_SECONDS}s`)
    .sign(getJwtSecret());
}

export async function verifyAdminAccessToken(token: string) {
  try {
    const result = await jwtVerify(token, getJwtSecret(), {
      algorithms: ["HS256"],
    });

    const payload = result.payload as AdminAccessTokenPayload;

    if (payload.role !== "ADMIN" || typeof payload.userId !== "number") {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
