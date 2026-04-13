import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { type AdminResourceKey } from "@/lib/admin/types";
import { adminResourceSchemas } from "@/lib/admin/schemas";

function cleanGalleryItems<
  T extends {
    imageUrl: string | null;
    sortOrder: number;
  },
>(items: T[]) {
  return items.filter(
    (item): item is T & { imageUrl: string } => Boolean(item.imageUrl),
  );
}

type CampaignInput = z.infer<typeof adminResourceSchemas.campaigns>;
type UserInput = z.infer<typeof adminResourceSchemas.users>;
type WhoInput = z.infer<typeof adminResourceSchemas.who>;
type SiteSettingInput = z.infer<(typeof adminResourceSchemas)["site-settings"]>;
type ProductInput = z.infer<typeof adminResourceSchemas.products>;
type ServiceInput = z.infer<typeof adminResourceSchemas.services>;
type BlogPostInput = z.infer<(typeof adminResourceSchemas)["blog-posts"]>;
type ContactAppointmentInput = z.infer<
  (typeof adminResourceSchemas)["contact-appointments"]
>;

export type AdminCrudRouteHandler = {
  schema: z.ZodTypeAny;
  count: () => Promise<number>;
  list: () => Promise<unknown[]>;
  get: (id: number) => Promise<unknown | null>;
  create: (data: unknown) => Promise<unknown>;
  update: (id: number, data: unknown) => Promise<unknown>;
  remove: (id: number) => Promise<unknown>;
};

export const adminCrud = {
  campaigns: {
    schema: adminResourceSchemas.campaigns,
    count: () => prisma.campaign.count(),
    list: () =>
      prisma.campaign.findMany({
        orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
      }),
    get: (id: number) => prisma.campaign.findUnique({ where: { id } }),
    create: (data: CampaignInput) =>
      prisma.campaign.create({ data }),
    update: (id: number, data: CampaignInput) =>
      prisma.campaign.update({ where: { id }, data }),
    remove: (id: number) => prisma.campaign.delete({ where: { id } }),
  },
  users: {
    schema: adminResourceSchemas.users,
    count: () => prisma.user.count(),
    list: () =>
      prisma.user.findMany({
        orderBy: [{ updatedAt: "desc" }, { id: "desc" }],
      }),
    get: (id: number) => prisma.user.findUnique({ where: { id } }),
    create: (data: UserInput) =>
      prisma.user.create({ data }),
    update: (id: number, data: UserInput) =>
      prisma.user.update({ where: { id }, data }),
    remove: (id: number) => prisma.user.delete({ where: { id } }),
  },
  who: {
    schema: adminResourceSchemas.who,
    count: () => prisma.whoSection.count(),
    list: () =>
      prisma.whoSection.findMany({
        orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
      }),
    get: (id: number) => prisma.whoSection.findUnique({ where: { id } }),
    create: (data: WhoInput) =>
      prisma.whoSection.create({ data }),
    update: (id: number, data: WhoInput) =>
      prisma.whoSection.update({ where: { id }, data }),
    remove: (id: number) => prisma.whoSection.delete({ where: { id } }),
  },
  "site-settings": {
    schema: adminResourceSchemas["site-settings"],
    count: () => prisma.siteSetting.count(),
    list: () =>
      prisma.siteSetting.findMany({
        orderBy: [{ updatedAt: "desc" }],
      }),
    get: (id: number) => prisma.siteSetting.findUnique({ where: { id } }),
    create: (data: SiteSettingInput) =>
      prisma.siteSetting.create({ data }),
    update: (id: number, data: SiteSettingInput) =>
      prisma.siteSetting.update({ where: { id }, data }),
    remove: (id: number) => prisma.siteSetting.delete({ where: { id } }),
  },
  products: {
    schema: adminResourceSchemas.products,
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
      const galleries = cleanGalleryItems(data.galleries);

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
      const galleries = cleanGalleryItems(data.galleries);

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
  },
  services: {
    schema: adminResourceSchemas.services,
    count: () => prisma.service.count(),
    list: () =>
      prisma.service.findMany({
        include: {
          galleries: { orderBy: { sortOrder: "asc" } },
          features: { orderBy: { sortOrder: "asc" } },
          processSteps: { orderBy: { sortOrder: "asc" } },
          faqs: { orderBy: { sortOrder: "asc" } },
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
            ? { create: cleanGalleryItems(data.galleries) }
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
              ? { create: cleanGalleryItems(data.galleries) }
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
  },
  "blog-posts": {
    schema: adminResourceSchemas["blog-posts"],
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
            ? { create: cleanGalleryItems(data.galleries) }
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
              ? { create: cleanGalleryItems(data.galleries) }
              : {}),
          },
        },
        include: {
          galleries: true,
        },
      }),
    remove: (id: number) => prisma.blogPost.delete({ where: { id } }),
  },
  "contact-appointments": {
    schema: adminResourceSchemas["contact-appointments"],
    count: () => prisma.contactAppointment.count(),
    list: () =>
      prisma.contactAppointment.findMany({
        orderBy: [{ createdAt: "desc" }],
      }),
    get: (id: number) => prisma.contactAppointment.findUnique({ where: { id } }),
    create: (data: ContactAppointmentInput) =>
      prisma.contactAppointment.create({ data }),
    update: (id: number, data: ContactAppointmentInput) =>
      prisma.contactAppointment.update({ where: { id }, data }),
    remove: (id: number) => prisma.contactAppointment.delete({ where: { id } }),
  },
} as const;

export function getAdminCrudHandler(resourceKey: AdminResourceKey) {
  return adminCrud[resourceKey] as unknown as AdminCrudRouteHandler;
}

export async function getAdminDashboardCounts() {
  return {
    campaigns: await adminCrud.campaigns.count(),
    users: await adminCrud.users.count(),
    who: await adminCrud.who.count(),
    "site-settings": await adminCrud["site-settings"].count(),
    products: await adminCrud.products.count(),
    services: await adminCrud.services.count(),
    "blog-posts": await adminCrud["blog-posts"].count(),
    "contact-appointments": await adminCrud["contact-appointments"].count(),
  };
}
