import type { NextRequest } from "next/server";

import {
  adminJsonError,
  adminJsonSuccess,
} from "@/lib/admin/server";
import {
  parseAdminDeleteBodyId,
  parseAdminRouteBody,
  requireAdminRouteAccess,
  toAdminRouteError,
} from "@/lib/admin/modules/shared/route-helpers";
import { whoInputSchema } from "@/lib/admin/modules/who/schema";
import { whoAdminService } from "@/lib/admin/modules/who/service";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const blockedResponse = await requireAdminRouteAccess(request);

  if (blockedResponse) {
    return blockedResponse;
  }

  const records = await whoAdminService.list();
  return adminJsonSuccess(records);
}

export async function POST(request: NextRequest) {
  const blockedResponse = await requireAdminRouteAccess(request);

  if (blockedResponse) {
    return blockedResponse;
  }

  try {
    const data = await parseAdminRouteBody(request, "who", whoInputSchema);
    const createdRecord = await whoAdminService.create(data);

    return adminJsonSuccess(createdRecord, "Kayıt oluşturuldu.");
  } catch (error) {
    return toAdminRouteError(error, "Kayıt oluşturulamadı.");
  }
}

export async function DELETE(request: NextRequest) {
  const blockedResponse = await requireAdminRouteAccess(request);

  if (blockedResponse) {
    return blockedResponse;
  }

  const id = await parseAdminDeleteBodyId(request);

  if (!id) {
    return adminJsonError("Geçersiz kayıt ID değeri.", 400);
  }

  try {
    await whoAdminService.remove(id);
    return adminJsonSuccess({ id }, "Kayıt silindi.");
  } catch (error) {
    console.error(error);
    return adminJsonError("Kayıt silinemedi.", 500);
  }
}
