import { NextResponse, type NextRequest } from "next/server";

import { getAdminDashboardCounts } from "@/lib/admin/modules/dashboard";
import { assertAdminApiAccess } from "@/lib/auth/admin-auth";
import {
  adminDbUnavailableResponse,
  isDatabaseReady,
  serializeAdminData,
} from "@/lib/admin/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!isDatabaseReady()) {
    return adminDbUnavailableResponse();
  }

  const authResult = await assertAdminApiAccess(request);

  if (!authResult.ok) {
    return authResult.response;
  }

  const counts = await getAdminDashboardCounts();

  return NextResponse.json({
    ok: true,
    data: serializeAdminData(counts),
  });
}
