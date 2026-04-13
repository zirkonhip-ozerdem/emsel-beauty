import { notFound } from "next/navigation";

import { AdminResourceEditPage } from "@/components/admin/admin-resource-pages";
import { parseAdminId } from "@/lib/admin/server";

type AdminBlogPostsEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminBlogPostsEditPage({
  params,
}: AdminBlogPostsEditPageProps) {
  const { id: rawId } = await params;
  const id = parseAdminId(rawId);

  if (!id) {
    notFound();
  }

  return <AdminResourceEditPage resourceKey="blog-posts" id={id} />;
}
