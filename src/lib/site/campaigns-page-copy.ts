import type { Locale } from "@/i18n/config";

export type CampaignsPageCopy = {
  eyebrow: string;
  title: string;
  description: string;
  action: string;
  emptyTitle: string;
  emptyDescription: string;
  activePeriodLabel: string;
};

const campaignsPageCopy: Record<Locale, CampaignsPageCopy> = {
  tr: {
    eyebrow: "Donemsel Firsatlar",
    title: "Kampanyalar",
    description:
      "Bakim rituelinizi daha avantajli planlayabilmeniz icin hazirlanan secili paketler ve donemsel firsatlar.",
    action: "Randevu Planla",
    emptyTitle: "Aktif kampanya bulunmuyor",
    emptyDescription:
      "Yeni kampanyalar yayinlandiginda bu alanda otomatik olarak gorunecek.",
    activePeriodLabel: "Aktif kampanya",
  },
  en: {
    eyebrow: "Seasonal Offers",
    title: "Campaigns",
    description:
      "Curated packages and limited-time offers designed to make your care ritual easier to plan.",
    action: "Plan Appointment",
    emptyTitle: "No active campaigns yet",
    emptyDescription:
      "New offers will appear here automatically as soon as they are published.",
    activePeriodLabel: "Active campaign",
  },
  de: {
    eyebrow: "Saisonale Angebote",
    title: "Kampagnen",
    description:
      "Ausgewahlte Pakete und zeitlich begrenzte Angebote fur eine stilvoll geplante Pflegeroutine.",
    action: "Termin Planen",
    emptyTitle: "Noch keine aktiven Kampagnen",
    emptyDescription:
      "Neue Angebote werden hier automatisch angezeigt, sobald sie veroffentlicht sind.",
    activePeriodLabel: "Aktive Kampagne",
  },
};

export function getCampaignsPageCopy(locale: Locale): CampaignsPageCopy {
  return campaignsPageCopy[locale];
}
