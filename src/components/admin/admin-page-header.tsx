type AdminPageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
  action?: React.ReactNode;
};

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  action,
}: AdminPageHeaderProps) {
  return (
    <section className="rounded-[32px] border border-border bg-white/85 p-6 shadow-[var(--shadow)] sm:p-8">
      {eyebrow ? (
        <span className="inline-flex rounded-full bg-accent-soft px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent-strong">
          {eyebrow}
        </span>
      ) : null}

      <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-base leading-8 text-muted">{description}</p>
        </div>

        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </section>
  );
}
