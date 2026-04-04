<<<<<<< HEAD
//BLOG PAGE.TSX
import type { Metadata } from "next";
import Image from "next/image";

=======
// src/app/(site)/[lang]/blog/page.tsx
// Server component — pagination URL-based (SEO uyumlu), "Daha Fazla" client-side

import type { Metadata } from "next";

import type { Locale } from "@/i18n/config";
>>>>>>> feat/son-islemler
import type { SiteDictionary } from "@/i18n/dictionaries";
import { getDictionary } from "@/i18n/dictionaries";
import { getPageMetadata } from "@/i18n/metadata";
import { resolveLocale, type LangRouteParams } from "@/i18n/server";
import "./blog.css";
<<<<<<< HEAD

const INITIAL_VISIBLE = 10;

const CARD_BACKGROUNDS = [
  "linear-gradient(160deg, #faf6f0 0%, #f2ebe0 55%, #ebe4d6 100%)",
  "linear-gradient(160deg, #eef2e8 0%, #e4ecca 55%, #d8e6bc 100%)",
  "linear-gradient(160deg, #f5f0e8 0%, #ede6d8 55%, #e6dcc8 100%)",
  "linear-gradient(160deg, #e8ede0 0%, #dce8c8 55%, #d0e0b4 100%)",
] as const;
=======
import { slugify } from "@/lib/slugify";
import { BlogClientWrapper } from "./BlogClientWrapper"; // ← yeni client bileşeni

const PER_PAGE = 10;
>>>>>>> feat/son-islemler

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

<<<<<<< HEAD
const LABELS: Record<string, { readMore: string; continueReading: string; subtitle: string }> = {
=======
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
>>>>>>> feat/son-islemler
  tr: {
    readMore: "Devamını Oku",
    continueReading: "Daha Fazla Göster",
    subtitle: "Bakım, estetik ve marka dünyasından seçkiler",
<<<<<<< HEAD
=======
    prev: "Önceki",
    next: "Sonraki",
    page: "Sayfa",
>>>>>>> feat/son-islemler
  },
  en: {
    readMore: "Read More",
    continueReading: "Load More",
    subtitle: "Curated stories on beauty, care and brand culture",
<<<<<<< HEAD
=======
    prev: "Previous",
    next: "Next",
    page: "Page",
>>>>>>> feat/son-islemler
  },
  de: {
    readMore: "Mehr Lesen",
    continueReading: "Mehr Anzeigen",
    subtitle: "Ausgewahlte Inhalte aus Beauty, Care und Markenwelt",
<<<<<<< HEAD
=======
    prev: "Zuruck",
    next: "Weiter",
    page: "Seite",
>>>>>>> feat/son-islemler
  },
};

type BlogPost = SiteDictionary["blogPage"]["posts"][number];
<<<<<<< HEAD
type BlogPageProps = { params: LangRouteParams };

function BlogCard({
  post,
  index,
  readMoreLabel,
  imageSrc,
  headingFont,
}: {
  post: BlogPost;
  index: number;
  readMoreLabel: string;
  imageSrc: string;
  headingFont: string;
}) {
  //const bg          = CARD_BACKGROUNDS[index % CARD_BACKGROUNDS.length];
const titleColor  = "#3b2a1a";
const descColor   = "#6b4c32";
const accentColor = "#c9a84c";
const btnColor    = "#8a6e36";

  return (
    <article className="blog-card" style={{ border: `1px solid ${accentColor}` }}>
      <div className="blog-card-inner" /*style={{/*background:bg *}}*/ >

        <div className="blog-card-img-wrap" style={{ borderRight: `1px solid ${accentColor}` }}>
          <Image
            src={imageSrc}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 168px, 200px"
            className="blog-card-img"
          />
        </div>

        <div className="blog-card-body">
          {"meta" in post && post.meta && (
            <span className="blog-card-meta" style={{ color: btnColor }}>
              {post.meta}
            </span>
          )}

          <h3 className={`${headingFont} blog-card-title`} style={{ color: titleColor }}>
            {post.title}
          </h3>

          <p className="blog-card-desc" style={{ color: descColor }}>
            {post.description}
          </p>

          {/* Hover için CSS kullanıyoruz — use client gerekmez */}
          <a
            href="#"
            className="blog-card-btn"
            style={{ borderColor: accentColor}}
          >
            {readMoreLabel}
          </a>
        </div>
      </div>
    </article>
  );
}
=======
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
>>>>>>> feat/son-islemler

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return getPageMetadata(locale, "blog");
}

export default async function BlogPage({ params }: BlogPageProps) {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);
  const headingFont = "font-display";
<<<<<<< HEAD
  const labels = LABELS[locale] ?? LABELS.tr;

  const allPosts = dictionary.blogPage.posts;
  const firstBatch = allPosts.slice(0, INITIAL_VISIBLE);
  const hasMore = allPosts.length > INITIAL_VISIBLE;
=======
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
>>>>>>> feat/son-islemler

  return (
    <div className="blog-page">
      <header className="page-header">
        <div className="blog-divider" />
<<<<<<< HEAD

        <h1 className="page-title">
          Blog, markanın sadece anlattığı değil
          <br />
          yön verdiği bir alana dönüşüyor.
        </h1>

        <p className="page-sub">{labels.subtitle}</p>

=======
        <h1 className="page-title">
          Blog, markanın sadece anlattığı değil <br />
          yön verdiği bir alana dönüşüyor.
        </h1>
        <p className="page-sub">{labels.subtitle}</p>
>>>>>>> feat/son-islemler
        <div className="blog-divider" />
      </header>

      <div className="blog-container">
<<<<<<< HEAD
        <section className="blog-grid">
          {firstBatch.map((post, i) => (
            <BlogCard
              key={`${i}-${post.title}`}
              post={post}
              index={i}
              readMoreLabel={labels.readMore}
              imageSrc={BLOG_IMAGES[i % BLOG_IMAGES.length]}
              headingFont={headingFont}
            />
          ))}
        </section>

        {hasMore && (
          <div className="blog-more-wrap">
            <a href="#" className={`${headingFont} blog-more-btn`}>
              {labels.continueReading}
            </a>
          </div>
        )}
=======
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
>>>>>>> feat/son-islemler
      </div>
    </div>
  );
}
