import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import Sidebar from "@/components/admin/Sidebar";
import { requireAdminAccess } from "@/lib/auth/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  try {
    await requireAdminAccess();
  } catch {
    redirect("/admin-login");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <main className="min-w-0 p-4 md:ml-64 md:p-6">{children}</main>
    </div>
  );
}
