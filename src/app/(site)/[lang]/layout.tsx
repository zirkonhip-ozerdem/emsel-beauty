import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteHeader } from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
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
  const fontClass = "font-sans";

  return (
    <div lang={locale} dir={direction} className={`page-shell min-h-screen ${fontClass}`}>
      <SiteHeader locale={locale} dictionary={dictionary} />
      <main className="relative z-0 w-full px-1.25 sm:px-0">
        {children}
      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
    </div>
  );
}
