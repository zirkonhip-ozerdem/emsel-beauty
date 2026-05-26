// src/app/(site)/[lang]/contact/page.tsx
// Kurulum: Bu dosyayı src/app/(site)/[lang]/contact/page.tsx olarak kaydedin.
// Yan dosya: contact.css dosyasını aynı klasöre (contact/ altına) yerleştirin.

import type { Metadata } from "next";
import { getPageMetadata } from "@/i18n/metadata";
import { resolveLocale, type LangRouteParams } from "@/i18n/server";
import { getContactPageContent } from "@/lib/site/contact-page";
import { getLocalizedCampaignValue, getPublishedCampaigns } from "@/lib/site/campaigns";
import { getLocalizedServiceValue, getPublishedServices } from "@/lib/site/services";
import { getSiteShellData } from "@/lib/site/site-shell";
import ContactClient from "./ContactClient";

// ─── SEO metadata (server tarafında üretilir) ────────────────────────────────
type ContactPageProps = {
  params: LangRouteParams;
};

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return getPageMetadata(locale, "contact");
}

export default async function ContactPage({ params }: ContactPageProps) {
  const locale = await resolveLocale(params);
  const [content, siteShell, services, campaigns] = await Promise.all([
    Promise.resolve(getContactPageContent(locale)),
    getSiteShellData(locale),
    getPublishedServices(),
    getPublishedCampaigns(),
  ]);

  const dynamicContent = {
    ...content,
    services: services.length
      ? services.map((service) => getLocalizedServiceValue(locale, service).name)
      : content.services,
    campaigns: campaigns.length
      ? campaigns.map((campaign) => getLocalizedCampaignValue(locale, campaign).title)
      : content.campaigns,
    contactInfo: {
      address: siteShell.addressLines.length
        ? siteShell.addressLines
        : content.contactInfo.address,
      phone: siteShell.phone || content.contactInfo.phone,
      email: siteShell.email || content.contactInfo.email,
      mapSrc: siteShell.mapEmbedUrl || content.contactInfo.mapSrc,
      whatsapp: (siteShell.whatsapp || content.contactInfo.whatsapp).replace(/\D/g, ""),
      workingHours: siteShell.workingHoursLines.length
        ? siteShell.workingHoursLines
        : content.contactInfo.workingHours,
    },
  };

  return <ContactClient content={dynamicContent} locale={locale} />;
}
