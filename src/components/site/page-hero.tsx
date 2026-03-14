import type { ReactNode } from "react";

import type { Locale } from "@/i18n/config";

type PageHeroProps = {
  locale: Locale;
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  aside?: ReactNode;
};

export function PageHero({
  locale,
  eyebrow,
  title,
  description,
  actions,
  aside,
}: PageHeroProps) {
  const headingFont = locale === "ar" ? "font-arabic" : "font-display";

  return (
    <section className="grid gap-6 rounded-[40px] border border-border bg-white/72 p-6 shadow-[var(--shadow)] backdrop-blur md:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.85fr)] md:p-8 lg:p-10">
      <div className="space-y-6">
        <span className="inline-flex rounded-full bg-accent-soft px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-accent-strong">
          {eyebrow}
        </span>
        <div className="space-y-4">
          <h1 className={`${headingFont} max-w-4xl text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl`}>
            {title}
          </h1>
          <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
            {description}
          </p>
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
      {aside ? (
        <div className="rounded-[32px] border border-border bg-surface-strong p-6">
          {aside}
        </div>
      ) : null}
    </section>
  );
}
