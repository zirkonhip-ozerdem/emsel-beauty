import { unstable_cache } from "next/cache";

import type { Locale } from "@/i18n/config";
import { hasDatabaseConfig, prisma } from "@/lib/prisma";

export type PublishedProduct = {
  id: number;
  nameTr: string;
  nameEn: string;
  nameDe: string;
  slugTr: string;
  slugEn: string;
  slugDe: string;
  shortDescriptionTr: string | null;
  shortDescriptionEn: string | null;
  shortDescriptionDe: string | null;
  descriptionTr: string;
  descriptionEn: string;
  descriptionDe: string;
  imageUrl: string | null;
  imageAltTr: string | null;
  imageAltEn: string | null;
  imageAltDe: string | null;
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

export const getPublishedProducts = unstable_cache(
  async (): Promise<PublishedProduct[]> => {
    if (!hasDatabaseConfig()) {
      return [];
    }

    try {
      return await prisma.product.findMany({
        where: {
          isActive: true,
        },
        select: {
          id: true,
          nameTr: true,
          nameEn: true,
          nameDe: true,
          slugTr: true,
          slugEn: true,
          slugDe: true,
          shortDescriptionTr: true,
          shortDescriptionEn: true,
          shortDescriptionDe: true,
          descriptionTr: true,
          descriptionEn: true,
          descriptionDe: true,
          imageUrl: true,
          imageAltTr: true,
          imageAltEn: true,
          imageAltDe: true,
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
        orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
      });
    } catch (error) {
      console.error("PUBLISHED PRODUCTS CACHE ERROR:", error);
      return [];
    }
  },
  ["published-products"],
  {
    revalidate: 3600,
    tags: ["products"],
  },
);

export function getLocalizedProductValue(
  locale: Locale,
  product: PublishedProduct,
) {
  if (locale === "en") {
    return {
      name: product.nameEn,
      slug: product.slugEn,
      shortDescription: product.shortDescriptionEn,
      description: product.descriptionEn,
      imageAlt: product.imageAltEn,
      galleries: product.galleries.map((gallery) => ({
        ...gallery,
        imageAlt: gallery.imageAltEn,
      })),
    };
  }

  if (locale === "de") {
    return {
      name: product.nameDe,
      slug: product.slugDe,
      shortDescription: product.shortDescriptionDe,
      description: product.descriptionDe,
      imageAlt: product.imageAltDe,
      galleries: product.galleries.map((gallery) => ({
        ...gallery,
        imageAlt: gallery.imageAltDe,
      })),
    };
  }

  return {
    name: product.nameTr,
    slug: product.slugTr,
    shortDescription: product.shortDescriptionTr,
    description: product.descriptionTr,
    imageAlt: product.imageAltTr,
    galleries: product.galleries.map((gallery) => ({
      ...gallery,
      imageAlt: gallery.imageAltTr,
    })),
  };
}

export function stripHtmlTags(value: string | null | undefined) {
  if (!value) {
    return "";
  }

  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
