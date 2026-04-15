import { NextResponse } from "next/server";

import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

export function resolveSiteLocale(value: string | null): Locale {
  if (value && isLocale(value)) {
    return value;
  }

  return defaultLocale;
}

export function siteJsonSuccess(data: unknown, message?: string) {
  return NextResponse.json({
    ok: true,
    message,
    data,
  });
}

export function siteJsonError(message: string, status = 400, details?: unknown) {
  return NextResponse.json(
    {
      ok: false,
      message,
      details,
    },
    { status },
  );
}

export function siteDbUnavailableResponse() {
  return siteJsonError(
    "Veritabani baglantisi henuz tanimli degil. Site API verileri aktif olunca bu endpointler canli veri dondurecek.",
    503,
  );
}
