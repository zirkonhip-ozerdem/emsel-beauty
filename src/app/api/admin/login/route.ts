import type { NextRequest } from "next/server";

import { handleAdminLogin } from "@/lib/auth/admin-auth";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as {
    email?: string;
    password?: string;
    csrfToken?: string;
  };

  return handleAdminLogin(request, body);
}
