import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { getDirection, siteLocales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { resolveLocale, type LangRouteParams } from "@/i18n/server";

type SiteLayoutProps = {
  children: ReactNode;
  params: LangRouteParams;
};

export function generateStaticParams() {
  return siteLocales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: LangRouteParams;
}): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);

  return {
    title: {
      default: dictionary.seo.default.title,
      template: `%s | ${dictionary.brand.name}`,
    },
    description: dictionary.seo.default.description,
  };
}

export default async function SiteLayout({
  children,
  params,
}: SiteLayoutProps) {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);
  const direction = getDirection(locale);
  const fontClass = locale === "ar" ? "font-arabic" : "font-sans";

  return (
    <div lang={locale} dir={direction} className={`page-shell min-h-screen ${fontClass}`}>
      <SiteHeader locale={locale} dictionary={dictionary} />
      <main className="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        {children}
      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
    </div>
  );
}
