//BLOG PAGE.TSX
import type { Metadata } from "next";
import Image from "next/image";

import type { SiteDictionary } from "@/i18n/dictionaries";
import { getDictionary } from "@/i18n/dictionaries";
import { getPageMetadata } from "@/i18n/metadata";
import { resolveLocale, type LangRouteParams } from "@/i18n/server";
import "./blog.css";

const INITIAL_VISIBLE = 10;

const CARD_BACKGROUNDS = [
  "linear-gradient(160deg, #faf6f0 0%, #f2ebe0 55%, #ebe4d6 100%)",
  "linear-gradient(160deg, #eef2e8 0%, #e4ecca 55%, #d8e6bc 100%)",
  "linear-gradient(160deg, #f5f0e8 0%, #ede6d8 55%, #e6dcc8 100%)",
  "linear-gradient(160deg, #e8ede0 0%, #dce8c8 55%, #d0e0b4 100%)",
] as const;

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

const LABELS: Record<string, { readMore: string; continueReading: string; subtitle: string }> = {
  tr: {
    readMore: "Devamını Oku",
    continueReading: "Daha Fazla Göster",
    subtitle: "Bakım, estetik ve marka dünyasından seçkiler",
  },
  en: {
    readMore: "Read More",
    continueReading: "Load More",
    subtitle: "Curated stories on beauty, care and brand culture",
  },
  ar: {
    readMore: "اقرأ المزيد",
    continueReading: "عرض المزيد",
    subtitle: "مختارات من عالم الجمال والعناية والعلامة",
  },
};

type BlogPost = SiteDictionary["blogPage"]["posts"][number];
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

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return getPageMetadata(locale, "blog");
}

export default async function BlogPage({ params }: BlogPageProps) {
  const locale      = await resolveLocale(params);
  const dictionary  = getDictionary(locale);
  const headingFont = locale === "ar" ? "font-arabic" : "font-display";
  const labels      = LABELS[locale] ?? LABELS.tr;

  const allPosts   = dictionary.blogPage.posts;
  const firstBatch = allPosts.slice(0, INITIAL_VISIBLE);
  const hasMore    = allPosts.length > INITIAL_VISIBLE;

  return (
    <div className="blog-page">
      <header className="page-header">
        <div className="blog-divider" />

          <h1 className="page-title">  Blog, markanın sadece anlattığı değil <br />
  yön verdiği bir alana dönüşüyor.</h1>

        <p className="page-sub">
          {labels.subtitle}
        </p>

        <div className="blog-divider" />
      </header>

      <div className="blog-container">

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

      </div>
    </div>
  );
}