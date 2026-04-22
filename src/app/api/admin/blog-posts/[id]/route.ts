import type { NextRequest } from "next/server";

import {
  deleteAdminResourceById,
  getAdminResourceById,
  updateAdminResourceById,
} from "@/lib/admin/api-resource-handlers";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export function GET(request: NextRequest, context: RouteContext) {
  return getAdminResourceById(request, context, "blog-posts");
}

export function PATCH(request: NextRequest, context: RouteContext) {
  return updateAdminResourceById(request, context, "blog-posts");
}

export function PUT(request: NextRequest, context: RouteContext) {
  return updateAdminResourceById(request, context, "blog-posts");
}

export function DELETE(request: NextRequest, context: RouteContext) {
  return deleteAdminResourceById(request, context, "blog-posts");
}
