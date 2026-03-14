import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Paneli",
  description: "Emsel Beauty yonetim paneli icin baslangic yerlesimi.",
};

const navigationItems = [
  "Dashboard",
  "Urun Yonetimi",
  "Hizmet Yonetimi",
  "Blog Icerikleri",
  "Iletisim Talepleri",
  "Site Ayarlari",
];

export default function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#f6efe7]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8">
        <aside className="rounded-[34px] border border-border bg-white/80 p-6 shadow-[var(--shadow)]">
          <div className="space-y-3">
            <p className="font-display text-3xl text-foreground">
              Emsel Admin
            </p>
            <p className="text-sm leading-7 text-muted">
              Bu alan tek dilli olarak planlandi. Icerik operasyonlarini sade,
              hizli ve ekip odakli yonetmek icin ayri tutuluyor.
            </p>
          </div>

          <nav className="mt-8 flex flex-col gap-2">
            {navigationItems.map((item, index) => (
              <div
                key={item}
                className={`rounded-[20px] px-4 py-3 text-sm ${
                  index === 0
                    ? "bg-accent-strong text-white"
                    : "bg-surface-strong text-foreground"
                }`}
              >
                {item}
              </div>
            ))}
          </nav>

          <div className="mt-8 rounded-[24px] bg-accent-soft p-4">
            <p className="text-sm font-semibold text-foreground">
              Siteye don
            </p>
            <Link
              href="/tr"
              className="mt-3 inline-flex rounded-full bg-accent-strong px-4 py-2 text-sm font-semibold text-white"
            >
              Turkce anasayfayi ac
            </Link>
          </div>
        </aside>

        <main>{children}</main>
      </div>
    </div>
  );
}
