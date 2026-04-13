import { cookies } from "next/headers";
import type { NextResponse } from "next/server";

import {
  ACCESS_COOKIE_NAME,
  ACCESS_TOKEN_MAX_AGE_SECONDS,
  CSRF_COOKIE_NAME,
  REFRESH_COOKIE_NAME,
  REFRESH_TOKEN_MAX_AGE_SECONDS,
} from "@/lib/auth/constants";

function isSecureCookie() {
  return process.env.NODE_ENV === "production";
}

function baseCookieOptions(maxAge: number, httpOnly: boolean) {
  return {
    httpOnly,
    secure: isSecureCookie(),
    sameSite: "strict" as const,
    path: "/",
    maxAge,
  };
}

export function setAccessCookie(response: NextResponse, token: string) {
  response.cookies.set(ACCESS_COOKIE_NAME, token, baseCookieOptions(ACCESS_TOKEN_MAX_AGE_SECONDS, true));
}

export function setRefreshCookie(response: NextResponse, token: string) {
  response.cookies.set(
    REFRESH_COOKIE_NAME,
    token,
    baseCookieOptions(REFRESH_TOKEN_MAX_AGE_SECONDS, true),
  );
}

export function setCsrfCookie(response: NextResponse, token: string) {
  response.cookies.set(CSRF_COOKIE_NAME, token, baseCookieOptions(REFRESH_TOKEN_MAX_AGE_SECONDS, false));
}

export function clearAuthCookies(response: NextResponse) {
  response.cookies.set(ACCESS_COOKIE_NAME, "", { path: "/", expires: new Date(0) });
  response.cookies.set(REFRESH_COOKIE_NAME, "", { path: "/", expires: new Date(0) });
  response.cookies.set(CSRF_COOKIE_NAME, "", { path: "/", expires: new Date(0) });
}

export async function getServerCsrfCookie() {
  const cookieStore = await cookies();
  return cookieStore.get(CSRF_COOKIE_NAME)?.value ?? null;
}
