import { unstable_cache } from "next/cache";

import type { Locale } from "@/i18n/config";
import { hasDatabaseConfig, prisma } from "@/lib/prisma";
import { normalizeTurkishText } from "@/lib/site/turkish-text";

export type PublishedBlogPost = {
  id: number;
  titleTr: string;
  titleEn: string;
  titleDe: string;
  seoUrlTr: string;
  seoUrlEn: string;
  seoUrlDe: string;
  metaTr: string | null;
  metaEn: string | null;
  metaDe: string | null;
  descriptionTr: string;
  descriptionEn: string;
  descriptionDe: string;
  bodyTr: string | null;
  bodyEn: string | null;
  bodyDe: string | null;
  imageUrl: string;
  imageAltTr: string | null;
  imageAltEn: string | null;
  imageAltDe: string | null;
  readTimeMin: number;
  publishedAt: Date | null;
  sortOrder: number;
  galleries: {
    id: number;
    imageUrl: string;
    imageAltTr: string | null;
    imageAltEn: string | null;
    imageAltDe: string | null;
    sortOrder: number;
  }[];
};

export const getPublishedBlogPosts = unstable_cache(
  async (): Promise<PublishedBlogPost[]> => {
    if (!hasDatabaseConfig()) {
      return [];
    }

    try {
      return await prisma.blogPost.findMany({
        where: {
          status: true,
        },
        select: {
          id: true,
          titleTr: true,
          titleEn: true,
          titleDe: true,
          seoUrlTr: true,
          seoUrlEn: true,
          seoUrlDe: true,
          metaTr: true,
          metaEn: true,
          metaDe: true,
          descriptionTr: true,
          descriptionEn: true,
          descriptionDe: true,
          bodyTr: true,
          bodyEn: true,
          bodyDe: true,
          imageUrl: true,
          imageAltTr: true,
          imageAltEn: true,
          imageAltDe: true,
          readTimeMin: true,
          publishedAt: true,
          sortOrder: true,
          galleries: {
            select: {
              id: true,
              imageUrl: true,
              imageAltTr: true,
              imageAltEn: true,
              imageAltDe: true,
              sortOrder: true,
            },
            orderBy: {
              sortOrder: "asc",
            },
          },
        },
        orderBy: [{ sortOrder: "asc" }, { publishedAt: "desc" }, { updatedAt: "desc" }],
      });
    } catch (error) {
      console.error("PUBLISHED BLOG POSTS CACHE ERROR:", error);
      return [];
    }
  },
  ["published-blog-posts"],
  {
    revalidate: 3600,
    tags: ["blog-posts"],
  },
);

export function getLocalizedBlogPostValue(locale: Locale, blogPost: PublishedBlogPost) {
  if (locale === "en") {
    return {
      title: blogPost.titleEn,
      slug: blogPost.seoUrlEn,
      meta: blogPost.metaEn,
      description: blogPost.descriptionEn,
      body: blogPost.bodyEn,
      imageAlt: blogPost.imageAltEn,
      galleries: blogPost.galleries.map((gallery) => ({
        ...gallery,
        imageAlt: gallery.imageAltEn,
      })),
    };
  }

  if (locale === "de") {
    return {
      title: blogPost.titleDe,
      slug: blogPost.seoUrlDe,
      meta: blogPost.metaDe,
      description: blogPost.descriptionDe,
      body: blogPost.bodyDe,
      imageAlt: blogPost.imageAltDe,
      galleries: blogPost.galleries.map((gallery) => ({
        ...gallery,
        imageAlt: gallery.imageAltDe,
      })),
    };
  }

  return {
    title: normalizeTurkishText(blogPost.titleTr),
    slug: blogPost.seoUrlTr,
    meta: normalizeTurkishText(blogPost.metaTr),
    description: normalizeTurkishText(blogPost.descriptionTr),
    body: normalizeTurkishText(blogPost.bodyTr),
    imageAlt: normalizeTurkishText(blogPost.imageAltTr),
    galleries: blogPost.galleries.map((gallery) => ({
      ...gallery,
      imageAlt: normalizeTurkishText(gallery.imageAltTr),
    })),
  };
}

export function stripBlogHtmlTags(value: string | null | undefined) {
  if (!value) {
    return "";
  }

  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
