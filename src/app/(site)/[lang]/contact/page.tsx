import type { Metadata } from "next";

import { PageHero } from "@/components/site/page-hero";
import { getDictionary } from "@/i18n/dictionaries";
import { getPageMetadata } from "@/i18n/metadata";
import { resolveLocale, type LangRouteParams } from "@/i18n/server";

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
  const dictionary = getDictionary(locale);
  const headingFont = locale === "ar" ? "font-arabic" : "font-display";

  return (
    <div className="space-y-16">
      <PageHero
        locale={locale}
        eyebrow={dictionary.contactPage.hero.eyebrow}
        title={dictionary.contactPage.hero.title}
        description={dictionary.contactPage.hero.description}
        aside={
          <div className="space-y-3">
            {dictionary.contactPage.office.items.slice(0, 3).map((item) => (
              <div
                key={item.label}
                className="rounded-[24px] border border-border bg-white p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-strong">
                  {item.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        }
      />

      <section className="grid gap-5 lg:grid-cols-3">
        {dictionary.contactPage.cards.map((card) => (
          <article
            key={card.title}
            className="rounded-[30px] border border-border bg-white/78 p-6 shadow-[var(--shadow)]"
          >
            <h2 className="text-xl font-semibold text-foreground">
              {card.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              {card.description}
            </p>
            <p className="mt-5 border-t border-border pt-5 text-sm leading-7 text-foreground">
              {card.detail}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <article className="rounded-[34px] border border-border bg-surface-strong p-6">
          <h2 className={`${headingFont} text-3xl text-foreground`}>
            {dictionary.contactPage.office.title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            {dictionary.contactPage.office.description}
          </p>
          <div className="mt-6 grid gap-4">
            {dictionary.contactPage.office.items.map((item) => (
              <div
                key={item.label}
                className="rounded-[24px] border border-border bg-white p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-strong">
                  {item.label}
                </p>
                <p className="mt-2 text-sm leading-7 text-foreground">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[34px] border border-border bg-white/80 p-6 shadow-[var(--shadow)]">
          <h2 className={`${headingFont} text-3xl text-foreground`}>
            {dictionary.contactPage.form.title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            {dictionary.contactPage.form.description}
          </p>
          <form className="mt-6 space-y-4">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-foreground">
                {dictionary.contactPage.form.nameLabel}
              </span>
              <input
                type="text"
                placeholder={dictionary.contactPage.form.namePlaceholder}
                className="w-full rounded-[20px] border border-border bg-surface-strong px-4 py-3 text-sm text-foreground outline-none ring-0 placeholder:text-muted"
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-foreground">
                {dictionary.contactPage.form.emailLabel}
              </span>
              <input
                type="email"
                placeholder={dictionary.contactPage.form.emailPlaceholder}
                className="w-full rounded-[20px] border border-border bg-surface-strong px-4 py-3 text-sm text-foreground outline-none ring-0 placeholder:text-muted"
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-foreground">
                {dictionary.contactPage.form.messageLabel}
              </span>
              <textarea
                rows={5}
                placeholder={dictionary.contactPage.form.messagePlaceholder}
                className="w-full rounded-[20px] border border-border bg-surface-strong px-4 py-3 text-sm text-foreground outline-none ring-0 placeholder:text-muted"
              />
            </label>
            <button
              type="button"
              className="rounded-full bg-accent-strong px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              {dictionary.contactPage.form.button}
            </button>
          </form>
          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-accent-strong">
            {dictionary.contactPage.form.note}
          </p>
        </article>
      </section>
    </div>
  );
}
