"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

function getCookieValue(name: string) {
  if (typeof document === "undefined") {
    return null;
  }

  const value = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${name}=`))
    ?.split("=")[1];

  return value ? decodeURIComponent(value) : null;
}

export function AdminLogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "x-csrf-token": getCookieValue("emsel_admin_csrf") ?? "",
        },
        credentials: "include",
      });

      const payload = (await response.json().catch(() => null)) as
        | { redirectTo?: string }
        | null;

      router.replace(payload?.redirectTo ?? "/login");
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isPending}
      className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-surface-strong disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? "Çıkış yapılıyor..." : "Çıkış yap"}
    </button>
  );
}
