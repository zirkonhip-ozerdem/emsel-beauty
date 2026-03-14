import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { getLocalizedPath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getPageMetadata } from "@/i18n/metadata";
import { resolveLocale, type LangRouteParams } from "@/i18n/server";

type ServicesPageProps = {
  params: LangRouteParams;
};

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return getPageMetadata(locale, "services");
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);
  const headingFont = locale === "ar" ? "font-arabic" : "font-display";

  return (
    <div className="space-y-16">
      <PageHero
        locale={locale}
        eyebrow={dictionary.servicesPage.hero.eyebrow}
        title={dictionary.servicesPage.hero.title}
        description={dictionary.servicesPage.hero.description}
        aside={
          <div className="space-y-3">
            {dictionary.servicesPage.packages.map((service) => (
              <div
                key={service.title}
                className="rounded-[24px] border border-border bg-white p-4"
              >
                <p className="text-sm font-semibold text-foreground">
                  {service.title}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-accent-strong">
                  {service.meta}
                </p>
              </div>
            ))}
          </div>
        }
      />

      <section className="space-y-8">
        <SectionHeading
          locale={locale}
          eyebrow={dictionary.servicesPage.hero.eyebrow}
          title={dictionary.servicesPage.hero.title}
          description={dictionary.servicesPage.hero.description}
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {dictionary.servicesPage.packages.map((service) => (
            <article
              key={service.title}
              className="rounded-[30px] border border-border bg-white/78 p-6 shadow-[var(--shadow)]"
            >
              <h2 className={`${headingFont} text-3xl text-foreground`}>
                {service.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                {service.description}
              </p>
              <p className="mt-5 border-t border-border pt-5 text-xs font-semibold uppercase tracking-[0.18em] text-accent-strong">
                {service.meta}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {dictionary.servicesPage.flow.map((item, index) => (
          <article
            key={item.title}
            className="rounded-[28px] border border-border bg-surface-strong p-5"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-strong">
              0{index + 1}
            </span>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted">
              {item.description}
            </p>
          </article>
        ))}
      </section>

      <section className="rounded-[36px] border border-border bg-accent-soft px-6 py-8 sm:px-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="space-y-4">
            <h2 className={`${headingFont} text-3xl text-foreground sm:text-4xl`}>
              {dictionary.servicesPage.cta.title}
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-muted sm:text-base">
              {dictionary.servicesPage.cta.description}
            </p>
          </div>
          <Link
            href={getLocalizedPath(locale, "contact")}
            className="rounded-full bg-accent-strong px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            {dictionary.servicesPage.cta.action}
          </Link>
        </div>
      </section>
    </div>
  );
}
