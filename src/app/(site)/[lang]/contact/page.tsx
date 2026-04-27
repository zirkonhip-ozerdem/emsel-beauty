// src/app/(site)/[lang]/contact/page.tsx
// Kurulum: Bu dosyayı src/app/(site)/[lang]/contact/page.tsx olarak kaydedin.
// Yan dosya: contact.css dosyasını aynı klasöre (contact/ altına) yerleştirin.

import type { Metadata } from "next";
import { getPageMetadata } from "@/i18n/metadata";
import { resolveLocale, type LangRouteParams } from "@/i18n/server";
import { getContactPageContent } from "@/lib/site/contact-page";
import ContactClient from "./ContactClient";

// ─── SEO metadata (server tarafında üretilir) ────────────────────────────────
type ContactPageProps = {
  params: LangRouteParams;
};

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return getPageMetadata(locale, "contact");
}

export default async function ContactPage({ params }: ContactPageProps) {
  const locale = await resolveLocale(params);
  const content = getContactPageContent(locale);

  return <ContactClient content={content} />;
}
