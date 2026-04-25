import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import {
  deleteAdminResource,
  listAdminResource,
} from "@/lib/admin/api-resource-handlers";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// ✅ Ürünleri listeleme (aynı kalıyor)
export function GET(request: NextRequest) {
  return listAdminResource(request, "products");
}

// 🔥 ÜRÜN OLUŞTURMA (BURAYI DEĞİŞTİRDİK)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const product = await prisma.product.create({
      data: {
        nameTr: body.nameTr,
        nameEn: body.nameEn,
        nameDe: body.nameDe,
        descriptionTr: body.descriptionTr,
        descriptionEn: body.descriptionEn,
        descriptionDe: body.descriptionDe,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("CREATE ERROR:", error);
    return NextResponse.json(
      { error: "Ürün oluşturulamadı" },
      { status: 500 }
    );
  }
}

// ✅ Silme aynı kalıyor
export function DELETE(request: NextRequest) {
  return deleteAdminResource(request, "products");
}