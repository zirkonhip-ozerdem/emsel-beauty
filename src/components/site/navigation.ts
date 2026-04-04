import type { SiteRouteKey } from "@/i18n/config";

export const headerLeftRouteKeys = ["home", "services", "blog"] as const satisfies readonly SiteRouteKey[];

export const headerRightRouteKeys = [
  "corporate",
  "products",
  "campaigns",
] as const satisfies readonly SiteRouteKey[];

export const footerRouteKeys = [
  "home",
  "services",
  "blog",
  "corporate",
  "products",
  "contact",
] as const satisfies readonly SiteRouteKey[];
