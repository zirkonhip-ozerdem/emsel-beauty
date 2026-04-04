import type { Metadata } from "next";
import Link from "next/link";

import type { Locale } from "@/i18n/config";
import { getPageMetadata } from "@/i18n/metadata";
import { resolveLocale, type LangRouteParams } from "@/i18n/server";

type CampaignsPageProps = {
  params: LangRouteParams;
};

const CAMPAIGNS_COPY: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    description: string;
    action: string;
    cards: Array<{
      title: string;
      detail: string;
      note: string;
    }>;
  }
> = {
  tr: {
    eyebrow: "Donemsel Firsatlar",
    title: "Kampanyalar",
    description:
      "Bakim rituelinizi daha avantajli planlayabilmeniz icin hazirlanan secili paketler ve donemsel firsatlar.",
    action: "Randevu Planla",
    cards: [
      {
        title: "Ilk Ziyaret Paketi",
        detail: "Cilt analizi ve imza bakiminda ozel tanisma fiyatlari.",
        note: "Sadece yeni misafirler icin",
      },
      {
        title: "Ikili Bakim Seti",
        detail: "Iki favori bakimi ayni seansta birlestiren ozel paket.",
        note: "Sinirli sureli kombin",
      },
      {
        title: "Mevsim Gecisi Firsati",
        detail: "Cilt yenileme ve nem dengesi odakli editoral bakim secimi.",
        note: "Donemsel bakim kurgusu",
      },
    ],
  },
  en: {
    eyebrow: "Seasonal Offers",
    title: "Campaigns",
    description:
      "Curated packages and limited-time offers designed to make your care ritual easier to plan.",
    action: "Plan Appointment",
    cards: [
      {
        title: "First Visit Package",
        detail: "Introductory pricing for skin analysis and signature care sessions.",
        note: "For new guests only",
      },
      {
        title: "Dual Care Bundle",
        detail: "A refined package that combines two favorite treatments in one session.",
        note: "Limited-time bundle",
      },
      {
        title: "Season Transition Offer",
        detail: "A curated selection focused on renewal and moisture balance.",
        note: "Seasonal ritual edit",
      },
    ],
  },
  de: {
    eyebrow: "Saisonale Angebote",
    title: "Kampagnen",
    description:
      "Ausgewahlte Pakete und zeitlich begrenzte Angebote fur eine stilvoll geplante Pflegeroutine.",
    action: "Termin Planen",
    cards: [
      {
        title: "Willkommenspaket",
        detail: "Besondere Einstiegspreise fur Hautanalyse und Signature-Behandlungen.",
        note: "Nur fur neue Gaste",
      },
      {
        title: "Doppelpflege Paket",
        detail: "Zwei beliebte Anwendungen in einer abgestimmten Sitzung vereint.",
        note: "Zeitlich begrenztes Paket",
      },
      {
        title: "Saison Wechsel Angebot",
        detail: "Eine Auswahl fur Erneuerung und ausgeglichene Feuchtigkeit.",
        note: "Saisonale Pflegeauswahl",
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: CampaignsPageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return getPageMetadata(locale, "campaigns");
}

export default async function CampaignsPage({ params }: CampaignsPageProps) {
  const locale = await resolveLocale(params);
  const copy = CAMPAIGNS_COPY[locale];

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

        <div className="grid gap-6 md:grid-cols-3">
          {copy.cards.map((card) => (
            <article
              key={card.title}
              className="rounded-[24px] border border-[#d9ccb3] bg-white/70 p-6 shadow-[0_18px_48px_rgba(95,70,35,0.08)] backdrop-blur-sm"
            >
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#8a6e36]">
                {card.note}
              </p>
              <h2 className="mt-4 font-display text-2xl text-[#3b2a1a]">
                {card.title}
              </h2>
              <p className="mt-3 font-body text-[15px] leading-7 text-[#6b4c32]">
                {card.detail}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="mt-6 inline-flex min-h-11 items-center justify-center border border-[#8a6e36] px-5 font-sans text-[11px] uppercase tracking-[0.26em] text-[#3b2a1a] transition hover:bg-[#efe5d0]"
              >
                {copy.action}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
