/**
 * src/app/(site)/[lang]/blog/[slug]/page.tsx  — v2
 * Sidebar: Diğer Yazılar + Paylaş + Okuma Süresi
 */

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import type { Locale } from "@/i18n/config";
import { siteLocales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { slugify } from "@/lib/slugify";
import "./blog-detail.css";

import fs from "fs";
import path from "path";

function getGalleryImages() {
  const dir = path.join(process.cwd(), "public/images");
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir);
  return files
    .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .map((file) => `/images/${file}`);
}

const galleryImages = getGalleryImages();

const BLOG_IMAGES = [
  "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1400&q=85",
] as const;

const UI: Record<Locale, {
  back: string; blog: string; related: string; publishedOn: string; readMore: string;
  readTime: string; share: string; sidebarPosts: string;
}> = {
  tr: {
    back: "Blog'a Dön", blog: "Blog", related: "Diğer Yazılar",
    publishedOn: "Yayın Tarihi", readMore: "Devamını Oku",
    readTime: "dk okuma", share: "Paylaş", sidebarPosts: "Diğer Yazılar",
  },
  en: {
    back: "Back to Blog", blog: "Blog", related: "Related Posts",
    publishedOn: "Published On", readMore: "Read More",
    readTime: "min read", share: "Share", sidebarPosts: "Other Posts",
  },
  ar: {
    back: "العودة إلى المدونة", blog: "المدونة", related: "مقالات أخرى",
    publishedOn: "تاريخ النشر", readMore: "اقرأ المزيد",
    readTime: "دقيقة قراءة", share: "شارك", sidebarPosts: "مقالات أخرى",
  },
};

function fakeDate(index: number, locale: Locale): string {
  const d = new Date("2024-07-01");
  d.setDate(d.getDate() + index * 8);
  return d.toLocaleDateString(
    locale === "ar" ? "ar-SA" : locale === "en" ? "en-GB" : "tr-TR",
    { day: "numeric", month: "long", year: "numeric" }
  );
}

function buildContent(description: string): string[] {
  return [
    description,
    "Profesyonel bakım yaklaşımı, doğru ürün ve uzman desteğiyle birleştiğinde çok daha kalıcı sonuçlar ortaya çıkarmaktadır. Her bireyin ihtiyacı farklı olduğundan kişiye özel bir değerlendirme süreci her zaman en etkili başlangıç noktasıdır.",
    "Teknolojik gelişmeler hem güvenilirliği hem konforu artırmaktadır. Doğru teknikle uygulanan kaliteli ürünler beklenen sonuçlara ulaşmayı hızlandırır ve deneyimi daha keyifli kılar.",
    "Uzman ekibimiz sizi ilk görüşmeden itibaren karşılayarak en uygun programı birlikte belirler. Her seans özenle planlanır, bütüncül bir yaklaşımla uygulanır ve sonrasında takip edilir.",
  ];
}

