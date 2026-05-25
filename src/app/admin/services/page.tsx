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

type Service = {
  id: number;
  nameTr: string;
  nameEn: string;
  slugTr: string;
  durationMinutes: number | null;
  imageUrl: string | null;
  isActive: boolean;
  showOnHomepage: boolean;
  updatedAt: string;
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/admin/services", {
        credentials: "include",
        cache: "no-store",
      });
      const payload = (await response.json()) as AdminApiPayload<Service[]>;
      setServices(unwrapAdminApiData(payload));
    } catch {
      alert("Hizmetler yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchServices();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setDeleting(true);
      const csrfToken = await getAdminCsrfToken();
      const response = await fetch("/api/admin/services", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify({ id: deleteId }),
      });

      if (!response.ok) throw new Error();

      setServices((prev) => prev.filter((service) => service.id !== deleteId));
      setDeleteId(null);
    } catch {
      alert("Hizmet silinemedi.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Hizmetler</h1>
          <p className="mt-1 text-sm text-gray-500">Web sitesindeki çok dilli hizmet sayfalarını yönetin.</p>
        </div>

        <Link
          href="/admin/services/new"
          className="inline-flex w-fit rounded-md bg-[#8a6e36] px-4 py-2 text-sm font-semibold text-[#f9f8f4] hover:bg-[#725a2c]"
        >
          + Yeni Hizmet
        </Link>
      </div>

      {loading ? <div className="text-sm text-gray-500">Hizmetler yükleniyor...</div> : null}

      {!loading && services.length === 0 ? (
        <div className="rounded-xl border bg-white p-6 text-sm text-gray-500">Henüz hizmet yok.</div>
      ) : null}

      {services.length > 0 ? (
        <div className="hidden overflow-x-auto rounded-xl border bg-white shadow-sm md:block">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-3 text-left">Görsel</th>
                <th className="px-6 py-3 text-left">Hizmet</th>
                <th className="px-6 py-3 text-left">Süre</th>
                <th className="px-6 py-3 text-left">Anasayfa</th>
                <th className="px-6 py-3 text-left">Durum</th>
                <th className="px-6 py-3 text-left">Güncelleme</th>
                <th className="px-6 py-3 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    {service.imageUrl ? (
                      <img src={service.imageUrl} alt={service.nameTr} className="h-12 w-12 rounded-md border object-cover" />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 text-xs text-gray-400">Yok</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">{service.nameTr}</div>
                    <div className="text-xs text-gray-500">/{service.slugTr}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{service.durationMinutes ? `${service.durationMinutes} dk` : "-"}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs ${service.showOnHomepage ? "bg-[#f6edd7] text-[#8a6e36]" : "bg-gray-100 text-gray-500"}`}>
                      {service.showOnHomepage ? "Imza Bakimi" : "Standart"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs ${service.isActive ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}>
                      {service.isActive ? "Yayında" : "Pasif"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{formatAdminDate(service.updatedAt)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex gap-3">
                      <Link href={`/admin/services/${service.id}/edit`} className="text-blue-600 hover:underline">Düzenle</Link>
                      <button type="button" onClick={() => setDeleteId(service.id)} className="text-red-600 hover:underline">Sil</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {services.map((service) => (
          <div key={service.id} className="rounded-xl border bg-white p-4">
            <div className="font-semibold text-gray-800">{service.nameTr}</div>
            <div className="mt-1 text-xs text-gray-500">
              {service.durationMinutes ? `${service.durationMinutes} dk` : "Süre yok"}
            </div>
            <div className="mt-2">
              <span className={`inline-flex rounded-full px-2 py-1 text-[11px] ${service.showOnHomepage ? "bg-[#f6edd7] text-[#8a6e36]" : "bg-gray-100 text-gray-500"}`}>
                {service.showOnHomepage ? "Anasayfada gosteriliyor" : "Anasayfada kapali"}
              </span>
            </div>
            <div className="mt-3 flex justify-end gap-4 border-t pt-3">
              <Link href={`/admin/services/${service.id}/edit`} className="text-sm text-blue-600">Düzenle</Link>
              <button type="button" onClick={() => setDeleteId(service.id)} className="text-sm text-red-600">Sil</button>
            </div>
          </div>
        ))}
      </div>

      <DeleteModal
        open={!!deleteId}
        title="Hizmet Sil"
        description="Bu hizmet kalıcı olarak silinecek."
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => !deleting && setDeleteId(null)}
      />
    </div>
  );
}
