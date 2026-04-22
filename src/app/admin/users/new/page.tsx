"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { getAdminCsrfToken } from "@/lib/admin/client-utils";

const inputClass =
  "w-full rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#f2d688]/50";

export default function NewUserPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    status: "PENDING",
  });

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
      const response = await fetch("/api/admin/users", {
        method: "POST",
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
      alert("Kullanıcı oluşturulamadı.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Yeni Kullanıcı</h1>
          <p className="mt-1 text-sm text-gray-500">Kullanıcı iletişim bilgisini ekleyin.</p>
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
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <input name="firstName" value={form.firstName} onChange={handleInput} placeholder="Ad" className={inputClass} />
          <input name="lastName" value={form.lastName} onChange={handleInput} placeholder="Soyad" className={inputClass} />
          <input name="email" value={form.email} onChange={handleInput} placeholder="E-posta" className={inputClass} />
          <input name="phoneNumber" value={form.phoneNumber} onChange={handleInput} placeholder="Telefon" className={inputClass} />
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
