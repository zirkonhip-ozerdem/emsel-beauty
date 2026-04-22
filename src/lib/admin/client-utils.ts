import type { AdminResourceKey } from "@/lib/admin/types";

type ApiSuccess<T> = {
  ok: true;
  data: T;
  message?: string;
};

type ApiFailure = {
  ok?: false;
  message?: string;
};

export type AdminApiPayload<T> = ApiSuccess<T> | ApiFailure | T;

export function unwrapAdminApiData<T>(payload: AdminApiPayload<T>): T {
  if (
    payload &&
    typeof payload === "object" &&
    "ok" in payload &&
    (payload as ApiSuccess<T>).ok === true &&
    "data" in payload
  ) {
    return (payload as ApiSuccess<T>).data;
  }

  return payload as T;
}

export async function getAdminCsrfToken() {
  const response = await fetch("/api/admin/csrf", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });
  const payload = (await response.json().catch(() => null)) as
    | { ok?: boolean; csrfToken?: string }
    | null;

  return payload?.csrfToken ?? "";
}

export function formatAdminDate(value: unknown) {
  if (!value) {
    return "-";
  }

  const date = new Date(String(value));

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function slugifyAdminText(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function getResourceUploadFieldPath(
  resourceKey: AdminResourceKey,
  fieldPath: string,
) {
  return `${resourceKey}:${fieldPath}`;
}
