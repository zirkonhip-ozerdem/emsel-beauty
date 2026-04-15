import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Emsel Beauty API root aktif.",
    namespaces: {
      admin: {
        basePath: "/api/admin",
        description: "Admin panel CRUD endpointleri",
      },
      site: {
        basePath: "/api/site",
        description: "Public website endpointleri",
      },
      auth: {
        basePath: "/api/auth",
        description: "Kimlik dogrulama endpointleri",
      },
    },
  });
}
