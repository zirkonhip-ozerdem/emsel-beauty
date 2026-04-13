import { NextResponse } from "next/server";

import { setCsrfCookie } from "@/lib/auth/cookies";
import { createCsrfToken } from "@/lib/auth/csrf";

export const dynamic = "force-dynamic";

export async function GET() {
  const token = createCsrfToken();
  const response = NextResponse.json({
    ok: true,
    csrfToken: token,
  });

  setCsrfCookie(response, token);
  return response;
}
