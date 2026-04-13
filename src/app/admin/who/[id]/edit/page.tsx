import { notFound } from "next/navigation";

import { AdminResourceEditPage } from "@/components/admin/admin-resource-pages";
import { parseAdminId } from "@/lib/admin/server";

type AdminWhoEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminWhoEditPage({
  params,
}: AdminWhoEditPageProps) {
  const { id: rawId } = await params;
  const id = parseAdminId(rawId);

  if (!id) {
    notFound();
  }

  return <AdminResourceEditPage resourceKey="who" id={id} />;
}
