import type { NextRequest } from "next/server";
import { ZodError, type z } from "zod";

import {
  adminDbUnavailableResponse,
  adminJsonError,
  isDatabaseReady,
  parseAdminId,
} from "@/lib/admin/server";
import { AdminUploadError, parseAdminRequestBody } from "@/lib/admin/uploads";
import { assertAdminApiAccess } from "@/lib/auth/admin-auth";
import type { AdminResourceKey } from "@/lib/admin/types";

export type AdminIdRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function requireAdminRouteAccess(request: NextRequest) {
  if (!isDatabaseReady()) {
    return adminDbUnavailableResponse();
  }

  const authResult = await assertAdminApiAccess(request);

  if (!authResult.ok) {
    return authResult.response;
  }

  return null;
}

export async function parseAdminRouteBody<TSchema extends z.ZodTypeAny>(
  request: NextRequest,
  resourceKey: AdminResourceKey,
  schema: TSchema,
) {
  const body = await parseAdminRequestBody(request, resourceKey);
  return schema.parse(body) as z.infer<TSchema>;
}

export async function parseAdminRouteId(
  context: AdminIdRouteContext,
) {
  const { id: rawId } = await context.params;
  return parseAdminId(rawId);
}

export async function parseAdminDeleteBodyId(request: NextRequest) {
  const { id } = (await request.json().catch(() => ({}))) as { id?: unknown };
  return parseAdminId(String(id ?? ""));
}

export function toAdminRouteError(error: unknown, fallbackMessage: string) {
  if (error instanceof ZodError) {
    return adminJsonError(
      "Gönderilen alanlar doğrulanamadı.",
      422,
      error.flatten(),
    );
  }

  if (error instanceof AdminUploadError) {
    return adminJsonError(error.message, error.status);
  }

  if (error instanceof Error) {
    console.error(error);
    return adminJsonError(error.message || fallbackMessage, 500);
  }

  console.error(error);
  return adminJsonError(fallbackMessage, 500);
}
