import type { Metadata } from "next";

import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { getDictionary } from "@/i18n/dictionaries";
import { getPageMetadata } from "@/i18n/metadata";
import { resolveLocale, type LangRouteParams } from "@/i18n/server";

type ProductsPageProps = {
  params: LangRouteParams;
};

export async function generateMetadata({
  params,
}: ProductsPageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return getPageMetadata(locale, "products");
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);
  const headingFont = locale === "ar" ? "font-arabic" : "font-display";

  return (
    <div className="space-y-16">
      <PageHero
        locale={locale}
        eyebrow={dictionary.productsPage.hero.eyebrow}
        title={dictionary.productsPage.hero.title}
        description={dictionary.productsPage.hero.description}
        aside={
          <div className="space-y-3">
            {dictionary.productsPage.categories.map((category) => (
              <div
                key={category.title}
                className="rounded-[24px] border border-border bg-white p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-strong">
                  {category.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {category.detail}
                </p>
              </div>
            ))}
          </div>
        }
      />

      <section className="space-y-8">
        <SectionHeading
          locale={locale}
          eyebrow={dictionary.productsPage.hero.eyebrow}
          title={dictionary.productsPage.hero.title}
          description={dictionary.productsPage.hero.description}
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {dictionary.productsPage.categories.map((category) => (
            <article
              key={category.title}
              className="rounded-[30px] border border-border bg-white/78 p-6 shadow-[var(--shadow)]"
            >
              <h2 className={`${headingFont} text-3xl text-foreground`}>
                {category.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                {category.description}
              </p>
              <p className="mt-5 border-t border-border pt-5 text-sm leading-7 text-foreground">
                {category.detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {dictionary.productsPage.pillars.map((pillar) => (
          <article
            key={pillar.title}
            className="rounded-[28px] border border-border bg-surface-strong p-5"
          >
            <h3 className="text-lg font-semibold text-foreground">
              {pillar.title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted">
              {pillar.description}
            </p>
          </article>
        ))}
      </section>

      <section className="space-y-8">
        <div className="max-w-3xl">
          <h2 className={`${headingFont} text-3xl text-foreground sm:text-4xl`}>
            {dictionary.productsPage.roadmap[0].title}
          </h2>
        </div>
        <div className="grid gap-4">
          {dictionary.productsPage.roadmap.map((step, index) => (
            <article
              key={step.title}
              className="grid gap-4 rounded-[28px] border border-border bg-white/75 p-5 md:grid-cols-[72px_minmax(0,1fr)] md:items-start"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-lg font-semibold text-accent-strong">
                0{index + 1}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-muted">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
