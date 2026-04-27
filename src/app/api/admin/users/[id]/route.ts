import type { NextRequest } from "next/server";

import {
  adminJsonError,
  adminJsonSuccess,
} from "@/lib/admin/server";
import {
  parseAdminRouteBody,
  parseAdminRouteId,
  requireAdminRouteAccess,
  toAdminRouteError,
  type AdminIdRouteContext,
} from "@/lib/admin/modules/shared/route-helpers";
import { userInputSchema } from "@/lib/admin/modules/users/schema";
import { userAdminService } from "@/lib/admin/modules/users/service";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest, context: AdminIdRouteContext) {
  const blockedResponse = await requireAdminRouteAccess(request);

  if (blockedResponse) {
    return blockedResponse;
  }

  const id = await parseAdminRouteId(context);

  if (!id) {
    return adminJsonError("Geçersiz kayıt ID değeri.", 400);
  }

  const record = await userAdminService.get(id);

  if (!record) {
    return adminJsonError("Kayıt bulunamadı.", 404);
  }

  return adminJsonSuccess(record);
}

export async function PATCH(
  request: NextRequest,
  context: AdminIdRouteContext,
) {
  return PUT(request, context);
}

export async function PUT(request: NextRequest, context: AdminIdRouteContext) {
  const blockedResponse = await requireAdminRouteAccess(request);

  if (blockedResponse) {
    return blockedResponse;
  }

  const id = await parseAdminRouteId(context);

  if (!id) {
    return adminJsonError("Geçersiz kayıt ID değeri.", 400);
  }

  try {
    const data = await parseAdminRouteBody(request, "users", userInputSchema);
    const updatedRecord = await userAdminService.update(id, data);

    return adminJsonSuccess(updatedRecord, "Kayıt güncellendi.");
  } catch (error) {
    return toAdminRouteError(error, "Kayıt güncellenemedi.");
  }
}

export async function DELETE(
  request: NextRequest,
  context: AdminIdRouteContext,
) {
  const blockedResponse = await requireAdminRouteAccess(request);

  if (blockedResponse) {
    return blockedResponse;
  }

  const id = await parseAdminRouteId(context);

  if (!id) {
    return adminJsonError("Geçersiz kayıt ID değeri.", 400);
  }

  try {
    await userAdminService.remove(id);
    return adminJsonSuccess({ id }, "Kayıt silindi.");
  } catch (error) {
    console.error(error);
    return adminJsonError("Kayıt silinemedi.", 500);
  }
}
