import { unstable_cache } from "next/cache";

import type { Locale } from "@/i18n/config";
import { hasDatabaseConfig, prisma } from "@/lib/prisma";
import { normalizeTurkishText } from "@/lib/site/turkish-text";

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
  showOnHomepage: boolean;
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
          showOnHomepage: true,
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

export type HomepageProduct = {
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
  showOnHomepage: boolean;
  sortOrder: number;
};

export const getHomepageProducts = unstable_cache(
  async (): Promise<HomepageProduct[]> => {
    if (!hasDatabaseConfig()) {
      return [];
    }

    try {
      const products = await prisma.product.findMany({
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
          showOnHomepage: true,
          sortOrder: true,
        },
        orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
      });

      const homepageProducts = products.filter((item) => item.showOnHomepage);
      return (homepageProducts.length > 0 ? homepageProducts : products).slice(0, 3);
    } catch (error) {
      console.error("HOMEPAGE PRODUCTS CACHE ERROR:", error);
      return [];
    }
  },
  ["homepage-products"],
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
    name: normalizeTurkishText(product.nameTr),
    slug: product.slugTr,
    shortDescription: normalizeTurkishText(product.shortDescriptionTr),
    description: normalizeTurkishText(product.descriptionTr),
    imageAlt: normalizeTurkishText(product.imageAltTr),
    galleries: product.galleries.map((gallery) => ({
      ...gallery,
      imageAlt: normalizeTurkishText(gallery.imageAltTr),
    })),
  };
}

export function getLocalizedHomepageProductValue(
  locale: Locale,
  product: HomepageProduct,
) {
  if (locale === "en") {
    return {
      name: product.nameEn,
      slug: product.slugEn,
      shortDescription: product.shortDescriptionEn,
      description: product.descriptionEn,
      imageAlt: product.imageAltEn,
    };
  }

  if (locale === "de") {
    return {
      name: product.nameDe,
      slug: product.slugDe,
      shortDescription: product.shortDescriptionDe,
      description: product.descriptionDe,
      imageAlt: product.imageAltDe,
    };
  }

  return {
    name: normalizeTurkishText(product.nameTr),
    slug: product.slugTr,
    shortDescription: normalizeTurkishText(product.shortDescriptionTr),
    description: normalizeTurkishText(product.descriptionTr),
    imageAlt: normalizeTurkishText(product.imageAltTr),
  };
}

export function stripHtmlTags(value: string | null | undefined) {
  if (!value) {
    return "";
  }

  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
