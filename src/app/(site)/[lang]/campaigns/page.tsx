import type { Metadata } from "next";
import Link from "next/link";

import { getLocalizedPath } from "@/i18n/config";
import { getPageMetadata } from "@/i18n/metadata";
import { resolveLocale, type LangRouteParams } from "@/i18n/server";
import {
  getLocalizedCampaignValue,
  getPublishedCampaigns,
} from "@/lib/site/campaigns";
import { getCampaignsPageCopy } from "@/lib/site/campaigns-page-copy";

type CampaignsPageProps = {
  params: LangRouteParams;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: CampaignsPageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return getPageMetadata(locale, "campaigns");
}

export default async function CampaignsPage({ params }: CampaignsPageProps) {
  const locale = await resolveLocale(params);
  const copy = getCampaignsPageCopy(locale);
  const campaigns = await getPublishedCampaigns();

  const formatter = new Intl.DateTimeFormat(
    locale === "tr" ? "tr-TR" : locale === "de" ? "de-DE" : "en-US",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  );

  const formatCampaignPeriod = (
    startsAt: Date | null,
    endsAt: Date | null,
  ) => {
    if (!startsAt && !endsAt) {
      return copy.activePeriodLabel;
    }

    const startLabel = startsAt ? formatter.format(startsAt) : null;
    const endLabel = endsAt ? formatter.format(endsAt) : null;

    if (startLabel && endLabel) {
      return `${startLabel} - ${endLabel}`;
    }

    return startLabel ?? endLabel ?? copy.activePeriodLabel;
  };

  return (
    <section className="w-full bg-[#f7f2e8]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <header className="border-b border-[#d9ccb3] pb-8 text-center">
          <p className="font-sans text-[11px] uppercase tracking-[0.34em] text-[#8a6e36]">
            {copy.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-4xl tracking-[0.12em] text-[#3b2a1a] sm:text-5xl">
            {copy.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-base leading-8 text-[#6b4c32]">
            {copy.description}
          </p>
        </header>

        {campaigns.length === 0 ? (
          <div className="rounded-[24px] border border-[#d9ccb3] bg-white/70 p-8 text-center shadow-[0_18px_48px_rgba(95,70,35,0.08)] backdrop-blur-sm">
            <h2 className="font-display text-2xl text-[#3b2a1a]">
              {copy.emptyTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl font-body text-[15px] leading-7 text-[#6b4c32]">
              {copy.emptyDescription}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {campaigns.map((campaign) => {
              const localized = getLocalizedCampaignValue(locale, campaign);

              return (
                <article
                  key={campaign.id}
                  className="overflow-hidden rounded-[24px] border border-[#d9ccb3] bg-white/70 shadow-[0_18px_48px_rgba(95,70,35,0.08)] backdrop-blur-sm"
                >
                  <div className="relative h-52 bg-[#ede2cf]">
                    {campaign.imageUrl ? (
                      <img
                        src={campaign.imageUrl}
                        alt={localized.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(230,204,147,0.75),rgba(197,160,89,0.18),rgba(255,255,255,0.2))]" />
                    )}
                  </div>

                  <div className="p-6">
                    <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#8a6e36]">
                      {localized.badge?.trim() ||
                        formatCampaignPeriod(campaign.startsAt, campaign.endsAt)}
                    </p>
                    <h2 className="mt-4 font-display text-2xl text-[#3b2a1a]">
                      {localized.title}
                    </h2>
                    <p className="mt-3 font-body text-[15px] leading-7 text-[#6b4c32]">
                      {localized.description?.trim() || copy.emptyDescription}
                    </p>
                    <Link
                      href={getLocalizedPath(locale, "contact")}
                      className="mt-6 inline-flex min-h-11 items-center justify-center border border-[#8a6e36] px-5 font-sans text-[11px] uppercase tracking-[0.26em] text-[#3b2a1a] transition hover:bg-[#efe5d0]"
                    >
                      {copy.action}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
