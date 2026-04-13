import crypto from "node:crypto";

import type { NextRequest } from "next/server";

import { CSRF_COOKIE_NAME } from "@/lib/auth/constants";

export function createCsrfToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function validateCsrfToken(request: NextRequest | Request, token: string | null | undefined) {
  const cookieValue =
    "cookies" in request && typeof request.cookies?.get === "function"
      ? request.cookies.get(CSRF_COOKIE_NAME)?.value ?? null
      : null;

  if (!cookieValue || !token || cookieValue !== token) {
    return false;
  }

  return true;
}
