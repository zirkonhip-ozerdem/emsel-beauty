import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { verifyAdminAccessToken } from "@/lib/auth/jwt";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("emsel_admin_access")?.value;

  if (accessToken) {
    const payload = await verifyAdminAccessToken(accessToken);

    if (payload?.role === "ADMIN") {
      redirect("/admin");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6efe7] px-4 py-12">
      <div className="w-full max-w-md rounded-[34px] border border-border bg-white/92 p-8 shadow-[var(--shadow)]">
        <div className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-strong">
            Emsel Beauty
          </p>
          <h1 className="font-display text-4xl text-foreground">
            Admin girisi
          </h1>
          <p className="text-sm leading-7 text-muted">
            Bu alan yalnizca yetkili admin kullanicilar icindir. Oturum actiktan
            sonra tum admin rotalari koruma altina alinmis olacak.
          </p>
        </div>

        <div className="mt-8">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}
