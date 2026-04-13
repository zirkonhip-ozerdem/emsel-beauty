import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminLogoutButton } from "@/components/admin/admin-logout-button";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { getAdminDashboardCounts } from "@/lib/admin/crud";
import { requireAdminAccess } from "@/lib/auth/admin-auth";
import { withOptionalDatabase } from "@/lib/admin/server";

export const metadata: Metadata = {
  title: "Admin Paneli",
  description: "Emsel Beauty yonetim paneli.",
};

export const dynamic = "force-dynamic";

const emptyCounts = {
  campaigns: 0,
  users: 0,
  who: 0,
  "site-settings": 0,
  products: 0,
  services: 0,
  "blog-posts": 0,
  "contact-appointments": 0,
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  await requireAdminAccess();

  const counts = await withOptionalDatabase(emptyCounts, () =>
    getAdminDashboardCounts(),
  );

  return (
    <div className="min-h-screen bg-[#f6efe7]">
      <div className="mx-auto grid max-w-[1480px] gap-6 px-4 py-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:px-8">
        <AdminSidebar counts={counts} />
        <main className="min-w-0 space-y-4">
          <div className="flex justify-end">
            <AdminLogoutButton />
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
