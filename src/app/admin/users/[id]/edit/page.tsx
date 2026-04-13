import { notFound } from "next/navigation";

import { AdminResourceEditPage } from "@/components/admin/admin-resource-pages";
import { parseAdminId } from "@/lib/admin/server";

type AdminUsersEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminUsersEditPage({
  params,
}: AdminUsersEditPageProps) {
  const { id: rawId } = await params;
  const id = parseAdminId(rawId);

  if (!id) {
    notFound();
  }

  return <AdminResourceEditPage resourceKey="users" id={id} />;
}
