import Link from "next/link";

import {
  getLocalizedPath,
  siteRouteKeys,
  type Locale,
} from "@/i18n/config";
import type { SiteDictionary } from "@/i18n/dictionaries";

type SiteFooterProps = {
  locale: Locale;
  dictionary: SiteDictionary;
};

export function SiteFooter({ locale, dictionary }: SiteFooterProps) {
  const year = new Date().getFullYear();
  const headingFont = locale === "ar" ? "font-arabic" : "font-display";

  return (
    <footer className="border-t border-border bg-white/50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1.2fr)_repeat(2,minmax(0,0.7fr))] lg:px-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <p className={`${headingFont} text-3xl text-foreground`}>
              {dictionary.brand.name}
            </p>
            <p className="max-w-lg text-sm leading-7 text-muted">
              {dictionary.brand.description}
            </p>
          </div>
          <p className="text-sm leading-7 text-muted">
            {dictionary.footer.note}
          </p>
        </div>
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-strong">
            Navigation
          </p>
          <div className="flex flex-col gap-3 text-sm text-muted">
            {siteRouteKeys.map((routeKey) => (
              <Link key={routeKey} href={getLocalizedPath(locale, routeKey)}>
                {dictionary.navigation[routeKey]}
              </Link>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-strong">
            Contact
          </p>
          <div className="space-y-3 text-sm leading-7 text-muted">
            <p>
              <span className="font-semibold text-foreground">
                {dictionary.footer.addressLabel}
              </span>
              <br />
              {dictionary.footer.address}
            </p>
            <p>
              <span className="font-semibold text-foreground">
                {dictionary.footer.phoneLabel}
              </span>
              <br />
              {dictionary.footer.phone}
            </p>
            <p>
              <span className="font-semibold text-foreground">
                {dictionary.footer.mailLabel}
              </span>
              <br />
              {dictionary.footer.mail}
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-border px-4 py-4 text-center text-xs uppercase tracking-[0.18em] text-muted sm:px-6 lg:px-8">
        {year} {dictionary.brand.name}. {dictionary.footer.rights}
      </div>
    </footer>
  );
}
