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
  const headingFont = "font-display";

  return (
    <div className="max-w-3xl space-y-4">
      <span className="inline-flex rounded-full border border-border bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent-strong">
        {eyebrow}
      </span>
      <h2 className={`${headingFont} site-heading leading-tight`}>
        {title}
      </h2>
      <p className="site-body-lg">
        {description}
      </p>
    </div>
  );
}
