import { unstable_cache } from "next/cache";

import type { Locale } from "@/i18n/config";
import { hasDatabaseConfig, prisma } from "@/lib/prisma";

export type PublishedService = {
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
  longDescriptionTr: string | null;
  longDescriptionEn: string | null;
  longDescriptionDe: string | null;
  badgeTr: string | null;
  badgeEn: string | null;
  badgeDe: string | null;
  sessionsLabelTr: string | null;
  sessionsLabelEn: string | null;
  sessionsLabelDe: string | null;
  durationMinutes: number | null;
  imageUrl: string | null;
  imageAltTr: string | null;
  imageAltEn: string | null;
  imageAltDe: string | null;
  showOnHomepage: boolean;
  sortOrder: number;
  galleries: Array<{
    id: number;
    imageUrl: string;
    imageAltTr: string | null;
    imageAltEn: string | null;
    imageAltDe: string | null;
    sortOrder: number;
  }>;
  features: Array<{
    id: number;
    labelTr: string;
    labelEn: string;
    labelDe: string;
    sortOrder: number;
  }>;
  processSteps: Array<{
    id: number;
    stepNumber: number;
    titleTr: string;
    titleEn: string;
    titleDe: string;
    descriptionTr: string;
    descriptionEn: string;
    descriptionDe: string;
    sortOrder: number;
  }>;
  faqs: Array<{
    id: number;
    questionTr: string;
    questionEn: string;
    questionDe: string;
    answerTr: string;
    answerEn: string;
    answerDe: string;
    sortOrder: number;
  }>;
};

export type PublishedServiceShellLink = {
  id: number;
  nameTr: string;
  nameEn: string;
  nameDe: string;
  imageUrl?: string | null;
  showOnHomepage?: boolean;
  sortOrder: number;
};

