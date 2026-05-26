import { unstable_cache } from "next/cache";

import type { Locale } from "@/i18n/config";
import { hasDatabaseConfig, prisma } from "@/lib/prisma";
import { normalizeTurkishText } from "@/lib/site/turkish-text";

export type PublishedWhoSection = {
  id: number;
  titleTr: string | null;
  titleEn: string | null;
  titleDe: string | null;
  whoDescTr: string | null;
  whoDescEn: string | null;
  whoDescDe: string | null;
  imageUrl: string | null;
  sortOrder: number;
};

export const getPublishedWhoSections = unstable_cache(
  async (): Promise<PublishedWhoSection[]> => {
    if (!hasDatabaseConfig()) {
      return [];
    }

    try {
      return await prisma.whoSection.findMany({
        where: {
          isActive: true,
        },
        select: {
          id: true,
          titleTr: true,
          titleEn: true,
          titleDe: true,
          whoDescTr: true,
          whoDescEn: true,
          whoDescDe: true,
          imageUrl: true,
          sortOrder: true,
        },
        orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
      });
    } catch (error) {
      console.error("PUBLISHED WHO CACHE ERROR:", error);
      return [];
    }
  },
  ["published-who"],
  {
    revalidate: 3600,
    tags: ["who"],
  },
);

export function getLocalizedWhoValue(locale: Locale, item: PublishedWhoSection) {
  if (locale === "en") {
    return {
      title: item.titleEn,
      description: item.whoDescEn,
    };
  }

  if (locale === "de") {
    return {
      title: item.titleDe,
      description: item.whoDescDe,
    };
  }

  return {
    title: normalizeTurkishText(item.titleTr),
    description: normalizeTurkishText(item.whoDescTr),
  };
}
