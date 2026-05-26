import { unstable_cache } from "next/cache";

import { prisma, hasDatabaseConfig } from "@/lib/prisma";
import type { Locale } from "@/i18n/config";
import { normalizeTurkishText } from "@/lib/site/turkish-text";

export type PublishedCampaign = {
  id: number;
  titleTr: string;
  titleEn: string;
  titleDe: string;
  descTr: string | null;
  descEn: string | null;
  descDe: string | null;
  badgeTr: string | null;
  badgeEn: string | null;
  badgeDe: string | null;
  imageUrl: string | null;
  startsAt: Date | null;
  endsAt: Date | null;
  sortOrder: number;
  seoUrlTr: string;
  seoUrlEn: string;
  seoUrlDe: string;
};

export const getPublishedCampaigns = unstable_cache(
  async (): Promise<PublishedCampaign[]> => {
    if (!hasDatabaseConfig()) {
      return [];
    }

    try {
      return await prisma.campaign.findMany({
        where: {
          isActive: true,
        },
        select: {
          id: true,
          titleTr: true,
          titleEn: true,
          titleDe: true,
          descTr: true,
          descEn: true,
          descDe: true,
          badgeTr: true,
          badgeEn: true,
          badgeDe: true,
          imageUrl: true,
          startsAt: true,
          endsAt: true,
          sortOrder: true,
          seoUrlTr: true,
          seoUrlEn: true,
          seoUrlDe: true,
        },
        orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
      });
    } catch (error) {
      console.error("PUBLISHED CAMPAIGNS CACHE ERROR:", error);
      return [];
    }
  },
  ["published-campaigns"],
  {
    revalidate: 3600,
    tags: ["campaigns"],
  },
);

export function getLocalizedCampaignValue(
  locale: Locale,
  campaign: PublishedCampaign,
) {
  if (locale === "en") {
    return {
      title: campaign.titleEn,
      description: campaign.descEn,
      badge: campaign.badgeEn,
      slug: campaign.seoUrlEn,
    };
  }

  if (locale === "de") {
    return {
      title: campaign.titleDe,
      description: campaign.descDe,
      badge: campaign.badgeDe,
      slug: campaign.seoUrlDe,
    };
  }

  return {
    title: normalizeTurkishText(campaign.titleTr),
    description: normalizeTurkishText(campaign.descTr),
    badge: normalizeTurkishText(campaign.badgeTr),
    slug: campaign.seoUrlTr,
  };
}
