import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminLogoutButton } from "@/components/admin/admin-logout-button";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { requireAdminAccess } from "@/lib/auth/admin-auth";

export const metadata: Metadata = {
  title: "Admin Paneli",
  description: "Emsel Beauty yönetim paneli.",
};

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  await requireAdminAccess();

  return (
    <div className="min-h-screen bg-[#f6efe7] [font-family:var(--font-manrope),sans-serif]">
      <div className="mx-auto grid max-w-[1480px] gap-6 px-4 py-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:px-8">
        <AdminSidebar />
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
