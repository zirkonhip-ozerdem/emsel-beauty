import type { Metadata } from "next";

import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { getDictionary } from "@/i18n/dictionaries";
import { getPageMetadata } from "@/i18n/metadata";
import { resolveLocale, type LangRouteParams } from "@/i18n/server";

type BlogPageProps = {
  params: LangRouteParams;
};

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return getPageMetadata(locale, "blog");
}

export default async function BlogPage({ params }: BlogPageProps) {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);
  const headingFont = locale === "ar" ? "font-arabic" : "font-display";

  return (
    <div className="space-y-16">
      <PageHero
        locale={locale}
        eyebrow={dictionary.blogPage.hero.eyebrow}
        title={dictionary.blogPage.hero.title}
        description={dictionary.blogPage.hero.description}
        aside={
          <div className="flex flex-wrap gap-2">
            {dictionary.blogPage.topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full bg-surface-muted px-3 py-2 text-sm text-foreground"
              >
                {topic}
              </span>
            ))}
          </div>
        }
      />

      <section className="space-y-8">
        <SectionHeading
          locale={locale}
          eyebrow={dictionary.blogPage.featured.tag}
          title={dictionary.blogPage.featured.title}
          description={dictionary.blogPage.featured.description}
        />
        <article className="rounded-[34px] border border-border bg-white/80 p-6 shadow-[var(--shadow)] md:p-8">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_220px] md:items-start">
            <div>
              <span className="inline-flex rounded-full bg-accent-soft px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-strong">
                {dictionary.blogPage.featured.tag}
              </span>
              <h2 className={`${headingFont} mt-5 text-4xl text-foreground`}>
                {dictionary.blogPage.featured.title}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-muted sm:text-base">
                {dictionary.blogPage.featured.description}
              </p>
            </div>
            <div className="rounded-[28px] border border-border bg-surface-strong p-5">
              <p className="text-sm leading-7 text-muted">
                {dictionary.home.journal.description}
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {dictionary.blogPage.posts.map((post) => (
          <article
            key={post.title}
            className="rounded-[30px] border border-border bg-white/78 p-6"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-strong">
              {post.meta}
            </span>
            <h3 className="mt-4 text-xl font-semibold text-foreground">
              {post.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              {post.description}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
