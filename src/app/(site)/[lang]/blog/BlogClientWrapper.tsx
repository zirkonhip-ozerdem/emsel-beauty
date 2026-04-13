"use client";
// src/app/(site)/[lang]/blog/BlogClientWrapper.tsx

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { SerializedPost } from "./page";

type Labels = {
  readMore: string;
  continueReading: string;
  prev: string;
  next: string;
  page: string;
};

type Props = {
  allPosts: SerializedPost[];
  initialPage: number;
  perPage: number;
  locale: string;
  headingFont: string;
  labels: Labels;
  basePath: string;
};

const accentColor = "#c9a84c";
const titleColor  = "#3b2a1a";
const descColor   = "#6b4c32";
const btnColor    = "#8a6e36";

/** Tek kart */
function BlogCard({
  post,
  readMoreLabel,
  headingFont,
  locale,
  animate,
  delay,
}: {
  post: SerializedPost;
  readMoreLabel: string;
  headingFont: string;
  locale: string;
  animate?: boolean;
  delay?: number;
}) {
  const [visible, setVisible] = useState(!animate);

  useEffect(() => {
    if (!animate) return;
    const t = setTimeout(() => setVisible(true), delay ?? 0);
    return () => clearTimeout(t);
  }, [animate, delay]);

  return (
    <article
      className="blog-card"
      style={{
        border: `1px solid ${accentColor}`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: "opacity 0.35s ease, transform 0.35s ease, box-shadow 0.30s ease",
      }}
    >
      <div className="blog-card-inner">
        <div className="blog-card-img-wrap" style={{ borderRight: `1px solid ${accentColor}` }}>
          <Image
            src={post.imageSrc}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 168px, 200px"
            className="blog-card-img"
          />
        </div>

        <div className="blog-card-body">
          {post.meta && (
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

          <Link
            href={`/${locale}/blog/${post.slug}`}
            className="blog-card-btn"
            style={{ borderColor: accentColor }}
          >
            {readMoreLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}

/** Pagination numaraları */
function Pagination({
  currentPage,
  totalPages,
  basePath,
  labels,
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
  labels: Labels;
}) {
  if (totalPages <= 1) return null;

  const pageHref = (n: number) => `${basePath}?page=${n}`;

  // Gösterilecek sayfa numaraları: her zaman 1, son, ve aktif ±2
  const pages: (number | "…")[] = [];
  const add = (n: number) => {
    if (!pages.includes(n)) pages.push(n);
  };
  add(1);
  for (let i = Math.max(2, currentPage - 2); i <= Math.min(totalPages - 1, currentPage + 2); i++) add(i);
  add(totalPages);

  const withEllipsis: (number | "…")[] = [];
  pages.sort((a, b) => (a as number) - (b as number)).forEach((p, i) => {
    if (i > 0 && (p as number) - (withEllipsis[withEllipsis.length - 1] as number) > 1) {
      withEllipsis.push("…");
    }
    withEllipsis.push(p);
  });

  return (
    <nav className="blog-pagination" aria-label="Blog sayfaları">
      {/* Önceki */}
      {currentPage > 1 ? (
        <Link href={pageHref(currentPage - 1)} className="blog-pagination-btn" aria-label={labels.prev}>
          ‹ {labels.prev}
        </Link>
      ) : (
        <span className="blog-pagination-btn disabled">‹ {labels.prev}</span>
      )}

      <div className="blog-pagination-divider" />

      {/* Sayfa numaraları */}
      {withEllipsis.map((p, i) =>
        p === "…" ? (
          <span key={`ell-${i}`} className="blog-pagination-ellipsis">…</span>
        ) : (
          <Link
            key={p}
            href={pageHref(p as number)}
            className={`blog-pagination-btn${p === currentPage ? " active" : ""}`}
            aria-label={`${labels.page} ${p}`}
            aria-current={p === currentPage ? "page" : undefined}
          >
            {p}
          </Link>
        )
      )}

      <div className="blog-pagination-divider" />

      {/* Sonraki */}
      {currentPage < totalPages ? (
        <Link href={pageHref(currentPage + 1)} className="blog-pagination-btn" aria-label={labels.next}>
          {labels.next} ›
        </Link>
      ) : (
        <span className="blog-pagination-btn disabled">{labels.next} ›</span>
      )}
    </nav>
  );
}

/** Ana wrapper */
export function BlogClientWrapper({
  allPosts,
  initialPage,
  perPage,
  locale,
  headingFont,
  labels,
  basePath,
}: Props) {
  const router = useRouter();

  const totalPages = Math.ceil(allPosts.length / perPage);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [visibleCount, setVisibleCount] = useState(currentPage * perPage);
  const [loading, setLoading] = useState(false);
  const [newBatch, setNewBatch] = useState<number[]>([]); // yeni gelen index'ler animasyon için

  const displayedPosts = allPosts.slice(0, visibleCount);
  const hasMore = visibleCount < allPosts.length;

  function handleLoadMore() {
    setLoading(true);
    const prev = visibleCount;
    setTimeout(() => {
      const next = Math.min(visibleCount + perPage, allPosts.length);
      const freshIndexes = allPosts.slice(prev, next).map((_, i) => prev + i);
      setNewBatch(freshIndexes);
      setVisibleCount(next);
      // URL'yi gizlice güncelle (pagination'ı takip etmesi için)
      const nextPage = Math.ceil(next / perPage);
      setCurrentPage(nextPage);
      router.replace(`${basePath}?page=${nextPage}`, { scroll: false });
      setLoading(false);
      // Animasyon bitince temizle
      setTimeout(() => setNewBatch([]), 600);
    }, 420);
  }

  return (
    <div className="blog-controls-outer">
      <section className="blog-grid">
        {displayedPosts.map((post, i) => (
          <BlogCard
            key={`${post.slug}-${i}`}
            post={post}
            readMoreLabel={labels.readMore}
            headingFont={headingFont}
            locale={locale}
            animate={newBatch.includes(post.index)}
            delay={(newBatch.indexOf(post.index) % 2) * 80}
          />
        ))}
      </section>

      <div className="blog-controls-wrap">
        {/* Loading */}
        {loading && (
          <div className="blog-loading-wrap">
            <div className="blog-spinner" />
            <span className="blog-loading-text">Yükleniyor…</span>
          </div>
        )}

        {/* Daha Fazla Göster */}
        {!loading && hasMore && (
          <div className="blog-more-wrap">
            <button
              className={`${headingFont} blog-more-btn`}
              onClick={handleLoadMore}
              disabled={loading}
            >
              <span>{labels.continueReading}</span>
            </button>
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={basePath}
          labels={labels}
        />
      </div>
    </div>
  );
}
