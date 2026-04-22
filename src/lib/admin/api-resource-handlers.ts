import { ZodError } from "zod";
import type { NextRequest } from "next/server";

import { getAdminCrudHandler } from "@/lib/admin/crud";
import { assertAdminApiAccess } from "@/lib/auth/admin-auth";
import {
  adminDbUnavailableResponse,
  adminJsonError,
  adminJsonSuccess,
  isDatabaseReady,
  parseAdminId,
} from "@/lib/admin/server";
import { AdminUploadError, parseAdminRequestBody } from "@/lib/admin/uploads";
import type { AdminResourceKey } from "@/lib/admin/types";

type IdRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

async function requireAdminApi(request: NextRequest) {
  if (!isDatabaseReady()) {
    return adminDbUnavailableResponse();
  }

  const authResult = await assertAdminApiAccess(request);

  if (!authResult.ok) {
    return authResult.response;
  }

  return null;
}

function toAdminError(error: unknown, fallbackMessage: string) {
  if (error instanceof ZodError) {
    return adminJsonError("Gönderilen alanlar doğrulanamadı.", 422, error.flatten());
  }

  if (error instanceof AdminUploadError) {
    return adminJsonError(error.message, error.status);
  }

  console.error(error);
  return adminJsonError(fallbackMessage, 500);
}

export async function listAdminResource(
  request: NextRequest,
  resourceKey: AdminResourceKey,
) {
  const blockedResponse = await requireAdminApi(request);

  if (blockedResponse) {
    return blockedResponse;
  }

  const crud = getAdminCrudHandler(resourceKey);
  const records = await crud.list();
  return adminJsonSuccess(records);
}

export async function createAdminResource(
  request: NextRequest,
  resourceKey: AdminResourceKey,
) {
  const blockedResponse = await requireAdminApi(request);

  if (blockedResponse) {
    return blockedResponse;
  }

  try {
    const crud = getAdminCrudHandler(resourceKey);
    const body = await parseAdminRequestBody(request, resourceKey);
    const parsed = crud.schema.parse(body);
    const createdRecord = await crud.create(parsed);

    return adminJsonSuccess(createdRecord, "Kayıt oluşturuldu.");
  } catch (error) {
    return toAdminError(error, "Kayıt oluşturulamadı.");
  }
}

export async function deleteAdminResource(
  request: NextRequest,
  resourceKey: AdminResourceKey,
) {
  const blockedResponse = await requireAdminApi(request);

  if (blockedResponse) {
    return blockedResponse;
  }

  try {
    const { id } = (await request.json().catch(() => ({}))) as { id?: unknown };
    const parsedId = parseAdminId(String(id ?? ""));

    if (!parsedId) {
      return adminJsonError("Geçersiz kayıt ID değeri.", 400);
    }

    const crud = getAdminCrudHandler(resourceKey);
    await crud.remove(parsedId);
    return adminJsonSuccess({ id: parsedId }, "Kayıt silindi.");
  } catch (error) {
    console.error(error);
    return adminJsonError("Kayıt silinemedi.", 500);
  }
}

export async function getAdminResourceById(
  request: NextRequest,
  context: IdRouteContext,
  resourceKey: AdminResourceKey,
) {
  const blockedResponse = await requireAdminApi(request);

  if (blockedResponse) {
    return blockedResponse;
  }

  const { id: rawId } = await context.params;
  const id = parseAdminId(rawId);

  if (!id) {
    return adminJsonError("Geçersiz kayıt ID değeri.", 400);
  }

  const crud = getAdminCrudHandler(resourceKey);
  const record = await crud.get(id);

  if (!record) {
    return adminJsonError("Kayıt bulunamadı.", 404);
  }

  return adminJsonSuccess(record);
}

export async function updateAdminResourceById(
  request: NextRequest,
  context: IdRouteContext,
  resourceKey: AdminResourceKey,
) {
  const blockedResponse = await requireAdminApi(request);

  if (blockedResponse) {
    return blockedResponse;
  }

  const { id: rawId } = await context.params;
  const id = parseAdminId(rawId);

  if (!id) {
    return adminJsonError("Geçersiz kayıt ID değeri.", 400);
  }

  try {
    const crud = getAdminCrudHandler(resourceKey);
    const body = await parseAdminRequestBody(request, resourceKey);
    const parsed = crud.schema.parse(body);
    const updatedRecord = await crud.update(id, parsed);

    return adminJsonSuccess(updatedRecord, "Kayıt güncellendi.");
  } catch (error) {
    return toAdminError(error, "Kayıt güncellenemedi.");
  }
}

export async function deleteAdminResourceById(
  request: NextRequest,
  context: IdRouteContext,
  resourceKey: AdminResourceKey,
) {
  const blockedResponse = await requireAdminApi(request);

  if (blockedResponse) {
    return blockedResponse;
  }

  const { id: rawId } = await context.params;
  const id = parseAdminId(rawId);

  if (!id) {
    return adminJsonError("Geçersiz kayıt ID değeri.", 400);
  }

  try {
    const crud = getAdminCrudHandler(resourceKey);
    await crud.remove(id);
    return adminJsonSuccess({ id }, "Kayıt silindi.");
  } catch (error) {
    console.error(error);
    return adminJsonError("Kayıt silinemedi.", 500);
  }
}
