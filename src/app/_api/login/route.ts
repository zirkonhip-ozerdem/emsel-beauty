import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function POST() {
  return NextResponse.json(
    {
      status: "pending",
      message: "Login endpoint will be connected with auth in the next phase.",
    },
    { status: 501 },
  );
}
