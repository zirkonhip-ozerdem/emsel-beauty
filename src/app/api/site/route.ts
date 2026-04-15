import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Site API namespace aktif.",
    endpoints: [
      {
        path: "/api/site/campaigns",
        method: "GET",
        description: "Aktif kampanyalari locale bazli listeler.",
      },
      {
        path: "/api/site/contact-appointments",
        method: "POST",
        description: "Public randevu taleplerini kaydeder.",
      },
    ],
  });
}
