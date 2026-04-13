"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useEffectEvent, useState } from "react";

import { headerLeftRouteKeys, headerRightRouteKeys } from "@/components/site/navigation";
import {
  getLocalizedPath,
  siteLocales,
  swapLocaleInPath,
  type Locale,
} from "@/i18n/config";
import type { SiteDictionary } from "@/i18n/dictionaries";

type HeaderRouteKey =
  | (typeof headerLeftRouteKeys)[number]
  | (typeof headerRightRouteKeys)[number];

type SiteHeaderProps = {
  locale: Locale;
  dictionary: SiteDictionary;
};

const localeMeta: Record<Locale, { shortLabel: string; flagClassName: string }> = {
  tr: { shortLabel: "TR", flagClassName: "site-header-flag-tr" },
  en: { shortLabel: "ENG", flagClassName: "site-header-flag-en" },
  de: { shortLabel: "GER", flagClassName: "site-header-flag-de" },
};

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="site-header-top-icon">
      <path
        d="M7.3 4.8c.3-.7 1-.9 1.6-.7l2 .8c.7.3 1 .9.8 1.6l-.7 2.2c-.1.4 0 .8.3 1.1l2.4 2.4c.3.3.7.4 1.1.3l2.2-.7c.7-.2 1.4.1 1.6.8l.8 2c.2.6 0 1.3-.7 1.6l-1.8.9c-.6.3-1.2.3-1.8.2A15.9 15.9 0 0 1 5.6 8.2c-.1-.6-.1-1.2.2-1.8z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="site-header-top-icon">
      <path
        d="M12 20s6-4.6 6-10a6 6 0 1 0-12 0c0 5.4 6 10 6 10Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function SiteHeader({ locale, dictionary }: SiteHeaderProps) {
  const pathname = usePathname() ?? getLocalizedPath(locale, "home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const phoneHref = dictionary.footer.phone.replace(/[^+\d]/g, "") || dictionary.footer.phone;
  const allRouteKeys = [...headerLeftRouteKeys, ...headerRightRouteKeys] as HeaderRouteKey[];
  const mobileSubmenus: Partial<Record<HeaderRouteKey, string[]>> = {
    services: dictionary.servicesPage.packages.slice(0, 3).map((item) => item.title),
    products: dictionary.productsPage.categories.slice(0, 3).map((item) => item.title),
  };

  useEffect(() => {
    const updateStickyState = () => {
      setIsScrolled(window.scrollY > 18);
    };

    updateStickyState();
    window.addEventListener("scroll", updateStickyState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateStickyState);
    };
  }, []);

  const closeMobileMenu = useEffectEvent(() => {
    setIsMobileMenuOpen(false);
  });

  useEffect(() => {
    closeMobileMenu();
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileMenuOpen]);

  const buildNavItem = (routeKey: HeaderRouteKey) => ({
    key: routeKey,
    href: getLocalizedPath(locale, routeKey),
    label: dictionary.navigation[routeKey],
  });

  const isActive = (href: string) =>
    href === getLocalizedPath(locale, "home")
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={`site-header ${isScrolled ? "site-header-scrolled" : ""}`}>
      <div className="site-header-top hidden md:block">
        <div className="site-header-top-inner">
          <div className="site-header-top-item">
            <span className="site-header-top-label" aria-hidden="true">
              <PhoneIcon />
            </span>
            <Link href={`tel:${phoneHref}`} className="site-header-top-link">
              {dictionary.footer.phone}
            </Link>
          </div>

          <div className="site-header-top-item site-header-top-item-address">
            <span className="site-header-top-label" aria-hidden="true">
              <PinIcon />
            </span>
            <span className="site-header-top-text">{dictionary.footer.address}</span>
          </div>
        </div>
      </div>

      <div className="site-header-shell">
        <div className="site-header-overlay pointer-events-none absolute inset-0 opacity-90" />

        <div className="relative hidden w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-8 px-8 py-0.5! xl:grid xl:px-14 2xl:px-20">
          <nav className="flex flex-wrap justify-end gap-x-8 gap-y-2">
            {headerLeftRouteKeys.map((routeKey) => {
              const item = buildNavItem(routeKey);

              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`site-header-link group ${isActive(item.href) ? "text-foreground" : "text-muted hover:text-foreground"}`}
                >
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
              className="h-auto w-[96px] object-contain xl:w-[112px]"
            />
          </Link>

          <div className="flex items-center justify-start">
            <nav className="flex flex-wrap items-center gap-x-8 gap-y-2">
              {headerRightRouteKeys.map((routeKey) => {
                const item = buildNavItem(routeKey);

                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`site-header-link group ${isActive(item.href) ? "text-foreground" : "text-muted hover:text-foreground"}`}
                  >
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
          </div>
        </div>

        <div className="relative hidden space-y-2 px-5 py-1.5! md:block xl:hidden">
          <div className="site-header-tablet-row">
            <nav className="site-header-tablet-nav justify-end">
              {headerLeftRouteKeys.map((routeKey) => {
                const item = buildNavItem(routeKey);

                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`site-header-link group ${isActive(item.href) ? "text-foreground" : "text-muted hover:text-foreground"}`}
                  >
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
                className="h-auto w-[92px] object-contain lg:w-[104px]"
              />
            </Link>

            <nav className="site-header-tablet-nav justify-start">
              {headerRightRouteKeys.map((routeKey) => {
                const item = buildNavItem(routeKey);

                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`site-header-link group ${isActive(item.href) ? "text-foreground" : "text-muted hover:text-foreground"}`}
                  >
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
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 border-t border-header-line pt-1.5!">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {siteLocales.map((currentLocale) => {
                const href = swapLocaleInPath(pathname, currentLocale);
                const active = currentLocale === locale;

                return (
                  <Link
                    key={currentLocale}
                    href={href}
                    className={`site-header-locale-link ${
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

        <div className="relative space-y-1.5 px-5 py-1.5! md:hidden">
          <div className="grid grid-cols-[48px_1fr_48px] items-center gap-3 border-b border-header-line pb-1.5!">
            <button
              type="button"
              className="site-header-mobile-toggle ml-1"
              aria-expanded={isMobileMenuOpen}
              aria-controls="site-mobile-menu"
              aria-label={isMobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
              onClick={() => setIsMobileMenuOpen((current) => !current)}
            >
              <span
                className={`site-header-mobile-line ${
                  isMobileMenuOpen ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`site-header-mobile-line ${isMobileMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`site-header-mobile-line ${
                  isMobileMenuOpen ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </button>

            <Link
              href={getLocalizedPath(locale, "home")}
              className="flex justify-center px-3 py-1"
              aria-label={dictionary.brand.name}
            >
              <Image
                src="/logo/emsel-logo.png"
                alt={dictionary.brand.name}
                width={220}
                height={275}
                priority
                className="h-auto w-[94.5px] object-contain"
              />
            </Link>

            <div aria-hidden="true" />
          </div>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <>
          <button
            type="button"
            className="site-header-mobile-scrim md:hidden"
            aria-label="Menüyü kapat"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <aside
            id="site-mobile-menu"
            className="site-header-mobile-drawer md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobil navigasyon"
          >
            <div className="site-header-mobile-drawer-top">
              <Link
                href={getLocalizedPath(locale, "home")}
                className="flex justify-center"
                aria-label={dictionary.brand.name}
              >
                <Image
                  src="/logo/emsel-logo.png"
                  alt={dictionary.brand.name}
                  width={220}
                  height={275}
                  priority
                  className="h-auto w-23 object-contain"
                />
              </Link>

              <button
                type="button"
                className="site-header-mobile-close"
                aria-label="Menüyü kapat"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="site-header-mobile-close-line rotate-45" />
                <span className="site-header-mobile-close-line -rotate-45" />
              </button>
            </div>

            <nav className="site-header-mobile-nav" aria-label="Mobil navigasyon linkleri">
              {allRouteKeys.map((routeKey) => {
                const item = buildNavItem(routeKey);
                const submenuItems = mobileSubmenus[routeKey];

                return (
                  <div key={item.key} className="site-header-mobile-entry">
                    <Link
                      href={item.href}
                      className={`site-header-mobile-link ${
                        isActive(item.href)
                          ? "site-header-mobile-link-active"
                          : "site-header-mobile-link-default"
                      }`}
                    >
                      <span>{item.label}</span>
                    </Link>

                    {submenuItems?.length ? (
                      <div className="site-header-mobile-submenu">
                        {submenuItems.map((submenuItem) => (
                          <span key={submenuItem} className="site-header-mobile-submenu-item">
                            {submenuItem}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </nav>

            <div className="site-header-mobile-actions">
              <div className="site-header-mobile-locales">
                {siteLocales.map((currentLocale) => {
                  const href = swapLocaleInPath(pathname, currentLocale);
                  const active = currentLocale === locale;
                  const meta = localeMeta[currentLocale];

                  return (
                    <Link
                      key={currentLocale}
                      href={href}
                      className={`site-header-mobile-locale ${
                        active
                          ? "site-header-mobile-locale-active"
                          : "site-header-mobile-locale-default"
                      }`}
                    >
                      <span
                        className={`site-header-flag ${meta.flagClassName}`}
                        aria-hidden="true"
                      />
                      <span>{meta.shortLabel}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>
        </>
      ) : null}
    </header>
  );
}
