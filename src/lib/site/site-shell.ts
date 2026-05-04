import { unstable_cache } from "next/cache";

import type { Locale } from "@/i18n/config";
import { hasDatabaseConfig, prisma } from "@/lib/prisma";
import {
  getLocalizedServiceValue,
  getPublishedServices,
} from "@/lib/site/services";

type PublicSiteSetting = {
  siteName: string;
  email: string | null;
  phoneNumber: string | null;
  wpNumber: string | null;
  addressTr: string | null;
  addressEn: string | null;
  addressDe: string | null;
  mapEmbedUrl: string | null;
  workingHoursTr: string | null;
  workingHoursEn: string | null;
  workingHoursDe: string | null;
  logoUrl: string | null;
  faviconUrl: string | null;
  instagramUrl: string | null;
  facebookUrl: string | null;
  xUrl: string | null;
};

export type SiteShellData = {
  siteName: string | null;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  address: string | null;
  addressLines: string[];
  mapEmbedUrl: string | null;
  workingHours: string | null;
  workingHoursLines: string[];
  logoUrl: string | null;
  faviconUrl: string | null;
  instagramUrl: string | null;
  facebookUrl: string | null;
  xUrl: string | null;
  serviceLinks: Array<{
    id: number;
    label: string;
  }>;
};

const getPublicSiteSetting = unstable_cache(
  async (): Promise<PublicSiteSetting | null> => {
    if (!hasDatabaseConfig()) {
      return null;
    }

    try {
      return await prisma.siteSetting.findFirst({
        orderBy: [{ updatedAt: "desc" }, { id: "desc" }],
        select: {
          siteName: true,
          email: true,
          phoneNumber: true,
          wpNumber: true,
          addressTr: true,
          addressEn: true,
          addressDe: true,
          mapEmbedUrl: true,
          workingHoursTr: true,
          workingHoursEn: true,
          workingHoursDe: true,
          logoUrl: true,
          faviconUrl: true,
          instagramUrl: true,
          facebookUrl: true,
          xUrl: true,
        },
      });
    } catch (error) {
      console.error("PUBLIC SITE SETTINGS CACHE ERROR:", error);
      return null;
    }
  },
  ["public-site-setting"],
  {
    revalidate: 3600,
    tags: ["site-settings"],
  },
);

function getLocalizedValue(
  locale: Locale,
  values: {
    tr: string | null;
    en: string | null;
    de: string | null;
  },
) {
  if (locale === "en") {
    return values.en ?? values.tr ?? values.de ?? null;
  }

  if (locale === "de") {
    return values.de ?? values.tr ?? values.en ?? null;
  }

  return values.tr ?? values.en ?? values.de ?? null;
}

function splitLines(value: string | null) {
  if (!value) {
    return [];
  }

  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function getSiteShellData(locale: Locale): Promise<SiteShellData> {
  const [settings, services] = await Promise.all([
    getPublicSiteSetting(),
    getPublishedServices(),
  ]);

  const address = settings
    ? getLocalizedValue(locale, {
        tr: settings.addressTr,
        en: settings.addressEn,
        de: settings.addressDe,
      })
    : null;

  const workingHours = settings
    ? getLocalizedValue(locale, {
        tr: settings.workingHoursTr,
        en: settings.workingHoursEn,
        de: settings.workingHoursDe,
      })
    : null;

  return {
    siteName: settings?.siteName ?? null,
    email: settings?.email ?? null,
    phone: settings?.phoneNumber ?? null,
    whatsapp: settings?.wpNumber ?? null,
    address,
    addressLines: splitLines(address),
    mapEmbedUrl: settings?.mapEmbedUrl ?? null,
    workingHours,
    workingHoursLines: splitLines(workingHours),
    logoUrl: settings?.logoUrl ?? null,
    faviconUrl: settings?.faviconUrl ?? null,
    instagramUrl: settings?.instagramUrl ?? null,
    facebookUrl: settings?.facebookUrl ?? null,
    xUrl: settings?.xUrl ?? null,
    serviceLinks: services.slice(0, 5).map((service) => ({
      id: service.id,
      label: getLocalizedServiceValue(locale, service).name,
    })),
  };
}
