import { prisma } from "@/lib/prisma";

import type { WhoInput } from "./schema";

export const whoAdminService = {
  count: () => prisma.whoSection.count(),
  list: () =>
    prisma.whoSection.findMany({
      orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
    }),
  get: (id: number) => prisma.whoSection.findUnique({ where: { id } }),
  create: (data: WhoInput) => prisma.whoSection.create({ data }),
  update: (id: number, data: WhoInput) =>
    prisma.whoSection.update({ where: { id }, data }),
  remove: (id: number) => prisma.whoSection.delete({ where: { id } }),
};
