"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

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

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [csrfReady, setCsrfReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const bootstrapCsrf = async () => {
      try {
        const response = await fetch("/api/auth/csrf", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("CSRF bootstrap failed.");
        }

        setCsrfReady(true);
      } catch {
        setError("Giris guvenlik kontrolu hazirlanamadi. Sayfayi yenileyip tekrar deneyin.");
      }
    };

    void bootstrapCsrf();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      setError(null);

      const csrfToken = getCookieValue("emsel_admin_csrf");

      if (!csrfToken) {
        setError("Guvenlik anahtari alinamadi. Sayfayi yenileyip tekrar deneyin.");
        return;
      }

      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          cache: "no-store",
          body: JSON.stringify({
            email,
            password,
            csrfToken,
          }),
        });

        const payload = (await response.json().catch(() => null)) as
          | { ok?: boolean; message?: string; redirectTo?: string }
          | null;

        if (!response.ok || !payload?.ok) {
          setError(payload?.message ?? "Giris yapilamadi.");
          return;
        }

        router.replace(payload.redirectTo ?? "/admin");
        router.refresh();
      } catch {
        setError("Sunucuya baglanirken bir hata olustu. Lutfen tekrar deneyin.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground" htmlFor="admin-email">
          E-posta
        </label>
        <input
          id="admin-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          className="w-full rounded-[18px] border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent-strong focus:ring-2 focus:ring-accent-soft/50"
          placeholder="admin@emselbeauty.com"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground" htmlFor="admin-password">
          Sifre
        </label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          className="w-full rounded-[18px] border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent-strong focus:ring-2 focus:ring-accent-soft/50"
          placeholder="••••••••••••"
          required
        />
      </div>

      {error ? (
        <p className="rounded-[16px] bg-[#fff3ef] px-4 py-3 text-sm text-[#9c4b38]">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending || !csrfReady}
        className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-[#8a6e36] bg-[linear-gradient(135deg,#f2d688_0%,#c5a059_48%,#8a6e36_100%)] px-5 py-3 text-sm font-semibold text-[#fffaf0] shadow-[0_14px_32px_rgba(138,110,54,0.28)] transition hover:brightness-[1.04] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span>{isPending ? "Giris yapiliyor..." : "Admin paneline gir"}</span>
        <span
          aria-hidden="true"
          className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(255,250,240,0.18)] text-base leading-none transition-transform duration-200 group-hover:translate-x-0.5"
        >
          {isPending ? "..." : "→"}
        </span>
      </button>
    </form>
  );
}
