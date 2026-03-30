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
    "home", "services", "blog",
  ];
  const rightNavigation: Array<"corporate" | "products"> = [
    "corporate", "products",
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
      isActive(href) ? "text-[#5f5421]" : "text-[#605B25] hover:text-[#8A6E36]"
    }`;

  return (
    <header className="sticky top-0 z-30 backdrop-blur-[6px]">
      <div
        className="relative w-full overflow-hidden border-y"
        style={{
          borderColor: "rgba(197, 160, 89, 0.45)",
          background:
            "linear-gradient(180deg, rgba(229,225,216,0.9) 0%, rgba(218,212,200,0.85) 100%)",
        }}
      >
        {/* ── DESKTOP NAV ────────────────────────────────────────────── */}
        <div className="relative z-10 hidden w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-8 px-8 py-2 lg:grid xl:px-14 2xl:px-20">

          {/* Sol nav */}
          <nav className="flex flex-wrap justify-end gap-x-8 gap-y-2">
            {leftNavigation.map((routeKey) => {
              const item = navigation.find((e) => e.key === routeKey);
              if (!item) return null;
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

          {/* ── LOGO EFEKTİ ──────────────────────────────────────
          ──────────────────────────────────────────────────────────────── */}
          <Link
            href={getLocalizedPath(locale, "home")}
            className="justify-self-center px-2 py-1"
            aria-label={dictionary.brand.name}
          >
          <div className="relative flex items-center justify-center">

            <Image
                src="/logo/emsel-logo.png"
                alt={dictionary.brand.name}
                width={620}
                height={675}
                priority
                className="h-auto w-[170px] xl:w-[220px] object-contain logo-glow"
            />
          </div>
          </Link>

          {/* Sağ nav + buton */}
          <div className="flex items-center justify-start gap-5">
            <nav className="flex flex-wrap items-center gap-x-8 gap-y-2">
              {rightNavigation.map((routeKey) => {
                const item = navigation.find((e) => e.key === routeKey);
                if (!item) return null;
                return (
                  <Link key={item.key} href={item.href} className={desktopLinkClass(item.href)}>
                    {item.label}
                    <span
                      className={`absolute bottom-0 left-0 h-px bg-[#C5A059] transition-all duration-300 ${
                        isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            <Link
              href={getLocalizedPath(locale, "contact")}
              className={`${headingFont} inline-flex min-h-[36px] items-center justify-center rounded-none border px-8 py-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#E6CC93] transition hover:bg-[#8A6E36] hover:text-[#F9F8F4]`}
              style={{
                borderColor: "#C5A059",
                backgroundColor: "rgba(62, 64, 24, 0.5)",
              }}
            >
              {dictionary.header.consultation}
            </Link>
          </div>
        </div>

        {/* ── MOBİL NAV ──────────────────────────────────────────────── */}
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
                className="h-auto w-[120px] object-contain drop-shadow-[0_4px_12px_rgba(197,160,89,0.35)]"
              />
            </Link>
          </div>

          <nav className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {[...leftNavigation, ...rightNavigation].map((routeKey) => {
              const item = navigation.find((e) => e.key === routeKey);
              if (!item) return null;
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