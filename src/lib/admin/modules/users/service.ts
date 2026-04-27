import { prisma } from "@/lib/prisma";

import type { UserInput } from "./schema";

export const userAdminService = {
  count: () => prisma.user.count(),
  list: () =>
    prisma.user.findMany({
      orderBy: [{ updatedAt: "desc" }, { id: "desc" }],
    }),
  get: (id: number) => prisma.user.findUnique({ where: { id } }),
  create: (data: UserInput) => prisma.user.create({ data }),
  update: (id: number, data: UserInput) =>
    prisma.user.update({ where: { id }, data }),
  remove: (id: number) => prisma.user.delete({ where: { id } }),
};
