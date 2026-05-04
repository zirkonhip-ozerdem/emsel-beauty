import type { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";

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
import { whoInputSchema } from "@/lib/admin/modules/who/schema";
import { whoAdminService } from "@/lib/admin/modules/who/service";

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

  const record = await whoAdminService.get(id);

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
    const data = await parseAdminRouteBody(request, "who", whoInputSchema);
    const updatedRecord = await whoAdminService.update(id, data);
    revalidateTag("who", "max");

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
    await whoAdminService.remove(id);
    revalidateTag("who", "max");
    return adminJsonSuccess({ id }, "Kayıt silindi.");
  } catch (error) {
    console.error(error);
    return adminJsonError("Kayıt silinemedi.", 500);
  }
}
