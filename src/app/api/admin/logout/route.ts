import type { NextRequest } from "next/server";

import { handleAdminLogout } from "@/lib/auth/admin-auth";

export const dynamic = "force-dynamic";

export function POST(request: NextRequest) {
  return handleAdminLogout(request);
}
