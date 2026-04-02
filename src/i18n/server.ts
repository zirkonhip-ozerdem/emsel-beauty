import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";

// Next.js 16'da params bir Promise — await ile açmak zorunlu
export type LangRouteParams = Promise<{ lang: string }>;

export async function resolveLocale(params: LangRouteParams): Promise<Locale> {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  return lang;
}