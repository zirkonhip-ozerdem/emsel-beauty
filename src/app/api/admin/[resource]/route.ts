import { ZodError } from "zod";
import type { NextRequest } from "next/server";

import { getAdminCrudHandler } from "@/lib/admin/crud";
import { getAdminResource } from "@/lib/admin/resources";
import { assertAdminApiAccess } from "@/lib/auth/admin-auth";
import {
  adminDbUnavailableResponse,
  adminJsonError,
  adminJsonSuccess,
  isDatabaseReady,
} from "@/lib/admin/server";
import type { AdminResourceKey } from "@/lib/admin/types";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    resource: string;
  }>;
};

function resolveResource(resourceParam: string) {
  const resource = getAdminResource(resourceParam);

  if (!resource) {
    return null;
  }

  return {
    resource,
    crud: getAdminCrudHandler(resource.key as AdminResourceKey),
  };
}

export async function GET(request: NextRequest, context: RouteContext) {
  const { resource: resourceParam } = await context.params;
  const resolved = resolveResource(resourceParam);

  if (!resolved) {
    return adminJsonError("Kaynak bulunamadi.", 404);
  }

  if (!isDatabaseReady()) {
    return adminDbUnavailableResponse();
  }

  const authResult = await assertAdminApiAccess(request);

  if (!authResult.ok) {
    return authResult.response;
  }

  const data = await resolved.crud.list();
  return adminJsonSuccess(data);
}

export async function POST(request: NextRequest, context: RouteContext) {
  const { resource: resourceParam } = await context.params;
  const resolved = resolveResource(resourceParam);

  if (!resolved) {
    return adminJsonError("Kaynak bulunamadi.", 404);
  }

  if (!isDatabaseReady()) {
    return adminDbUnavailableResponse();
  }

  const authResult = await assertAdminApiAccess(request);

  if (!authResult.ok) {
    return authResult.response;
  }

  try {
    const body = await request.json();
    const parsed = resolved.crud.schema.parse(body);
    const createdRecord = await resolved.crud.create(parsed);

    return adminJsonSuccess(createdRecord, "Kayit olusturuldu.");
  } catch (error) {
    if (error instanceof ZodError) {
      return adminJsonError("Gonderilen alanlar dogrulanamadi.", 422, error.flatten());
    }

    console.error(error);
    return adminJsonError("Kayit olusturulamadi.", 500);
  }
}
