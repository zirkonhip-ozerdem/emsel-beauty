import type { Metadata } from "next";

import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { getDictionary } from "@/i18n/dictionaries";
import { getPageMetadata } from "@/i18n/metadata";
import { resolveLocale, type LangRouteParams } from "@/i18n/server";

type CorporatePageProps = {
  params: LangRouteParams;
};

export async function generateMetadata({
  params,
}: CorporatePageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return getPageMetadata(locale, "corporate");
}

export default async function CorporatePage({ params }: CorporatePageProps) {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);
  const headingFont = locale === "ar" ? "font-arabic" : "font-display";

  return (
    <div className="space-y-16">
      <PageHero
        locale={locale}
        eyebrow={dictionary.corporatePage.hero.eyebrow}
        title={dictionary.corporatePage.hero.title}
        description={dictionary.corporatePage.hero.description}
        aside={
          <div className="space-y-3">
            {dictionary.corporatePage.values.map((value) => (
              <div
                key={value.title}
                className="rounded-[24px] border border-border bg-white p-4"
              >
                <p className="text-sm font-semibold text-foreground">
                  {value.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        }
      />

      <section className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <SectionHeading
          locale={locale}
          eyebrow={dictionary.corporatePage.hero.eyebrow}
          title={dictionary.corporatePage.intro.title}
          description={dictionary.corporatePage.intro.description}
        />
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
          {dictionary.corporatePage.values.map((value) => (
            <article
              key={value.title}
              className="rounded-[28px] border border-border bg-surface-strong p-5"
            >
              <h2 className="text-lg font-semibold text-foreground">
                {value.title}
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted">
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="max-w-3xl">
          <h2 className={`${headingFont} text-3xl text-foreground sm:text-4xl`}>
            {dictionary.corporatePage.promise.title}
          </h2>
          <p className="mt-4 text-base leading-8 text-muted">
            {dictionary.corporatePage.promise.description}
          </p>
        </div>
        <div className="grid gap-4">
          {dictionary.corporatePage.milestones.map((item) => (
            <article
              key={item.year}
              className="grid gap-4 rounded-[28px] border border-border bg-white/78 p-5 md:grid-cols-[96px_minmax(0,1fr)] md:items-start"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-lg font-semibold text-accent-strong">
                {item.year}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-muted">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[34px] border border-border bg-accent-soft p-6">
        <ul className="grid gap-4 md:grid-cols-3">
          {dictionary.corporatePage.promise.items.map((item) => (
            <li
              key={item}
              className="rounded-[24px] border border-white/60 bg-white/70 p-5 text-sm leading-7 text-foreground"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
