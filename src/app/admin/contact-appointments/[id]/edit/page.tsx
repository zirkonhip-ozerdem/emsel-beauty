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

type Appointment = {
  name: string;
  phone: string | null;
  service: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  locale: "tr" | "en" | "de";
};

export default function EditContactAppointmentPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    status: "PENDING",
    locale: "tr",
  });

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await fetch(`/api/admin/contact-appointments/${id}`, {
          credentials: "include",
          cache: "no-store",
        });
        const payload = (await response.json()) as AdminApiPayload<Appointment>;
        const appointment = unwrapAdminApiData(payload);

        setForm({
          name: appointment.name,
          phone: appointment.phone ?? "",
          service: appointment.service,
          status: appointment.status,
          locale: appointment.locale,
        });
      } catch {
        alert("Randevu talebi yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };

    void fetchAppointment();
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
      const response = await fetch(`/api/admin/contact-appointments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error();

      router.push("/admin/contact-appointments");
    } catch {
      alert("Randevu talebi güncellenemedi.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-sm text-gray-500">Randevu talebi yükleniyor...</div>;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Randevu Talebi Düzenle</h1>
          <p className="mt-1 text-sm text-gray-500">Talebin durumunu ve iletişim bilgisini güncelleyin.</p>
        </div>

        <div className="flex gap-3">
          <Link href="/admin/contact-appointments" className="rounded-md border px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
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
          Adınız Soyadınız ve Hizmet alanları boş geçilemez.
        </p>
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <input name="name" value={form.name} onChange={handleInput} placeholder="Adınız Soyadınız - Boş geçilemez" className={inputClass} />
          <input name="phone" value={form.phone} onChange={handleInput} className={inputClass} />
          <input name="service" value={form.service} onChange={handleInput} placeholder="Hizmet - Boş geçilemez" className={inputClass} />
          <select name="status" value={form.status} onChange={handleInput} className={inputClass}>
            <option value="PENDING">Beklemede</option>
            <option value="CONFIRMED">Onaylandı</option>
            <option value="CANCELLED">İptal</option>
            <option value="COMPLETED">Tamamlandı</option>
          </select>
          <select name="locale" value={form.locale} onChange={handleInput} className={inputClass}>
            <option value="tr">TR</option>
            <option value="en">EN</option>
            <option value="de">DE</option>
          </select>
        </section>
      </div>
    </div>
  );
}
