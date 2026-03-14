"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  getLocalizedPath,
  siteLocales,
  siteRouteKeys,
  swapLocaleInPath,
  type Locale,
} from "@/i18n/config";
import type { SiteDictionary } from "@/i18n/dictionaries";

type SiteHeaderProps = {
  locale: Locale;
  dictionary: SiteDictionary;
};

export function SiteHeader({ locale, dictionary }: SiteHeaderProps) {
  const pathname = usePathname() ?? getLocalizedPath(locale, "home");
  const headingFont = locale === "ar" ? "font-arabic" : "font-display";

  const leftNavigation: Array<"home" | "services" | "blog"> = [
    "home",
    "services",
    "blog",
  ];
  const rightNavigation: Array<"corporate" | "products"> = [
    "corporate",
    "products",
  ];

  const navigation = siteRouteKeys.map((routeKey) => ({
    key: routeKey,
    href: getLocalizedPath(locale, routeKey),
    label: dictionary.navigation[routeKey],
  }));

  const isActive = (href: string) =>
    href === getLocalizedPath(locale, "home")
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  const desktopLinkClass = (href: string) =>
    `group relative inline-flex items-center justify-center pb-2 text-[13px] font-semibold uppercase tracking-[0.18em] transition xl:text-[14px] ${
      isActive(href)
        ? "text-foreground"
        : "text-muted hover:text-foreground"
    }`;

  return (
    <header className="sticky top-0 z-30">
      <div className="relative w-full overflow-hidden border-y border-header-line bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(249,248,244,0.98))]">
        <div className="pointer-events-none absolute inset-0 opacity-90 [background:radial-gradient(circle_at_12%_18%,rgba(242,214,136,0.12),transparent_18%),radial-gradient(circle_at_78%_28%,rgba(230,204,147,0.12),transparent_20%),linear-gradient(115deg,rgba(255,255,255,0.8),rgba(245,240,231,0.44),rgba(255,255,255,0.82))]" />
        <div className="relative hidden w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-8 px-8 py-2 lg:grid xl:px-14 2xl:px-20">
            <nav className="flex flex-wrap justify-end gap-x-8 gap-y-2">
              {leftNavigation.map((routeKey) => {
                const item = navigation.find((entry) => entry.key === routeKey);

                if (!item) {
                  return null;
                }

                return (
                  <Link key={item.key} href={item.href} className={desktopLinkClass(item.href)}>
                    {item.label}
                    <span
                      className={`absolute bottom-0 left-0 h-px bg-accent transition-all duration-300 ${
                        isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            <Link
              href={getLocalizedPath(locale, "home")}
              className="justify-self-center px-2 py-0"
              aria-label={dictionary.brand.name}
            >
              <Image
                src="/logo/emsel-logo.png"
                alt={dictionary.brand.name}
                width={220}
                height={275}
                priority
                className="h-auto w-[104px] object-contain xl:w-[126px]"
              />
            </Link>

            <div className="flex items-center justify-start gap-5">
              <nav className="flex flex-wrap items-center gap-x-8 gap-y-2">
                {rightNavigation.map((routeKey) => {
                  const item = navigation.find((entry) => entry.key === routeKey);

                  if (!item) {
                    return null;
                  }

                  return (
                    <Link key={item.key} href={item.href} className={desktopLinkClass(item.href)}>
                      {item.label}
                      <span
                        className={`absolute bottom-0 left-0 h-px bg-accent transition-all duration-300 ${
                          isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </Link>
                  );
                })}
              </nav>
              <Link
                href={getLocalizedPath(locale, "contact")}
                className={`${headingFont} inline-flex min-h-[34px] items-center justify-center rounded-none border border-header-button-text bg-header-button px-8 py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-header-button-text transition hover:bg-background`}
              >
                {dictionary.header.consultation}
              </Link>
            </div>
          </div>

          <div className="relative space-y-4 px-4 py-3 sm:px-6 lg:hidden">
            <div className="flex justify-center border-b border-header-line pb-3">
              <Link
                href={getLocalizedPath(locale, "home")}
                className="px-3 py-1"
                aria-label={dictionary.brand.name}
              >
                <Image
                  src="/logo/emsel-logo.png"
                  alt={dictionary.brand.name}
                  width={220}
                  height={275}
                  priority
                  className="h-auto w-[120px] object-contain"
                />
              </Link>
            </div>

            <nav className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {[...leftNavigation, ...rightNavigation].map((routeKey) => {
                const item = navigation.find((entry) => entry.key === routeKey);

                if (!item) {
                  return null;
                }

                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`border px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] transition ${
                      isActive(item.href)
                        ? "border-accent bg-white text-accent-strong"
                        : "border-border bg-white/70 text-muted hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href={getLocalizedPath(locale, "contact")}
                className={`${headingFont} col-span-full inline-flex justify-center bg-accent-strong px-5 py-2.5 text-center text-sm uppercase tracking-[0.1em] text-background transition hover:bg-accent`}
              >
                {dictionary.header.consultation}
              </Link>
            </nav>

            <div className="flex flex-wrap items-center justify-center gap-2 border-t border-border pt-4">
              {siteLocales.map((currentLocale) => {
                const href = swapLocaleInPath(pathname, currentLocale);
                const active = currentLocale === locale;

                return (
                  <Link
                    key={currentLocale}
                    href={href}
                    className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                      active
                        ? "bg-accent-soft text-accent-strong"
                        : "bg-white/70 text-muted hover:text-foreground"
                    }`}
                  >
                    {dictionary.languageLabels[currentLocale]}
                  </Link>
                );
              })}
            </div>
          </div>
      </div>
    </header>
  );
}
