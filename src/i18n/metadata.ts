import type { Metadata } from "next";

import {
  getLocalizedPath,
  siteLocales,
  type Locale,
  type SiteRouteKey,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function getPageMetadata(locale: Locale, page: SiteRouteKey): Metadata {
  const dictionary = getDictionary(locale);
  const current = dictionary.seo[page];

  return {
    title: current.title,
    description: current.description,
    alternates: {
      canonical: getLocalizedPath(locale, page),
      languages: Object.fromEntries(
        siteLocales.map((currentLocale) => [
          currentLocale,
          getLocalizedPath(currentLocale, page),
        ]),
      ),
    },
  };
}
