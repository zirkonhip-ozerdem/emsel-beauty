export const siteLocales = ["tr", "en", "de"] as const;

export type Locale = (typeof siteLocales)[number];

export const defaultLocale: Locale = "tr";

export const siteRouteSegments = {
  home: "",
  products: "products",
  services: "services",
  blog: "blog",
  campaigns: "campaigns",
  contact: "contact",
  corporate: "corporate",
} as const;

export type SiteRouteKey = keyof typeof siteRouteSegments;

export const siteRouteKeys = Object.keys(siteRouteSegments) as SiteRouteKey[];

export function isLocale(value: string): value is Locale {
  return siteLocales.includes(value as Locale);
}

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return "ltr";
}

export function getLocalizedPath(locale: Locale, routeKey: SiteRouteKey): string {
  const segment = siteRouteSegments[routeKey];
  return segment ? `/${locale}/${segment}` : `/${locale}`;
}

export function swapLocaleInPath(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);

  if (!segments.length) {
    return `/${targetLocale}`;
  }

  if (isLocale(segments[0])) {
    segments[0] = targetLocale;
    return `/${segments.join("/")}`;
  }

  return `/${targetLocale}/${segments.join("/")}`;
}
