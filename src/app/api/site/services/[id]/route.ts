import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const service = await prisma.service.findFirst({
      where: { id: Number(id), isActive: true },
      include: {
        galleries: { orderBy: { sortOrder: "asc" } },
        features: { orderBy: { sortOrder: "asc" } },
        processSteps: { orderBy: { sortOrder: "asc" } },
        faqs: { orderBy: { sortOrder: "asc" } },
      },
    });
    if (!service) return NextResponse.json({ ok: false }, { status: 404 });
    return NextResponse.json({ ok: true, data: service });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
