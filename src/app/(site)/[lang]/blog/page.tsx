// src/app/(site)/[lang]/blog/page.tsx
// Server component — pagination URL-based (SEO uyumlu), "Daha Fazla" client-side

import type { Metadata } from "next";

import type { Locale } from "@/i18n/config";
import type { SiteDictionary } from "@/i18n/dictionaries";
import { getDictionary } from "@/i18n/dictionaries";
import { getPageMetadata } from "@/i18n/metadata";
import { resolveLocale, type LangRouteParams } from "@/i18n/server";
import "./blog.css";
import { slugify } from "@/lib/slugify";
import { BlogClientWrapper } from "./BlogClientWrapper"; // ← yeni client bileşeni

const PER_PAGE = 10;

const BLOG_IMAGES = [
  "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80",
] as const;

const LABELS: Record<
  Locale,
  {
    readMore: string;
    continueReading: string;
    subtitle: string;
    prev: string;
    next: string;
    page: string;
  }
> = {
  tr: {
    readMore: "Devamını Oku",
    continueReading: "Daha Fazla Göster",
    subtitle: "Bakım, estetik ve marka dünyasından seçkiler",
    prev: "Önceki",
    next: "Sonraki",
    page: "Sayfa",
  },
  en: {
    readMore: "Read More",
    continueReading: "Load More",
    subtitle: "Curated stories on beauty, care and brand culture",
    prev: "Previous",
    next: "Next",
    page: "Page",
  },
  de: {
    readMore: "Mehr Lesen",
    continueReading: "Mehr Anzeigen",
    subtitle: "Ausgewahlte Inhalte aus Beauty, Care und Markenwelt",
    prev: "Zuruck",
    next: "Weiter",
    page: "Seite",
  },
};

type BlogPost = SiteDictionary["blogPage"]["posts"][number];
type BlogPageProps = {
  params: LangRouteParams;
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

export default async function BlogPage({ params }: BlogPageProps) {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);
  const headingFont = "font-display";
  const labels = LABELS[locale];

  const allPosts = dictionary.blogPage.posts;

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
          Blog, markanın sadece anlattığı değil <br />
          yön verdiği bir alana dönüşüyor.
        </h1>
        <p className="page-sub">{labels.subtitle}</p>
        <div className="blog-divider" />
      </header>

      <div className="blog-container">
        {/* Client bileşeni: "Daha Fazla" + pagination + kart render */}
        <BlogClientWrapper
          allPosts={allSerialized}
          initialPage={1}
          perPage={PER_PAGE}
          locale={locale}
          headingFont={headingFont}
          labels={labels}
          basePath={`/${locale}/blog`}
        />
      </div>
    </div>
  );
}
