import { notFound, redirect } from "next/navigation";
import { parseAdminId } from "@/lib/admin/server";

type AdminCampaignPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminCampaignPage({
  params,
}: AdminCampaignPageProps) {
  const { id: rawId } = await params;
  const id = parseAdminId(rawId);

  if (!id) {
    notFound();
  }

  redirect(`/admin/campaigns/${id}/edit`);
}
