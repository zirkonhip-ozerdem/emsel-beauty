export default function AdminCampaignCreatePage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[34px] border border-border bg-white/80 p-6 shadow-[var(--shadow)] sm:p-8">
        <span className="inline-flex rounded-full bg-accent-soft px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent-strong">
          Yeni Kampanya
        </span>
        <h1 className="font-display mt-5 text-4xl text-foreground sm:text-5xl">
          Kampanya olusturma formu icin hazir alan.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-muted">
          Bu sayfa sonraki backend adiminda form bileşenleri, yayin tarihi,
          gorsel alanlari ve CTA secimleri ile tamamlanacak.
        </p>
      </section>
    </div>
  );
}
