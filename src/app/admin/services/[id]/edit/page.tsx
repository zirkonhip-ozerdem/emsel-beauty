import { notFound } from "next/navigation";

import { AdminResourceEditPage } from "@/components/admin/admin-resource-pages";
import { parseAdminId } from "@/lib/admin/server";

type AdminServicesEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminServicesEditPage({
  params,
}: AdminServicesEditPageProps) {
  const { id: rawId } = await params;
  const id = parseAdminId(rawId);

  if (!id) {
    notFound();
  }

  return <AdminResourceEditPage resourceKey="services" id={id} />;
}
