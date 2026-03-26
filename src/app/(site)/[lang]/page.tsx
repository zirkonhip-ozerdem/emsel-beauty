import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { getLocalizedPath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getPageMetadata } from "@/i18n/metadata";
import { resolveLocale, type LangRouteParams } from "@/i18n/server";

type HomePageProps = {
  params: LangRouteParams;
};

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return getPageMetadata(locale, "home");
}

export default async function HomePage({ params }: HomePageProps) {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);
  const headingFont = locale === "ar" ? "font-arabic" : "font-display";

  return (
    <div>

      {/* 🔥 HERO */}
      <PageHero
        locale={locale}
        eyebrow={dictionary.home.hero.eyebrow}
        title={dictionary.home.hero.title}
        description={dictionary.home.hero.description}
        actions={
          <>
            <Link
              href={getLocalizedPath(locale, "services")}
              className="rounded-full bg-[#1f3d2b] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              {dictionary.home.hero.primary}
            </Link>
            <Link
              href={getLocalizedPath(locale, "corporate")}
              className="rounded-full border border-white px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {dictionary.home.hero.secondary}
            </Link>
          </>
        }
      />

      {/* 🔥 HERO ile OUR STORY arasına boşluk */}
      <div className="h-12"></div>

      {/* 🔥 OUR STORY */}
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="bg-[#ebe6dd] rounded-xl p-10 shadow-2xl flex justify-between items-center">

          {/* SOL */}
          <div>
            <h2 className="text-3xl font-semibold mb-4">OUR STORY</h2>
            <p className="text-gray-600 max-w-md">
              Optima heated Ayurvedic massage & wellness treatments designed to relax your body and mind.
            </p>
          </div>

          {/* BUTON */}
          <button className="bg-[#1f3d2b] text-white px-6 py-3 rounded-md">
            ÜRÜNLERİ İNCELE
          </button>

        </div>
      </div>

      {/* 🔥 KARTLAR */}
      <div className="mt-12 w-full max-w-5xl mx-auto grid grid-cols-3 gap-6 px-4">

        <div className="bg-white rounded-xl overflow-hidden shadow-xl hover:scale-105 transition">
          <img src="/treatment1.jpg" className="h-40 w-full object-cover" />
          <p className="text-center py-3 font-semibold">Head Massage</p>
        </div>

        <div className="bg-white rounded-xl overflow-hidden shadow-xl hover:scale-105 transition">
          <img src="/treatment2.jpg" className="h-40 w-full object-cover" />
          <p className="text-center py-3 font-semibold">Nail Art</p>
        </div>

        <div className="bg-white rounded-xl overflow-hidden shadow-xl hover:scale-105 transition">
          <img src="/treatment3.jpg" className="h-40 w-full object-cover" />
          <p className="text-center py-3 font-semibold">Other Massage</p>
        </div>

      </div>

      {/* 🔽 DEVAM */}
      <section className="mt-32 space-y-8">
        <SectionHeading
          locale={locale}
          eyebrow={dictionary.home.products.eyebrow}
          title={dictionary.home.products.title}
          description={dictionary.home.products.description}
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {dictionary.home.products.items.map((item, index) => (
            <article
              key={item.title}
              className="rounded-[30px] border border-border bg-white/78 p-6 shadow-[var(--shadow)]"
            >
              <span className="text-sm font-semibold uppercase tracking-[0.22em] text-accent-strong">
                0{index + 1}
              </span>
              <h3 className={`${headingFont} mt-5 text-3xl text-foreground`}>
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
}