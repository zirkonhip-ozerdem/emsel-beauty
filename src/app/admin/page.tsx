const modules = [
  {
    title: "Urunler",
    description:
      "Kategori, koleksiyon, one cikan kartlar ve urun detay akislari icin yonetim alani.",
  },
  {
    title: "Hizmetler",
    description:
      "Seanslar, paketler, sureler, randevu notlari ve ekip atamalari icin hazir modul.",
  },
  {
    title: "Blog",
    description:
      "Cok dilli siteye gidecek editoral icerikleri panelden yonetmek icin genisleyebilir yapi.",
  },
  {
    title: "Iletisim",
    description:
      "Form basvurulari, is birligi talepleri ve randevu istekleri icin tek merkezli akıs.",
  },
];

const nextSteps = [
  "Veri modeli ve veritabanı baglantisi",
  "Kimlik dogrulama ve rol sistemi",
  "CRUD ekranlari ve media upload akisi",
  "Blog detay, kategori ve etiklet yönetimi",
];

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[34px] border border-border bg-white/80 p-6 shadow-[var(--shadow)] sm:p-8">
        <span className="inline-flex rounded-full bg-accent-soft px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent-strong">
          Dashboard
        </span>
        <h1 className="font-display mt-5 text-4xl text-foreground sm:text-5xl">
          Admin panel iskeleti hazir.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-muted">
          Site tarafini cok dilli kurarken paneli tek dilli ve operasyon odakli
          tuttuk. Bu ayirim, editor ekip icin gereksiz karmaşayi azaltir ve
          veri yonetimini netlestirir.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        {modules.map((module) => (
          <article
            key={module.title}
            className="rounded-[28px] border border-border bg-surface-strong p-5"
          >
            <h2 className="text-xl font-semibold text-foreground">
              {module.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              {module.description}
            </p>
          </article>
        ))}
      </section>

      <section className="rounded-[34px] border border-border bg-white/75 p-6">
        <h2 className="font-display text-3xl text-foreground">
          Sonraki teknik adimlar
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {nextSteps.map((step, index) => (
            <div
              key={step}
              className="rounded-[22px] border border-border bg-white p-4 text-sm leading-7 text-foreground"
            >
              <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent-strong">
                0{index + 1}
              </span>
              {step}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
