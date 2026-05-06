"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  getAdminCsrfToken,
  unwrapAdminApiData,
  type AdminApiPayload,
} from "@/lib/admin/client-utils";

const inputClass =
  "w-full rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#f2d688]/50";

type User = {
  firstName: string;
  lastName: string;
  email: string | null;
  phoneNumber: string | null;
  status: "PENDING" | "ACTIVE" | "SUSPENDED" | "BANNED";
};

export default function EditUserPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    status: "PENDING",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/admin/users/${id}`, {
          credentials: "include",
          cache: "no-store",
        });
        const payload = (await response.json()) as AdminApiPayload<User>;
        const user = unwrapAdminApiData(payload);

        setForm({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email ?? "",
          phoneNumber: user.phoneNumber ?? "",
          status: user.status,
        });
      } catch {
        alert("Kullanıcı bilgileri yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };

    void fetchUser();
  }, [id]);

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const csrfToken = await getAdminCsrfToken();
      const response = await fetch(`/api/admin/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error();

      router.push("/admin/users");
    } catch {
      alert("Kullanıcı güncellenemedi.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-sm text-gray-500">Kullanıcı yükleniyor...</div>;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kullanıcı Düzenle</h1>
          <p className="mt-1 text-sm text-gray-500">Kullanıcı iletişim ve durum bilgisini güncelleyin.</p>
        </div>

        <div className="flex gap-3">
          <Link href="/admin/users" className="rounded-md border px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
            Vazgeç
          </Link>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-md bg-[#8a6e36] px-5 py-2 text-sm font-semibold text-[#f9f8f4] hover:bg-[#725a2c] disabled:opacity-60"
          >
            {saving ? "Güncelleniyor..." : "Güncelle"}
          </button>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="mb-4 text-xs font-medium text-amber-700">
          Ad ve Soyad alanları boş geçilemez.
        </p>
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <input name="firstName" value={form.firstName} onChange={handleInput} placeholder="Ad - Boş geçilemez" className={inputClass} />
          <input name="lastName" value={form.lastName} onChange={handleInput} placeholder="Soyad - Boş geçilemez" className={inputClass} />
          <input name="email" value={form.email} onChange={handleInput} className={inputClass} />
          <input name="phoneNumber" value={form.phoneNumber} onChange={handleInput} className={inputClass} />
          <select name="status" value={form.status} onChange={handleInput} className={inputClass}>
            <option value="PENDING">Beklemede</option>
            <option value="ACTIVE">Aktif</option>
            <option value="SUSPENDED">Askıda</option>
            <option value="BANNED">Engelli</option>
          </select>
        </section>
      </div>
    </div>
  );
}