/** Kelime sayısından okuma süresi (ort. 200 kelime/dk) */
function calcReadingTime(paragraphs: string[]): number {
  const words = paragraphs.join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

// ─── SVG İkonlar ────────────────────────────────────────────────────────────

function IconClock() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.01" fill="currentColor" strokeWidth="2" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconTwitterX() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Next.js 16: params = Promise<{ lang, slug }>
type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateStaticParams() {
  const out: { lang: string; slug: string }[] = [];
  for (const lang of siteLocales) {
    const dict = getDictionary(lang);
    for (const post of dict.blogPage.posts) {
      const slug = slugify(post.title);
      if (slug) out.push({ lang, slug });
    }
  }
  return out;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!siteLocales.includes(lang as Locale)) return { title: "Blog | Emsel Beauty" };
  const locale = lang as Locale;
  const dict   = getDictionary(locale);
  const post   = dict.blogPage.posts.find((p) => slugify(p.title) === slug);
  if (!post) return { title: "Blog | Emsel Beauty" };
  return {
    title:       `${post.title} | Emsel Beauty`,
    description: post.description,
    openGraph:   { title: post.title, description: post.description, type: "article" },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!siteLocales.includes(lang as Locale)) notFound();

  const locale      = lang as Locale;
  const dict        = getDictionary(locale);
  const headingFont = locale === "ar" ? "font-arabic" : "font-display";
  const ui          = UI[locale];

  const allPosts  = dict.blogPage.posts;
  const postIndex = allPosts.findIndex((p) => slugify(p.title) === slug);
  const post      = allPosts[postIndex];
  if (!post) notFound();

  const heroImage   = BLOG_IMAGES[postIndex % BLOG_IMAGES.length];
  const publishDate = fakeDate(postIndex, locale);
  const paragraphs  = buildContent(post.description);
  const readingTime = calcReadingTime(paragraphs);

  // Sidebar için: mevcut yazı hariç ilk 6 yazı
  const sidebarPosts = allPosts
    .map((p, i) => ({ post: p, originalIndex: i }))
    .filter(({ originalIndex }) => originalIndex !== postIndex)
    .slice(0, 6);

  // Relacionados: mevcut yazı hariç ilk 3 yazı
  const relatedPosts = allPosts
    .map((p, i) => ({ post: p, originalIndex: i }))
    .filter(({ originalIndex }) => originalIndex !== postIndex)
    .slice(0, 3);

  // Paylaşım URL'leri — canonical
  const postUrl = `https://emselbeauty.com/${locale}/blog/${slug}`;
  const encodedUrl   = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(post.title);

  const shareLinks = {
    instagram: `https://www.instagram.com/`, // Instagram paylaşım API'si yok; profile yönlendirir
    facebook:  `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter:   `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
  };

  return (
    <div className="bd-page">
        <div id="progressBar" className="bd-progress-bar" />

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="bd-hero">
        <Image src={heroImage} alt={post.title} fill priority sizes="100vw" className="bd-hero-img" />
        <div className="bd-hero-overlay" />
        <div className="bd-hero-content">
          {post.meta && <span className="bd-hero-eyebrow">{post.meta}</span>}
          <h1 className={`${headingFont} bd-hero-title`}>{post.title}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            <time className="bd-hero-date">{ui.publishedOn} · {publishDate}</time>
            <span className="bd-read-time">
              <IconClock />
              {readingTime} {ui.readTime}
            </span>
          </div>
        </div>
      </section>
  
      {/* ── 2 SÜTUN LAYOUT ──────────────────────────────────────────── */}
      <div className="bd-layout">

        {/* ── Sol: ana içerik ─────────────────────────────────────── */}
        <div>
          {/* Nav bar */}
          <nav className="bd-nav-bar">
            <Link href={`/${locale}/blog`} className="bd-back-btn">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M9.5 3L5 7.5L9.5 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {ui.back}
            </Link>
            <div className="bd-nav-right">
              <span className="bd-read-time dark">
                <IconClock />
                {readingTime} {ui.readTime}
              </span>
            </div>
          </nav>

          {/* Makale */}
          <article className="bd-content-card">
            <div className="bd-divider" />
            <div className="bd-article-body">
              {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </article>

        {/* ── GALERİ ────────────────────────────────────────── */}
<section className="bd-gallery-section">
  <h2 className={headingFont}>Galeri</h2>
  {galleryImages.length > 0 && (
    <div className="bd-gallery-slider">
      {galleryImages.map((src, i) => (
        <div key={i} className="bd-gallery-slide">
          <img src={src} alt={`Galeri Görseli ${i + 1}`} />
        </div>
      ))}
    </div>
  )}
</section>
          {/* Alt related */}
{/*           {relatedPosts.length > 0 && (
            <section>
              <div className="bd-related-header">
                <h2 className={`${headingFont} bd-related-title`}>{ui.related}</h2>
                <div className="bd-related-line" />
              </div>
              <div className="bd-related-grid">
                {relatedPosts.map(({ post: related, originalIndex }) => (
                  <Link key={originalIndex} href={`/${locale}/blog/${slugify(related.title)}`} className="bd-related-card">
                    <div className="bd-related-img-wrap">
                      <Image
                        src={BLOG_IMAGES[originalIndex % BLOG_IMAGES.length]}
                        alt={related.title}
                        fill
                        sizes="(max-width: 720px) 100vw, 33vw"
                        className="bd-related-img"
                      />
                    </div>
                    <div className="bd-related-body">
                      {related.meta && <p className="bd-related-meta">{related.meta}</p>}
                      <p className={`${headingFont} bd-related-name`}>{related.title}</p>
                      <span className="bd-related-arrow">{ui.readMore} →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )} */}
        </div>

        {/* ── Sağ: sidebar ────────────────────────────────────────── */}
        <aside className="bd-sidebar">

          {/* Diğer Yazılar */}
          {sidebarPosts.length > 0 && (
            <div className="bd-sidebar-card">
              <div className="bd-sidebar-heading">
                <span className="bd-sidebar-title">{ui.sidebarPosts}</span>
                <div className="bd-sidebar-line" />
              </div>
              <div className="bd-sidebar-posts">
                {sidebarPosts.map(({ post: sp, originalIndex }) => (
                  <Link
                    key={originalIndex}
                    href={`/${locale}/blog/${slugify(sp.title)}`}
                    className="bd-sidebar-post"
                  >
                    <div className="bd-sidebar-post-img-wrap">
                      <Image
                        src={BLOG_IMAGES[originalIndex % BLOG_IMAGES.length]}
                        alt={sp.title}
                        fill
                        sizes="64px"
                        className="bd-sidebar-post-img"
                      />
                    </div>
                    <div className="bd-sidebar-post-info">
                      {sp.meta && (
                        <span className="bd-sidebar-post-meta">{sp.meta}</span>
                      )}
                      <span className={`${headingFont} bd-sidebar-post-title`}>
                        {sp.title}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Paylaş */}
          <div className="bd-sidebar-card">
            <div className="bd-sidebar-heading">
              <span className="bd-sidebar-title">{ui.share}</span>
              <div className="bd-sidebar-line" />
            </div>
            <div className="bd-share-btns">
              <a
                href={shareLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="bd-share-btn instagram"
                aria-label="Instagram'da paylaş"
              >
                <IconInstagram />
                Instagram
              </a>
              <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="bd-share-btn facebook"
                aria-label="Facebook'ta paylaş"
              >
                <IconFacebook />
                Facebook
              </a>
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="bd-share-btn twitter"
                aria-label="X'te paylaş"
              >
                <IconTwitterX />
                X (Twitter)
              </a>
            </div>
          </div>

        </aside>
      </div>

    <script
      dangerouslySetInnerHTML={{
        __html: `
        window.addEventListener('scroll', function () {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;

        const bar = document.getElementById('progressBar');
        if (bar) {
          bar.style.width = progress + '%';
        }
      });
    `,
  }}
/>
    </div>
  );
}