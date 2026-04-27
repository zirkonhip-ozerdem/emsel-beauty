import { prisma } from "@/lib/prisma";
import { filterValidGalleryItems } from "@/lib/admin/modules/shared/service-helpers";

import type { BlogPostInput } from "./schema";

export const blogPostAdminService = {
  count: () => prisma.blogPost.count(),
  list: () =>
    prisma.blogPost.findMany({
      include: {
        galleries: { orderBy: { sortOrder: "asc" } },
      },
      orderBy: [{ sortOrder: "asc" }, { publishedAt: "desc" }],
    }),
  get: (id: number) =>
    prisma.blogPost.findUnique({
      where: { id },
      include: {
        galleries: { orderBy: { sortOrder: "asc" } },
      },
    }),
  create: (data: BlogPostInput) =>
    prisma.blogPost.create({
      data: {
        ...data,
        galleries: data.galleries.length
          ? { create: filterValidGalleryItems(data.galleries) }
          : undefined,
      },
      include: {
        galleries: true,
      },
    }),
  update: (id: number, data: BlogPostInput) =>
    prisma.blogPost.update({
      where: { id },
      data: {
        ...data,
        galleries: {
          deleteMany: {},
          ...(data.galleries.length
            ? { create: filterValidGalleryItems(data.galleries) }
            : {}),
        },
      },
      include: {
        galleries: true,
      },
    }),
  remove: (id: number) => prisma.blogPost.delete({ where: { id } }),
};
