"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import DeleteModal from "@/components/admin/DeleteModal";
import {
  getAdminCsrfToken,
  unwrapAdminApiData,
  type AdminApiPayload,
} from "@/lib/admin/client-utils";

type WhoSection = {
  id: number;
  titleTr: string | null;
  titleEn: string | null;
  imageUrl: string | null;
  sortOrder: number;
  isActive: boolean;
};

export default function WhoPage() {
  const [items, setItems] = useState<WhoSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/admin/who", {
        credentials: "include",
        cache: "no-store",
      });
      const payload = (await response.json()) as AdminApiPayload<WhoSection[]>;
      setItems(unwrapAdminApiData(payload));
    } catch {
      alert("Hikayemiz kayıtları yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchItems();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setDeleting(true);
      const csrfToken = await getAdminCsrfToken();
      const response = await fetch("/api/admin/who", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify({ id: deleteId }),
      });

      if (!response.ok) throw new Error();

      setItems((prev) => prev.filter((item) => item.id !== deleteId));
      setDeleteId(null);
    } catch {
      alert("Kayıt silinemedi.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Hikayemiz</h1>
          <p className="mt-1 text-sm text-gray-500">Kurumsal hikaye ve marka anlatımı bölümlerini yönetin.</p>
        </div>

        <Link
          href="/admin/who/new"
          className="inline-flex w-fit rounded-md bg-[#8a6e36] px-4 py-2 text-sm font-semibold text-[#f9f8f4] hover:bg-[#725a2c]"
        >
          + Yeni Kayıt
        </Link>
      </div>

      {loading ? <div className="text-sm text-gray-500">Kayıtlar yükleniyor...</div> : null}

      {!loading && items.length === 0 ? (
        <div className="rounded-xl border bg-white p-6 text-sm text-gray-500">Henüz kayıt yok.</div>
      ) : null}

      {items.length > 0 ? (
        <div className="hidden overflow-x-auto rounded-xl border bg-white shadow-sm md:block">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-3 text-left">Görsel</th>
                <th className="px-6 py-3 text-left">Başlık</th>
                <th className="px-6 py-3 text-left">Sıra</th>
                <th className="px-6 py-3 text-left">Durum</th>
                <th className="px-6 py-3 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.titleTr ?? ""} className="h-12 w-12 rounded-md border object-cover" />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 text-xs text-gray-400">Yok</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">{item.titleTr ?? "-"}</div>
                    <div className="text-xs text-gray-500">{item.titleEn ?? "-"}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{item.sortOrder}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs ${item.isActive ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}>
                      {item.isActive ? "Aktif" : "Pasif"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex gap-3">
                      <Link href={`/admin/who/${item.id}/edit`} className="text-blue-600 hover:underline">Düzenle</Link>
                      <button type="button" onClick={() => setDeleteId(item.id)} className="text-red-600 hover:underline">Sil</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      <DeleteModal
        open={!!deleteId}
        title="Kayıt Sil"
        description="Bu hikaye kaydı kalıcı olarak silinecek."
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => !deleting && setDeleteId(null)}
      />
    </div>
  );
}
