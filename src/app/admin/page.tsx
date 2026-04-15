import Link from "next/link";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { getAdminDashboardCounts } from "@/lib/admin/crud";
import { adminResources } from "@/lib/admin/resources";
import { isDatabaseReady, withOptionalDatabase } from "@/lib/admin/server";

const nextSteps = [
  "DATABASE_URL değerini env dosyalarına ekle",
  "Prisma migrate veya db push ile tabloları oluştur",
  "Prisma seed ile ilk site ayarı ve hikâye verilerini bas",
  "Sonraki adımda public site sayfalarını DB tabanlı hale getir",
];

export default async function AdminPage() {
  const databaseReady = isDatabaseReady();
  const counts = await withOptionalDatabase(
    {
      campaigns: 0,
      users: 0,
      who: 0,
      "site-settings": 0,
      products: 0,
      services: 0,
      "blog-posts": 0,
      "contact-appointments": 0,
    },
    () => getAdminDashboardCounts(),
  );

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Gösterge Paneli"
        title="Prisma tabanlı admin panel hazır."
        description="Bu panel, dbdiagram üzerinden çıkardığımız modüllere göre kuruldu. Supabase bağlantısını yaptığımız anda tüm CRUD ekranları aynı omurga ile çalışacak."
      />

      {!databaseReady ? (
        <section className="rounded-[28px] border border-dashed border-[#d4bd95] bg-[#fff8ec] p-5 text-sm leading-7 text-[#7b6b4a]">
          Veritabanı bağlantısı henüz env tarafında tanımlı değil. Bu normal; ekranlar
          hazır, Supabase bağlantısını eklediğimiz anda listeleme ve kaydetme işlemleri
          aktif olacak.
        </section>
      ) : null}

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {adminResources.map((module) => (
          <article
            key={module.key}
            className="rounded-[28px] border border-border bg-white/85 p-5 shadow-[var(--shadow)]"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-xl font-semibold text-foreground">{module.title}</h2>
              <span className="rounded-full bg-accent-soft/40 px-3 py-1 text-xs font-semibold text-accent-strong">
                {counts[module.key]}
              </span>
            </div>
            <p className="mt-3 min-h-[84px] text-sm leading-7 text-muted">
              {module.description}
            </p>
            <Link
              href={module.href}
              className="mt-4 inline-flex rounded-full bg-accent-strong px-4 py-2 text-sm font-semibold text-white"
            >
              Modülü aç
            </Link>
          </article>
        ))}
      </section>

      <section className="rounded-[34px] border border-border bg-white/75 p-6">
        <h2 className="font-display text-3xl text-foreground">
          Sonraki teknik adımlar
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