export const getPublishedServices = unstable_cache(
  async (): Promise<PublishedService[]> => {
    if (!hasDatabaseConfig()) {
      return [];
    }

    try {
      return await prisma.service.findMany({
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
          longDescriptionTr: true,
          longDescriptionEn: true,
          longDescriptionDe: true,
          badgeTr: true,
          badgeEn: true,
          badgeDe: true,
          sessionsLabelTr: true,
          sessionsLabelEn: true,
          sessionsLabelDe: true,
          durationMinutes: true,
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
          features: {
            select: {
              id: true,
              labelTr: true,
              labelEn: true,
              labelDe: true,
              sortOrder: true,
            },
            orderBy: {
              sortOrder: "asc",
            },
          },
          processSteps: {
            select: {
              id: true,
              stepNumber: true,
              titleTr: true,
              titleEn: true,
              titleDe: true,
              descriptionTr: true,
              descriptionEn: true,
              descriptionDe: true,
              sortOrder: true,
            },
            orderBy: [{ sortOrder: "asc" }, { stepNumber: "asc" }],
          },
          faqs: {
            select: {
              id: true,
              questionTr: true,
              questionEn: true,
              questionDe: true,
              answerTr: true,
              answerEn: true,
              answerDe: true,
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
      console.error("PUBLISHED SERVICES CACHE ERROR:", error);
      return [];
    }
  },
  ["published-services"],
  {
    revalidate: 3600,
    tags: ["services"],
  },
);

export const getPublishedServiceShellLinks = unstable_cache(
  async (): Promise<PublishedServiceShellLink[]> => {
    if (!hasDatabaseConfig()) {
      return [];
    }

    try {
      return await prisma.service.findMany({
        where: {
          isActive: true,
        },
        select: {
          id: true,
          nameTr: true,
          nameEn: true,
          nameDe: true,
          imageUrl: true,
          showOnHomepage: true,
          sortOrder: true,
        },
        orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
        take: 5,
      });
    } catch (error) {
      console.error("PUBLISHED SERVICE SHELL LINKS CACHE ERROR:", error);
      return [];
    }
  },
  ["published-service-shell-links"],
  {
    revalidate: 3600,
    tags: ["services"],
  },
);

export const getHomepageServices = unstable_cache(
  async (): Promise<PublishedServiceShellLink[]> => {
    if (!hasDatabaseConfig()) {
      return [];
    }

    try {
      const services = await prisma.service.findMany({
        where: {
          isActive: true,
        },
        select: {
          id: true,
          nameTr: true,
          nameEn: true,
          nameDe: true,
          imageUrl: true,
          showOnHomepage: true,
          sortOrder: true,
        },
        orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
      });

      const homepageServices = services.filter((item) => item.showOnHomepage);
      return (homepageServices.length > 0 ? homepageServices : services).slice(0, 5);
    } catch (error) {
      console.error("HOMEPAGE SERVICES CACHE ERROR:", error);
      return [];
    }
  },
  ["homepage-services"],
  {
    revalidate: 3600,
    tags: ["services"],
  },
);

export function getLocalizedServiceValue(
  locale: Locale,
  service: PublishedService,
) {
  if (locale === "en") {
    return {
      name: service.nameEn,
      slug: service.slugEn,
      shortDescription: service.shortDescriptionEn,
      longDescription: service.longDescriptionEn,
      badge: service.badgeEn,
      sessionsLabel: service.sessionsLabelEn,
      imageAlt: service.imageAltEn,
      features: service.features.map((item) => item.labelEn),
      processSteps: service.processSteps.map((item) => ({
        id: item.id,
        stepNumber: item.stepNumber,
        title: item.titleEn,
        description: item.descriptionEn,
      })),
      faqs: service.faqs.map((item) => ({
        id: item.id,
        question: item.questionEn,
        answer: item.answerEn,
      })),
      galleries: service.galleries.map((item) => ({
        ...item,
        imageAlt: item.imageAltEn,
      })),
    };
  }

  if (locale === "de") {
    return {
      name: service.nameDe,
      slug: service.slugDe,
      shortDescription: service.shortDescriptionDe,
      longDescription: service.longDescriptionDe,
      badge: service.badgeDe,
      sessionsLabel: service.sessionsLabelDe,
      imageAlt: service.imageAltDe,
      features: service.features.map((item) => item.labelDe),
      processSteps: service.processSteps.map((item) => ({
        id: item.id,
        stepNumber: item.stepNumber,
        title: item.titleDe,
        description: item.descriptionDe,
      })),
      faqs: service.faqs.map((item) => ({
        id: item.id,
        question: item.questionDe,
        answer: item.answerDe,
      })),
      galleries: service.galleries.map((item) => ({
        ...item,
        imageAlt: item.imageAltDe,
      })),
    };
  }

  return {
    name: service.nameTr,
    slug: service.slugTr,
    shortDescription: service.shortDescriptionTr,
    longDescription: service.longDescriptionTr,
    badge: service.badgeTr,
    sessionsLabel: service.sessionsLabelTr,
    imageAlt: service.imageAltTr,
    features: service.features.map((item) => item.labelTr),
    processSteps: service.processSteps.map((item) => ({
      id: item.id,
      stepNumber: item.stepNumber,
      title: item.titleTr,
      description: item.descriptionTr,
    })),
    faqs: service.faqs.map((item) => ({
      id: item.id,
      question: item.questionTr,
      answer: item.answerTr,
    })),
    galleries: service.galleries.map((item) => ({
      ...item,
      imageAlt: item.imageAltTr,
    })),
  };
}

export function getLocalizedServiceShellLabel(
  locale: Locale,
  service: PublishedServiceShellLink,
) {
  if (locale === "en") {
    return service.nameEn;
  }

  if (locale === "de") {
    return service.nameDe;
  }

  return service.nameTr;
}

export function stripHtmlTags(value: string | null | undefined) {
  if (!value) {
    return "";
  }

  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
