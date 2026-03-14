import type { Locale } from "@/i18n/config";

type SectionHeadingProps = {
  locale: Locale;
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({
  locale,
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  const headingFont = locale === "ar" ? "font-arabic" : "font-display";

  return (
    <div className="max-w-3xl space-y-4">
      <span className="inline-flex rounded-full border border-border bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent-strong">
        {eyebrow}
      </span>
      <h2 className={`${headingFont} text-3xl leading-tight text-foreground sm:text-4xl`}>
        {title}
      </h2>
      <p className="text-base leading-8 text-muted sm:text-lg">
        {description}
      </p>
    </div>
  );
}
