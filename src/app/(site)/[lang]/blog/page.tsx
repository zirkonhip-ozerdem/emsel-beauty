// src/app/(site)/[lang]/blog/page.tsx
// Server component — pagination URL-based (SEO uyumlu), "Daha Fazla" client-side

import type { Metadata } from "next";

import { getDictionary } from "@/i18n/dictionaries";
import { getPageMetadata } from "@/i18n/metadata";
import { resolveLocale, type LangRouteParams } from "@/i18n/server";
import { BLOG_IMAGES, getBlogPageUi } from "@/lib/site/blog-page";
import "./blog.css";
import { slugify } from "@/lib/slugify";
import { BlogClientWrapper } from "./BlogClientWrapper"; // ← yeni client bileşeni

const PER_PAGE = 10;

type BlogPageProps = {
  params: LangRouteParams;
  searchParams?: { page?: string };
};

// Tüm post verileri + görseller frontend'e aktarılıyor
export type SerializedPost = {
  title: string;
  description: string;
  meta?: string;
  slug: string;
  imageSrc: string;
  index: number;
};

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return getPageMetadata(locale, "blog");
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const locale      = await resolveLocale(params);
  const dictionary  = getDictionary(locale);
  const headingFont = "font-display";
  const ui          = getBlogPageUi(locale);

  const allPosts = dictionary.blogPage.posts;
  const totalPages = Math.ceil(allPosts.length / PER_PAGE);
  const currentPage = Math.max(1, Math.min(Number(searchParams?.page ?? 1), totalPages));

  // Tüm postları serialize et (client bileşeni kullanacak)
  const allSerialized: SerializedPost[] = allPosts.map((p, i) => ({
    title: p.title,
    description: p.description,
    meta: "meta" in p ? (p.meta as string | undefined) : undefined,
    slug: slugify(p.title),
    imageSrc: BLOG_IMAGES[i % BLOG_IMAGES.length],
    index: i,
  }));

  return (
    <div className="blog-page">
      <header className="page-header">
        <div className="blog-divider" />
        <h1 className="page-title">
          {ui.heroTitle[0]} <br />
          {ui.heroTitle[1]}
        </h1>
        <p className="page-sub">{ui.subtitle}</p>
        <div className="blog-divider" />
      </header>

      <div className="blog-container">
        {/* Client bileşeni: "Daha Fazla" + pagination + kart render */}
        <BlogClientWrapper
          key={`${locale}-${currentPage}`}
          allPosts={allSerialized}
          initialPage={currentPage}
          perPage={PER_PAGE}
          locale={locale}
          apiPath="/api/blogs"
          headingFont={headingFont}
          labels={ui.labels}
          basePath={`/${locale}/blog`}
        />
      </div>
    </div>
  );
}
