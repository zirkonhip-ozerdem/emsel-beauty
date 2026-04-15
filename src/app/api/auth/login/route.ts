import { z } from "zod";
import type { NextRequest } from "next/server";

import { handleAdminLogin } from "@/lib/auth/admin-auth";

export const dynamic = "force-dynamic";

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
  csrfToken: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = loginSchema.parse(body);

    return handleAdminLogin(request, parsed);
  } catch {
    return new Response(
      JSON.stringify({
        ok: false,
        message: "E-posta veya şifre hatalı",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
