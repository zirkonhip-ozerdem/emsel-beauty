import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import type { Locale } from "@/i18n/config";
import { siteLocales } from "@/i18n/config";
import { getLocalizedBlogPostValue, getPublishedBlogPosts } from "@/lib/site/blogs";
import "../pageDetail/blog-detail.css";

type Props = { params: Promise<{ lang: string; slug: string }> };

type DetailPost = {
  id: number;
  title: string;
  slug: string;
  description: string;
  body: string | null;
  imageUrl: string;
  imageAlt: string | null;
  publishedAt: Date | null;
};

async function getLocalePosts(locale: Locale): Promise<DetailPost[]> {
  const posts = await getPublishedBlogPosts();

  return posts.map((post) => {
    const localized = getLocalizedBlogPostValue(locale, post);

    return {
      id: post.id,
      title: localized.title,
      slug: localized.slug,
      description: localized.description,
      body: localized.body,
      imageUrl: post.imageUrl,
      imageAlt: localized.imageAlt,
      publishedAt: post.publishedAt,
    };
  });
}

async function getPostBySlug(locale: Locale, slug: string): Promise<DetailPost | null> {
  const posts = await getPublishedBlogPosts();
  const exact = posts.find(
    (post) => post.seoUrlTr === slug || post.seoUrlEn === slug || post.seoUrlDe === slug,
  );

  if (!exact) {
    return null;
  }

  const localized = getLocalizedBlogPostValue(locale, exact);

  return {
    id: exact.id,
    title: localized.title,
    slug: localized.slug,
    description: localized.description,
    body: localized.body,
    imageUrl: exact.imageUrl,
    imageAlt: localized.imageAlt,
    publishedAt: exact.publishedAt,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!siteLocales.includes(lang as Locale)) return { title: "Blog | Emsel Beauty" };

  const posts = await getLocalePosts(lang as Locale);
  const post = posts.find((item) => item.slug === slug) || (await getPostBySlug(lang as Locale, slug));

  if (!post) {
    return { title: "Blog | Emsel Beauty" };
  }

  return {
    title: `${post.title} | Emsel Beauty`,
    description: post.description,
  };
}

export const dynamic = "force-dynamic";

export default async function BlogDetailPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!siteLocales.includes(lang as Locale)) {
    notFound();
  }

  const locale = lang as Locale;
  const posts = await getLocalePosts(locale);
  const post =
    posts.find((item) => item.slug === slug) ||
    (await getPostBySlug(locale, slug));

  if (!post) {
    notFound();
  }

  const postParagraphs = post.body
    ? post.body
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
    : [post.description];

  return (
    <div className="bd-page">
      <section className="bd-hero">
        <Image
          src={post.imageUrl}
          alt={post.imageAlt || post.title}
          fill
          priority
          sizes="100vw"
          className="bd-hero-img"
        />
        <div className="bd-hero-overlay" />
        <div className="bd-hero-content">
          <h1 className="font-display bd-hero-title">{post.title}</h1>
          <time className="bd-hero-date">
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString(
                  locale === "de" ? "de-DE" : locale === "en" ? "en-GB" : "tr-TR",
                )
              : "-"}
          </time>
        </div>
      </section>

      <div className="bd-layout">
        <article className="bd-content-card">
          <nav className="bd-nav-bar">
            <Link href={`/${locale}/blog`} className="bd-back-btn">
              Blog&apos;a Don
            </Link>
          </nav>
          <div className="bd-divider" />
          <div className="bd-article-body">
            {postParagraphs.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
