import { z } from "zod";
import type { NextRequest } from "next/server";

import { hasDatabaseConfig, prisma } from "@/lib/prisma";
import {
  resolveSiteLocale,
  siteDbUnavailableResponse,
  siteJsonError,
  siteJsonSuccess,
} from "@/lib/site/server";

export const dynamic = "force-dynamic";

const appointmentSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  service: z.string().trim().min(2).max(100),
  locale: z.string().trim().optional(),
});

export async function POST(request: NextRequest) {
  if (!hasDatabaseConfig()) {
    return siteDbUnavailableResponse();
  }

  try {
    const body = await request.json();
    const parsed = appointmentSchema.parse(body);
    const locale = resolveSiteLocale(parsed.locale ?? null);

    const appointment = await prisma.contactAppointment.create({
      data: {
        name: parsed.name,
        phone: parsed.phone ? parsed.phone : null,
        service: parsed.service,
        locale,
      },
      select: {
        id: true,
        name: true,
        service: true,
        locale: true,
        status: true,
        createdAt: true,
      },
    });

    return siteJsonSuccess(appointment, "Randevu talebiniz alindi.");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return siteJsonError("Gonderilen alanlar dogrulanamadi.", 422, error.flatten());
    }

    console.error(error);
    return siteJsonError("Randevu talebi olusturulamadi.", 500);
  }
}
