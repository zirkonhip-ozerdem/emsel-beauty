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
      await fetch("/api/auth/csrf", {
        method: "GET",
        credentials: "include",
      });
      setCsrfReady(true);
    };

    void bootstrapCsrf();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      setError(null);

      const csrfToken = getCookieValue("emsel_admin_csrf");

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
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
        className="inline-flex w-full items-center justify-center rounded-full bg-accent-strong px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Giris yapiliyor..." : "Admin paneline gir"}
      </button>
    </form>
  );
}
