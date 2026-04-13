import { notFound } from "next/navigation";

import { AdminResourceEditPage } from "@/components/admin/admin-resource-pages";
import { parseAdminId } from "@/lib/admin/server";

type AdminProductsEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminProductsEditPage({
  params,
}: AdminProductsEditPageProps) {
  const { id: rawId } = await params;
  const id = parseAdminId(rawId);

  if (!id) {
    notFound();
  }

  return <AdminResourceEditPage resourceKey="products" id={id} />;
}
