import type { NextRequest } from "next/server";

import {
  createAdminResource,
  deleteAdminResource,
  listAdminResource,
} from "@/lib/admin/api-resource-handlers";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export function GET(request: NextRequest) {
  return listAdminResource(request, "blog-posts");
}

export function POST(request: NextRequest) {
  return createAdminResource(request, "blog-posts");
}

export function DELETE(request: NextRequest) {
  return deleteAdminResource(request, "blog-posts");
}
