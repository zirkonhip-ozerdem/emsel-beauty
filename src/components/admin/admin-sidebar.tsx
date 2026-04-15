"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { adminResources } from "@/lib/admin/resources";
import type { AdminResourceKey } from "@/lib/admin/types";

type AdminSidebarProps = {
  counts?: Partial<Record<AdminResourceKey, number>>;
};

export function AdminSidebar({ counts }: AdminSidebarProps) {
  const pathname = usePathname();
  const [liveCounts, setLiveCounts] = useState<Partial<Record<AdminResourceKey, number>>>(
    counts ?? {},
  );

  useEffect(() => {
    let cancelled = false;

    const fetchCounts = async () => {
      try {
        const response = await fetch("/api/admin/dashboard", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json().catch(() => null)) as
          | {
              ok?: boolean;
              data?: Partial<Record<AdminResourceKey, number>>;
            }
          | null;

        if (!cancelled && payload?.ok && payload.data) {
          setLiveCounts(payload.data);
        }
      } catch {
        // Sidebar sayaçları yardımcı veri; hata olursa mevcut görünümü koruyoruz.
      }
    };

    void fetchCounts();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <aside className="rounded-[32px] border border-border bg-white/88 p-6 shadow-[var(--shadow)]">
      <div className="space-y-3">
        <p className="font-display text-3xl text-foreground">Emsel Admin</p>
        <p className="text-sm leading-7 text-muted">
          Çok dilli site içeriklerini tek dilli bir operasyon panelinden
          yönetiyoruz. Modüller veritabanındaki tablolara bire bir bağlanacak
          şekilde tasarlandı.
        </p>
      </div>

      <nav className="mt-8 flex flex-col gap-2">
        <Link
          href="/admin"
          className={`flex items-center justify-between rounded-[20px] px-4 py-3 text-sm transition ${
            pathname === "/admin"
              ? "bg-accent-strong text-white"
              : "bg-surface-strong text-foreground hover:bg-accent-soft/40"
          }`}
        >
          <span>Gösterge Paneli</span>
        </Link>

        {adminResources.map((resource) => {
          const isActive =
            pathname === resource.href || pathname.startsWith(`${resource.href}/`);

          return (
            <Link
              key={resource.key}
              href={resource.href}
              className={`flex items-center justify-between rounded-[20px] px-4 py-3 text-sm transition ${
                isActive
                  ? "bg-accent-strong text-white"
                  : "bg-surface-strong text-foreground hover:bg-accent-soft/40"
              }`}
            >
              <span>{resource.title}</span>
              <span
                className={`rounded-full px-2 py-1 text-xs ${
                  isActive
                    ? "bg-white/16 text-white"
                    : "bg-white text-accent-strong"
                }`}
              >
                {liveCounts[resource.key] ?? 0}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 rounded-[24px] bg-accent-soft/35 p-4">
        <p className="text-sm font-semibold text-foreground">Siteye dön</p>
        <Link
          href="/tr"
          className="mt-3 inline-flex rounded-full bg-accent-strong px-4 py-2 text-sm font-semibold text-white"
        >
          Türkçe siteyi aç
        </Link>
      </div>
    </aside>
  );
}
