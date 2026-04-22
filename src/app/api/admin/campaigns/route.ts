import type { NextRequest } from "next/server";

import {
  createAdminResource,
  deleteAdminResource,
  listAdminResource,
} from "@/lib/admin/api-resource-handlers";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export function GET(request: NextRequest) {
  return listAdminResource(request, "campaigns");
}

export function POST(request: NextRequest) {
  return createAdminResource(request, "campaigns");
}

export function DELETE(request: NextRequest) {
  return deleteAdminResource(request, "campaigns");
}
