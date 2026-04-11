import type { ReactNode } from "react";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ id: "preview" }];
}

export default function AdminCampaignIdLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
