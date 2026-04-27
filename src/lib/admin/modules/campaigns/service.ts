import { prisma } from "@/lib/prisma";

import type { CampaignInput } from "./schema";

export const campaignAdminService = {
  count: () => prisma.campaign.count(),
  list: () =>
    prisma.campaign.findMany({
      orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
    }),
  get: (id: number) => prisma.campaign.findUnique({ where: { id } }),
  create: (data: CampaignInput) => prisma.campaign.create({ data }),
  update: (id: number, data: CampaignInput) =>
    prisma.campaign.update({ where: { id }, data }),
  remove: (id: number) => prisma.campaign.delete({ where: { id } }),
};
