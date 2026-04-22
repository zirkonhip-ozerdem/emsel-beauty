"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import DeleteModal from "@/components/admin/DeleteModal";
import {
  formatAdminDate,
  getAdminCsrfToken,
  unwrapAdminApiData,
  type AdminApiPayload,
} from "@/lib/admin/client-utils";

type Appointment = {
  id: number;
  name: string;
  phone: string | null;
  service: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  locale: "tr" | "en" | "de";
  createdAt: string;
};

const statusLabels = {
  PENDING: "Beklemede",
  CONFIRMED: "Onaylandı",
  CANCELLED: "İptal",
  COMPLETED: "Tamamlandı",
};

export default function ContactAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("/api/admin/contact-appointments", {
        credentials: "include",
        cache: "no-store",
      });
      const payload = (await response.json()) as AdminApiPayload<Appointment[]>;
      setAppointments(unwrapAdminApiData(payload));
    } catch {
      alert("Randevu talepleri yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchAppointments();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setDeleting(true);
      const csrfToken = await getAdminCsrfToken();
      const response = await fetch("/api/admin/contact-appointments", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify({ id: deleteId }),
      });

      if (!response.ok) throw new Error();

      setAppointments((prev) => prev.filter((item) => item.id !== deleteId));
      setDeleteId(null);
    } catch {
      alert("Randevu talebi silinemedi.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Randevu Talepleri</h1>
          <p className="mt-1 text-sm text-gray-500">İletişim formundan gelen talepleri takip edin.</p>
        </div>

        <Link
          href="/admin/contact-appointments/new"
          className="inline-flex w-fit rounded-md bg-[#8a6e36] px-4 py-2 text-sm font-semibold text-[#f9f8f4] hover:bg-[#725a2c]"
        >
          + Manuel Talep
        </Link>
      </div>

      {loading ? <div className="text-sm text-gray-500">Talepler yükleniyor...</div> : null}

      {appointments.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-3 text-left">Ad Soyad</th>
                <th className="px-6 py-3 text-left">Telefon</th>
                <th className="px-6 py-3 text-left">Hizmet</th>
                <th className="px-6 py-3 text-left">Dil</th>
                <th className="px-6 py-3 text-left">Durum</th>
                <th className="px-6 py-3 text-left">Tarih</th>
                <th className="px-6 py-3 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">{appointment.name}</td>
                  <td className="px-6 py-4 text-gray-600">{appointment.phone ?? "-"}</td>
                  <td className="px-6 py-4 text-gray-600">{appointment.service}</td>
                  <td className="px-6 py-4 text-gray-600">{appointment.locale.toUpperCase()}</td>
                  <td className="px-6 py-4 text-gray-600">{statusLabels[appointment.status]}</td>
                  <td className="px-6 py-4 text-gray-600">{formatAdminDate(appointment.createdAt)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex gap-3">
                      <Link href={`/admin/contact-appointments/${appointment.id}/edit`} className="text-blue-600 hover:underline">Düzenle</Link>
                      <button type="button" onClick={() => setDeleteId(appointment.id)} className="text-red-600 hover:underline">Sil</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : !loading ? (
        <div className="rounded-xl border bg-white p-6 text-sm text-gray-500">Henüz randevu talebi yok.</div>
      ) : null}

      <DeleteModal
        open={!!deleteId}
        title="Randevu Talebi Sil"
        description="Bu talep kalıcı olarak silinecek."
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => !deleting && setDeleteId(null)}
      />
    </div>
  );
}
