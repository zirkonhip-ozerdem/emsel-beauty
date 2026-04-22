import { NextResponse } from "next/server";

import { setCsrfCookie } from "@/lib/auth/cookies";
import { createCsrfToken } from "@/lib/auth/csrf";

export const dynamic = "force-dynamic";

export function GET() {
  const csrfToken = createCsrfToken();
  const response = NextResponse.json({
    ok: true,
    csrfToken,
  });

  setCsrfCookie(response, csrfToken);
  return response;
}
