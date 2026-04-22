"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { getAdminCsrfToken } from "@/lib/admin/client-utils";

type LoginResponse =
  | { ok: true; redirectTo?: string }
  | { ok: false; message?: string };

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const csrfToken = await getAdminCsrfToken();
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          csrfToken,
        }),
      });
      const payload = (await response.json().catch(() => null)) as LoginResponse | null;

      if (!response.ok || !payload?.ok) {
        const message = payload && "message" in payload ? payload.message : null;
        throw new Error(message ?? "Giriş yapılamadı.");
      }

      router.push(payload.redirectTo ?? "/admin");
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Giriş yapılamadı.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7e6d3] px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <img
          src="/logo/emsel-logo.png"
          alt="Emsel Beauty"
          className="mx-auto mb-6 max-h-28 w-auto"
        />

        <h1 className="mb-6 text-center text-2xl font-bold text-[#8a6e36]">
          Admin Girişi
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">
              E-posta
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({ ...current, email: event.target.value }))
              }
              autoComplete="username"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-[#c5a059]"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">
              Şifre
            </label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={(event) =>
                setForm((current) => ({ ...current, password: event.target.value }))
              }
              autoComplete="current-password"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-[#c5a059]"
            />
          </div>

          {error ? <p className="text-center text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[#8a6e36] py-2 font-medium text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
}
