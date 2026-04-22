"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menu = [
  { label: "Dashboard", href: "/admin", icon: "D" },
  { label: "Kampanyalar", href: "/admin/campaigns", icon: "K" },
  { label: "Ürünler", href: "/admin/products", icon: "U" },
  { label: "Hizmetler", href: "/admin/services", icon: "H" },
  { label: "Blog Yazıları", href: "/admin/blog-posts", icon: "B" },
  { label: "Hikayemiz", href: "/admin/who", icon: "I" },
  { label: "Randevu Talepleri", href: "/admin/contact-appointments", icon: "R" },
  { label: "Kullanıcılar", href: "/admin/users", icon: "M" },
  { label: "Site Ayarları", href: "/admin/site-settings", icon: "S" },
  { label: "Siteyi Gör", href: "/tr", icon: "W", target: "_blank" },
  { label: "Profil", href: "/admin/profile", icon: "P" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex h-16 items-center justify-between border-b bg-white px-4 md:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-md border px-3 py-2 text-sm font-semibold text-gray-700"
        >
          Menü
        </button>
        <span className="font-semibold text-[#8a6e36]">Emsel Admin</span>
      </div>

      {open ? (
        <button
          type="button"
          aria-label="Menüyü kapat"
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r bg-white transition-transform duration-300 md:static md:z-auto md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b px-6">
          <span className="font-bold tracking-wide text-[#8a6e36]">Emsel Admin</span>
          <button
            type="button"
            className="text-sm font-semibold text-gray-600 md:hidden"
            onClick={() => setOpen(false)}
          >
            Kapat
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {menu.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                target={item.target}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition ${
                  active
                    ? "bg-[#c5a059]/15 text-[#8a6e36]"
                    : "text-gray-700 hover:bg-[#c5a059]/10 hover:text-[#8a6e36]"
                }`}
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#f2d688]/45 text-xs font-bold text-[#8a6e36]">
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t p-4">
          <button
            type="button"
            onClick={async () => {
              await fetch("/api/admin/logout", { method: "POST" });
              window.location.href = "/admin-login";
            }}
            className="w-full rounded-lg px-4 py-2.5 text-left text-sm text-gray-600 hover:bg-red-50 hover:text-red-600"
          >
            Çıkış yap
          </button>
        </div>
      </aside>
    </>
  );
}
