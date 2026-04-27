import { resolveSiteLocale, siteDbUnavailableResponse, siteJsonSuccess } from "@/lib/site/server";
import {
  getLocalizedCampaignValue,
  getPublishedCampaigns,
} from "@/lib/site/campaigns";
import { hasDatabaseConfig } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!hasDatabaseConfig()) {
    return siteDbUnavailableResponse();
  }

  const { searchParams } = new URL(request.url);
  const locale = resolveSiteLocale(searchParams.get("locale"));
  const campaigns = await getPublishedCampaigns();

  const localizedCampaigns = campaigns.map((campaign) => {
    const localized = getLocalizedCampaignValue(locale, campaign);

    return {
    id: campaign.id,
    title: localized.title,
    description: localized.description,
    badge: localized.badge,
    slug: localized.slug,
    imageUrl: campaign.imageUrl,
    startsAt: campaign.startsAt,
    endsAt: campaign.endsAt,
    sortOrder: campaign.sortOrder,
    };
  });

  return siteJsonSuccess(localizedCampaigns);
}
