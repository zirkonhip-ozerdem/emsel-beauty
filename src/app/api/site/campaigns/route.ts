import type { NextRequest } from "next/server";

import { hasDatabaseConfig, prisma } from "@/lib/prisma";
import {
  resolveSiteLocale,
  siteDbUnavailableResponse,
  siteJsonError,
  siteJsonSuccess,
} from "@/lib/site/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const locale = resolveSiteLocale(request.nextUrl.searchParams.get("locale"));

  if (!hasDatabaseConfig()) {
    return siteDbUnavailableResponse();
  }

  try {
    const campaigns = await prisma.campaign.findMany({
      where: {
        isActive: true,
      },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      select: {
        id: true,
        titleTr: true,
        titleEn: true,
        titleDe: true,
        seoUrlTr: true,
        seoUrlEn: true,
        seoUrlDe: true,
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
      },
    });

    const localizedCampaigns = campaigns.map((campaign) => ({
      id: campaign.id,
      title:
        locale === "tr" ? campaign.titleTr : locale === "en" ? campaign.titleEn : campaign.titleDe,
      slug:
        locale === "tr"
          ? campaign.seoUrlTr
          : locale === "en"
            ? campaign.seoUrlEn
            : campaign.seoUrlDe,
      description:
        locale === "tr" ? campaign.descTr : locale === "en" ? campaign.descEn : campaign.descDe,
      badge:
        locale === "tr" ? campaign.badgeTr : locale === "en" ? campaign.badgeEn : campaign.badgeDe,
      imageUrl: campaign.imageUrl,
      startsAt: campaign.startsAt,
      endsAt: campaign.endsAt,
      sortOrder: campaign.sortOrder,
    }));

    return siteJsonSuccess({
      locale,
      items: localizedCampaigns,
    });
  } catch (error) {
    console.error(error);
    return siteJsonError("Kampanyalar alinamadi.", 500);
  }
}
