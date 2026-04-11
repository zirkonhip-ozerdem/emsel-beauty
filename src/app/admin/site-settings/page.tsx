const settingGroups = [
  {
    title: "Iletisim Bilgileri",
    description:
      "Telefon, e-posta, adres ve footer iceriklerinin panelden yonetilecegi alan.",
  },
  {
    title: "Genel Site Ayarlari",
    description:
      "Marka adi, favicon, temel SEO ve varsayilan paylasim gorselleri icin ayrilan modul.",
  },
  {
    title: "Rezervasyon Ayarlari",
    description:
      "Online rezervasyon butonlari, iletisim yonlendirmeleri ve sabit aksiyon alanlari.",
  },
];

export default function AdminSiteSettingsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[34px] border border-border bg-white/80 p-6 shadow-[var(--shadow)] sm:p-8">
        <span className="inline-flex rounded-full bg-accent-soft px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent-strong">
          Site Ayarlari
        </span>
        <h1 className="font-display mt-5 text-4xl text-foreground sm:text-5xl">
          Genel konfigurasyon alani hazir.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-muted">
          Bu ekran daha sonra veritabani ve form yapisi ile baglanarak sitenin
          genel ayarlarini panel uzerinden yonetmek icin kullanilacak.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {settingGroups.map((group) => (
          <article
            key={group.title}
            className="rounded-[28px] border border-border bg-surface-strong p-5"
          >
            <h2 className="text-xl font-semibold text-foreground">
              {group.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              {group.description}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
