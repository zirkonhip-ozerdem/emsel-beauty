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

type SiteSetting = {
  id: number;
  siteName: string;
  email: string | null;
  phoneNumber: string | null;
  wpNumber: string | null;
  updatedAt: string;
};

export default function SiteSettingsPage() {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/admin/site-settings", {
        credentials: "include",
        cache: "no-store",
      });
      const payload = (await response.json()) as AdminApiPayload<SiteSetting[]>;
      setSettings(unwrapAdminApiData(payload));
    } catch {
      alert("Site ayarları yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchSettings();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setDeleting(true);
      const csrfToken = await getAdminCsrfToken();
      const response = await fetch("/api/admin/site-settings", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify({ id: deleteId }),
      });

      if (!response.ok) throw new Error();

      setSettings((prev) => prev.filter((item) => item.id !== deleteId));
      setDeleteId(null);
    } catch {
      alert("Site ayarı silinemedi.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Site Ayarları</h1>
          <p className="mt-1 text-sm text-gray-500">SEO, iletişim, logo ve sosyal medya bilgilerini yönetin.</p>
        </div>

        <Link
          href="/admin/site-settings/new"
          className="inline-flex w-fit rounded-md bg-[#8a6e36] px-4 py-2 text-sm font-semibold text-[#f9f8f4] hover:bg-[#725a2c]"
        >
          + Yeni Ayar
        </Link>
      </div>

      {loading ? <div className="text-sm text-gray-500">Site ayarları yükleniyor...</div> : null}

      {settings.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-3 text-left">Site</th>
                <th className="px-6 py-3 text-left">E-posta</th>
                <th className="px-6 py-3 text-left">Telefon</th>
                <th className="px-6 py-3 text-left">WhatsApp</th>
                <th className="px-6 py-3 text-left">Güncelleme</th>
                <th className="px-6 py-3 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {settings.map((setting) => (
                <tr key={setting.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">{setting.siteName}</td>
                  <td className="px-6 py-4 text-gray-600">{setting.email ?? "-"}</td>
                  <td className="px-6 py-4 text-gray-600">{setting.phoneNumber ?? "-"}</td>
                  <td className="px-6 py-4 text-gray-600">{setting.wpNumber ?? "-"}</td>
                  <td className="px-6 py-4 text-gray-600">{formatAdminDate(setting.updatedAt)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex gap-3">
                      <Link href={`/admin/site-settings/${setting.id}/edit`} className="text-blue-600 hover:underline">Düzenle</Link>
                      <button type="button" onClick={() => setDeleteId(setting.id)} className="text-red-600 hover:underline">Sil</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : !loading ? (
        <div className="rounded-xl border bg-white p-6 text-sm text-gray-500">Henüz site ayarı yok.</div>
      ) : null}

      <DeleteModal
        open={!!deleteId}
        title="Site Ayarı Sil"
        description="Bu site ayarı kalıcı olarak silinecek."
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => !deleting && setDeleteId(null)}
      />
    </div>
  );
}
