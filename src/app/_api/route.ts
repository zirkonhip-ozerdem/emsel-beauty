import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Emsel Beauty API root is active.",
  });
}
