import { redirect } from "next/navigation";

import { getLocalizedPath } from "@/i18n/config";
import { resolveLocale, type LangRouteParams } from "@/i18n/server";

type ProductDetailPageProps = {
  params: LangRouteParams;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const locale = await resolveLocale(params);
  redirect(getLocalizedPath(locale, "products"));
}
