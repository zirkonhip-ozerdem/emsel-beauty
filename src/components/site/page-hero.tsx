import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";

type PageHeroProps = {
  locale: Locale;
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
};

export function PageHero({
  locale,
  eyebrow,
  title,
  description,
  actions,
}: PageHeroProps) {
  const headingFont = locale === "ar" ? "font-arabic" : "font-display";

  return (
    <section className="relative h-[420px] md:h-[500px] w-full overflow-hidden">

      {/* 🖼️ BACKGROUND IMAGE */}
      <img
        src="/hero.jpg"
        alt="spa"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* 🌑 DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* ✨ CONTENT */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">

        <span className="uppercase tracking-[0.3em] text-sm mb-4">
          {eyebrow}
        </span>

        <h1 className={`${headingFont} text-4xl md:text-6xl font-bold`}>
          {title}
        </h1>

        <p className="mt-4 text-lg max-w-xl">
          {description}
        </p>

        {actions && (
          <div className="mt-6 flex gap-4">
            {actions}
          </div>
        )}
      </div>
    </section>
  );
}