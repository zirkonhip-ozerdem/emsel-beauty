import { prisma } from "@/lib/prisma";

import type { ContactAppointmentInput } from "./schema";

export const contactAppointmentAdminService = {
  count: () => prisma.contactAppointment.count(),
  list: () =>
    prisma.contactAppointment.findMany({
      orderBy: [{ createdAt: "desc" }],
    }),
  get: (id: number) =>
    prisma.contactAppointment.findUnique({
      where: { id },
    }),
  create: (data: ContactAppointmentInput) =>
    prisma.contactAppointment.create({ data }),
  update: (id: number, data: ContactAppointmentInput) =>
    prisma.contactAppointment.update({ where: { id }, data }),
  remove: (id: number) =>
    prisma.contactAppointment.delete({ where: { id } }),
};
