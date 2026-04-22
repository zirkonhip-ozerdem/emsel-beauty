import type { NextRequest } from "next/server";

import { handleAdminLogout } from "@/lib/auth/admin-auth";

export function GET(request: NextRequest) {
  return handleAdminLogout(request);
}
