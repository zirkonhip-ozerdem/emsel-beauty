import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({
    status: "pending",
    message: "Campaign API endpoint will be connected to the database layer next.",
  });
}
