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
  const headingFont = "font-display";

  return (
    <section className="site-hero">
      <div className="space-y-6">
        <span className="site-badge">{eyebrow}</span>
        <div className="space-y-4">
          <h1 className={`${headingFont} site-heading-lg max-w-4xl leading-tight`}>
            {title}
          </h1>
          <p className="site-body-lg max-w-2xl">{description}</p>
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
      {aside ? <div className="site-hero-panel">{aside}</div> : null}
    </section>
  );
}
