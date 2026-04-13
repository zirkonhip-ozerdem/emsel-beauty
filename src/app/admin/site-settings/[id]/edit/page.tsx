import { notFound } from "next/navigation";

import { AdminResourceEditPage } from "@/components/admin/admin-resource-pages";
import { parseAdminId } from "@/lib/admin/server";

type AdminSiteSettingsEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminSiteSettingsEditPage({
  params,
}: AdminSiteSettingsEditPageProps) {
  const { id: rawId } = await params;
  const id = parseAdminId(rawId);

  if (!id) {
    notFound();
  }

  return <AdminResourceEditPage resourceKey="site-settings" id={id} />;
}
