import { prisma } from "@/lib/prisma";
import { filterValidGalleryItems } from "@/lib/admin/modules/shared/service-helpers";

import type { ProductInput } from "./schema";

export const productAdminService = {
  count: () => prisma.product.count(),
  list: () =>
    prisma.product.findMany({
      include: {
        galleries: {
          orderBy: { sortOrder: "asc" },
        },
      },
      orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
    }),
  get: (id: number) =>
    prisma.product.findUnique({
      where: { id },
      include: {
        galleries: {
          orderBy: { sortOrder: "asc" },
        },
      },
    }),
  create: (data: ProductInput) => {
    const galleries = filterValidGalleryItems(data.galleries);

    return prisma.product.create({
      data: {
        ...data,
        galleries: galleries.length
          ? {
              create: galleries,
            }
          : undefined,
      },
      include: {
        galleries: true,
      },
    });
  },
  update: (id: number, data: ProductInput) => {
    const galleries = filterValidGalleryItems(data.galleries);

    return prisma.product.update({
      where: { id },
      data: {
        ...data,
        galleries: {
          deleteMany: {},
          ...(galleries.length ? { create: galleries } : {}),
        },
      },
      include: {
        galleries: true,
      },
    });
  },
  remove: (id: number) => prisma.product.delete({ where: { id } }),
};
