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
  const headingFont = "font-display";

  return (
    <div className="site-page">
      <PageHero
        locale={locale}
        eyebrow={dictionary.productsPage.hero.eyebrow}
        title={dictionary.productsPage.hero.title}
        description={dictionary.productsPage.hero.description}
        aside={
          <div className="space-y-3">
            {dictionary.productsPage.categories.map((category) => (
              <div key={category.title} className="site-card-plain">
                <p className="site-kicker">{category.title}</p>
                <p className="site-body mt-2">{category.detail}</p>
              </div>
            ))}
          </div>
        }
      />

      <section className="site-section">
        <SectionHeading
          locale={locale}
          eyebrow={dictionary.productsPage.hero.eyebrow}
          title={dictionary.productsPage.hero.title}
          description={dictionary.productsPage.hero.description}
        />
        <div className="site-grid-3">
          {dictionary.productsPage.categories.map((category) => (
            <article key={category.title} className="site-card">
              <h2 className={`${headingFont} text-3xl text-foreground`}>
                {category.title}
              </h2>
              <p className="site-body mt-4">{category.description}</p>
              <p className="mt-5 border-t border-border pt-5 text-sm leading-7 text-foreground">
                {category.detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="site-grid-3">
        {dictionary.productsPage.pillars.map((pillar) => (
          <article key={pillar.title} className="site-card-soft">
            <h3 className="site-title">{pillar.title}</h3>
            <p className="site-body mt-2">{pillar.description}</p>
          </article>
        ))}
      </section>

      <section className="site-section">
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
                <h3 className="site-title">{step.title}</h3>
                <p className="site-body mt-2">{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
