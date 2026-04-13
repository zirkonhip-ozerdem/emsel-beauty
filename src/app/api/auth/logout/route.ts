import type { NextRequest } from "next/server";

import { handleAdminLogout, assertAdminApiAccess } from "@/lib/auth/admin-auth";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const authResult = await assertAdminApiAccess(request);

  if (!authResult.ok) {
    return authResult.response;
  }

  return handleAdminLogout(request);
}
