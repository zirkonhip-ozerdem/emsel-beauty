import { prisma } from "@/lib/prisma";
import { filterValidGalleryItems } from "@/lib/admin/modules/shared/service-helpers";

import type { ServiceInput } from "./schema";

export const serviceAdminService = {
  count: () => prisma.service.count(),
  list: () =>
    prisma.service.findMany({
      select: {
        id: true,
        nameTr: true,
        nameEn: true,
        slugTr: true,
        durationMinutes: true,
        imageUrl: true,
        isActive: true,
        updatedAt: true,
      },
      orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
    }),
  get: (id: number) =>
    prisma.service.findUnique({
      where: { id },
      include: {
        galleries: { orderBy: { sortOrder: "asc" } },
        features: { orderBy: { sortOrder: "asc" } },
        processSteps: { orderBy: { sortOrder: "asc" } },
        faqs: { orderBy: { sortOrder: "asc" } },
      },
    }),
  create: (data: ServiceInput) =>
    prisma.service.create({
      data: {
        ...data,
        galleries: data.galleries.length
          ? { create: filterValidGalleryItems(data.galleries) }
          : undefined,
        features: data.features.length ? { create: data.features } : undefined,
        processSteps: data.processSteps.length
          ? { create: data.processSteps }
          : undefined,
        faqs: data.faqs.length ? { create: data.faqs } : undefined,
      },
      include: {
        galleries: true,
        features: true,
        processSteps: true,
        faqs: true,
      },
    }),
  update: (id: number, data: ServiceInput) =>
    prisma.service.update({
      where: { id },
      data: {
        ...data,
        galleries: {
          deleteMany: {},
          ...(data.galleries.length
            ? { create: filterValidGalleryItems(data.galleries) }
            : {}),
        },
        features: {
          deleteMany: {},
          ...(data.features.length ? { create: data.features } : {}),
        },
        processSteps: {
          deleteMany: {},
          ...(data.processSteps.length ? { create: data.processSteps } : {}),
        },
        faqs: {
          deleteMany: {},
          ...(data.faqs.length ? { create: data.faqs } : {}),
        },
      },
      include: {
        galleries: true,
        features: true,
        processSteps: true,
        faqs: true,
      },
    }),
  remove: (id: number) => prisma.service.delete({ where: { id } }),
};
