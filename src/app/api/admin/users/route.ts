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
import { userInputSchema } from "@/lib/admin/modules/users/schema";
import { userAdminService } from "@/lib/admin/modules/users/service";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const blockedResponse = await requireAdminRouteAccess(request);

  if (blockedResponse) {
    return blockedResponse;
  }

  const records = await userAdminService.list();
  return adminJsonSuccess(records);
}

export async function POST(request: NextRequest) {
  const blockedResponse = await requireAdminRouteAccess(request);

  if (blockedResponse) {
    return blockedResponse;
  }

  try {
    const data = await parseAdminRouteBody(request, "users", userInputSchema);
    const createdRecord = await userAdminService.create(data);

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
    await userAdminService.remove(id);
    return adminJsonSuccess({ id }, "Kayıt silindi.");
  } catch (error) {
    console.error(error);
    return adminJsonError("Kayıt silinemedi.", 500);
  }
}
