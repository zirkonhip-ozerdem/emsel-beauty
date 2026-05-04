import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteHeader } from "@/components/site/site-header";
import { SiteReservationFab } from "@/components/site/site-reservation-fab";
import SiteFooter from "@/components/site/site-footer";
import { getDirection } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { resolveLocale, type LangRouteParams } from "@/i18n/server";
import { getSiteShellData } from "@/lib/site/site-shell";

type SiteLayoutProps = {
  children: ReactNode;
  params: LangRouteParams;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: LangRouteParams;
}): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);
  const siteShell = await getSiteShellData(locale);
  const siteName = siteShell.siteName || dictionary.brand.name;

  return {
    title: {
      default: dictionary.seo.default.title,
      template: `%s | ${siteName}`,
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
  const siteShell = await getSiteShellData(locale);
  const direction = getDirection(locale);
  const fontClass = "font-sans";

  return (
    <div lang={locale} dir={direction} className={`page-shell min-h-screen ${fontClass}`}>
      <SiteHeader locale={locale} dictionary={dictionary} siteShell={siteShell} />
      <main className="relative z-0 w-full px-1.25 sm:px-0">
        {children}
      </main>
      <SiteFooter locale={locale} dictionary={dictionary} siteShell={siteShell} />
      <SiteReservationFab locale={locale} dictionary={dictionary} />
    </div>
  );
}
