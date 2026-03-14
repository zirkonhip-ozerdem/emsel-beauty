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
    <div className="space-y-20">
      <PageHero
        locale={locale}
        eyebrow={dictionary.home.hero.eyebrow}
        title={dictionary.home.hero.title}
        description={dictionary.home.hero.description}
        actions={
          <>
            <Link
              href={getLocalizedPath(locale, "services")}
              className="rounded-full bg-accent-strong px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              {dictionary.home.hero.primary}
            </Link>
            <Link
              href={getLocalizedPath(locale, "corporate")}
              className="rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-muted"
            >
              {dictionary.home.hero.secondary}
            </Link>
          </>
        }
        aside={
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {dictionary.home.hero.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full bg-surface-muted px-3 py-2 text-xs font-semibold text-accent-strong"
                >
                  {badge}
                </span>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
              {dictionary.home.stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[24px] border border-border bg-white p-4"
                >
                  <p className={`${headingFont} text-3xl text-foreground`}>
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        }
      />

      <section className="space-y-8">
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

      <section className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <SectionHeading
          locale={locale}
          eyebrow={dictionary.home.services.eyebrow}
          title={dictionary.home.services.title}
          description={dictionary.home.services.description}
        />
        <div className="grid gap-4">
          {dictionary.home.services.items.map((item) => (
            <article
              key={item.title}
              className="rounded-[28px] border border-border bg-surface-strong p-5"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          locale={locale}
          eyebrow={dictionary.home.journal.eyebrow}
          title={dictionary.home.journal.title}
          description={dictionary.home.journal.description}
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {dictionary.home.journal.entries.map((entry) => (
            <article
              key={entry.title}
              className="rounded-[30px] border border-border bg-white/75 p-6"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
                {entry.meta}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-foreground">
                {entry.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                {entry.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[36px] bg-accent-strong px-6 py-8 text-white shadow-[var(--shadow)] sm:px-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="space-y-4">
            <h2 className={`${headingFont} text-3xl sm:text-4xl`}>
              {dictionary.home.cta.title}
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-white/78 sm:text-base">
              {dictionary.home.cta.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={getLocalizedPath(locale, "contact")}
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-accent-strong transition hover:opacity-90"
            >
              {dictionary.home.cta.primary}
            </Link>
            <Link
              href="/admin"
              className="rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {dictionary.home.cta.secondary}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
