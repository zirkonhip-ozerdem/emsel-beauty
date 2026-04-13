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
  parseAdminId,
} from "@/lib/admin/server";
import type { AdminResourceKey } from "@/lib/admin/types";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    resource: string;
    id: string;
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
  const { resource: resourceParam, id: rawId } = await context.params;
  const resolved = resolveResource(resourceParam);
  const id = parseAdminId(rawId);

  if (!resolved) {
    return adminJsonError("Kaynak bulunamadi.", 404);
  }

  if (!id) {
    return adminJsonError("Gecersiz kayit ID degeri.", 400);
  }

  if (!isDatabaseReady()) {
    return adminDbUnavailableResponse();
  }

  const authResult = await assertAdminApiAccess(request);

  if (!authResult.ok) {
    return authResult.response;
  }

  const data = await resolved.crud.get(id);

  if (!data) {
    return adminJsonError("Kayit bulunamadi.", 404);
  }

  return adminJsonSuccess(data);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { resource: resourceParam, id: rawId } = await context.params;
  const resolved = resolveResource(resourceParam);
  const id = parseAdminId(rawId);

  if (!resolved) {
    return adminJsonError("Kaynak bulunamadi.", 404);
  }

  if (!id) {
    return adminJsonError("Gecersiz kayit ID degeri.", 400);
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
    const updatedRecord = await resolved.crud.update(id, parsed);

    return adminJsonSuccess(updatedRecord, "Kayit guncellendi.");
  } catch (error) {
    if (error instanceof ZodError) {
      return adminJsonError("Gonderilen alanlar dogrulanamadi.", 422, error.flatten());
    }

    console.error(error);
    return adminJsonError("Kayit guncellenemedi.", 500);
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const { resource: resourceParam, id: rawId } = await context.params;
  const resolved = resolveResource(resourceParam);
  const id = parseAdminId(rawId);

  if (!resolved) {
    return adminJsonError("Kaynak bulunamadi.", 404);
  }

  if (!id) {
    return adminJsonError("Gecersiz kayit ID degeri.", 400);
  }

  if (!isDatabaseReady()) {
    return adminDbUnavailableResponse();
  }

  const authResult = await assertAdminApiAccess(request);

  if (!authResult.ok) {
    return authResult.response;
  }

  try {
    await resolved.crud.remove(id);
    return adminJsonSuccess({ id }, "Kayit silindi.");
  } catch (error) {
    console.error(error);
    return adminJsonError("Kayit silinemedi.", 500);
  }
}
