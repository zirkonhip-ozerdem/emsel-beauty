import { prisma } from "@/lib/prisma";

import type { SiteSettingInput } from "./schema";

export const siteSettingAdminService = {
  count: () => prisma.siteSetting.count(),
  list: () =>
    prisma.siteSetting.findMany({
      orderBy: [{ updatedAt: "desc" }],
    }),
  get: (id: number) => prisma.siteSetting.findUnique({ where: { id } }),
  create: (data: SiteSettingInput) => prisma.siteSetting.create({ data }),
  update: (id: number, data: SiteSettingInput) =>
    prisma.siteSetting.update({ where: { id }, data }),
  remove: (id: number) => prisma.siteSetting.delete({ where: { id } }),
};
