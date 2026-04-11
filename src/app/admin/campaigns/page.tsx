const campaignItems = [
  {
    title: "Ana Banner Kampanyasi",
    description:
      "Anasayfa hero alaninda one cikarilacak donemsel teklif ve yonlendirme kurgusu.",
  },
  {
    title: "Paket Kampanyalari",
    description:
      "Birden fazla hizmeti ya da urunu tek bir kampanya kartinda birlestiren paket yapisi.",
  },
  {
    title: "Kisa Sureli Firsatlar",
    description:
      "Bitis tarihi, durum etiketi ve CTA butonu ile yonetilecek sinirli sureli teklifler.",
  },
];

export default function AdminCampaignsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[34px] border border-border bg-white/80 p-6 shadow-[var(--shadow)] sm:p-8">
        <span className="inline-flex rounded-full bg-accent-soft px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent-strong">
          Kampanyalar
        </span>
        <h1 className="font-display mt-5 text-4xl text-foreground sm:text-5xl">
          Kampanya yonetimi icin hazir alan.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-muted">
          Bu ekran sonraki adimda veritabani baglantisi ile dinamik hale
          getirilecek. Buradan kampanya kartlari, yayin durumlari ve landing
          yonlendirmeleri yonetilecek.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {campaignItems.map((item) => (
          <article
            key={item.title}
            className="rounded-[28px] border border-border bg-surface-strong p-5"
          >
            <h2 className="text-xl font-semibold text-foreground">
              {item.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              {item.description}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
