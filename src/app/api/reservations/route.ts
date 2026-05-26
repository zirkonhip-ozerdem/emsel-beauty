import { z } from "zod";

import { hasDatabaseConfig, prisma } from "@/lib/prisma";
import { contactAppointmentInputSchema } from "@/lib/admin/modules/contact-appointments/schema";
import {
  siteDbUnavailableResponse,
  siteJsonError,
  siteJsonSuccess,
} from "@/lib/site/server";

const reservationSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().max(30).optional().default(""),
  service: z.string().trim().min(2).max(100),
  campaign: z.string().trim().max(100).optional().default(""),
  locale: z.enum(["tr", "en", "de"]).default("tr"),
});

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  if (!hasDatabaseConfig()) {
    return siteDbUnavailableResponse();
  }

  const reservations = await prisma.contactAppointment.findMany({
    orderBy: [{ createdAt: "desc" }],
    select: {
      id: true,
      name: true,
      phone: true,
      service: true,
      campaign: true,
      status: true,
      locale: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return siteJsonSuccess(reservations);
}

export async function POST(request: Request) {
  if (!hasDatabaseConfig()) {
    return siteDbUnavailableResponse();
  }

  try {
    const body = await request.json();
    const payload = reservationSchema.parse(body);
    const appointmentPayload = contactAppointmentInputSchema.parse({
      name: payload.name,
      phone: payload.phone || null,
      service: payload.service,
      campaign: payload.campaign || null,
      locale: payload.locale,
      status: "PENDING",
    });
    const created = await prisma.contactAppointment.create({
      data: appointmentPayload,
      select: {
        id: true,
        name: true,
        phone: true,
        service: true,
        campaign: true,
        status: true,
        locale: true,
        createdAt: true,
      },
    });

    return siteJsonSuccess(created, "Randevu talebi alındı.");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return siteJsonError("Geçersiz randevu formu verisi.", 400, error.flatten());
    }

    console.error("RESERVATION CREATE ERROR:", error);
    return siteJsonError("Randevu talebi kaydedilemedi.", 500);
  }
}
