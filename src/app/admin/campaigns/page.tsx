"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import DeleteModal from "@/components/admin/DeleteModal";
import {
  formatAdminDate,
  getAdminCsrfToken,
  unwrapAdminApiData,
  type AdminApiPayload,
} from "@/lib/admin/client-utils";

type Campaign = {
  id: number;
  titleTr: string;
  titleEn: string;
  titleDe: string;
  badgeTr: string | null;
  imageUrl: string | null;
  startsAt: string | null;
  isActive: boolean;
  updatedAt: string;
};

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchCampaigns = async () => {
    try {
      const res = await fetch("/api/admin/campaigns", {
        credentials: "include",
        cache: "no-store",
      });
      const data = (await res.json()) as AdminApiPayload<Campaign[]>;
      setCampaigns(unwrapAdminApiData(data));
    } catch {
      alert("Kampanyalar yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchCampaigns();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setDeleting(true);
      const csrfToken = await getAdminCsrfToken();
      const res = await fetch("/api/admin/campaigns", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify({ id: deleteId }),
      });

      const payload = (await res.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!res.ok) {
        throw new Error(payload?.message || "Kampanya silinemedi.");
      }

      setCampaigns((prev) => prev.filter((item) => item.id !== deleteId));
      setDeleteId(null);
      alert(payload?.message || "Kampanya silindi.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Kampanya silinemedi.";
      alert(message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kampanyalar</h1>
          <p className="mt-1 text-sm text-gray-500">
            Site genelinde yayınlanacak çok dilli kampanya içerikleri.
          </p>
        </div>

        <Link
          href="/admin/campaigns/new"
          className="inline-flex w-fit items-center gap-2 rounded-md bg-[#8a6e36] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          + Yeni Kampanya
        </Link>
      </div>

      {loading ? <div className="text-sm text-gray-500">Kampanyalar yükleniyor...</div> : null}

      {!loading && campaigns.length === 0 ? (
        <div className="rounded-xl border bg-white p-6 text-sm text-gray-500">
          Henüz kampanya kaydı yok.
        </div>
      ) : null}

      {campaigns.length > 0 ? (
        <div className="hidden overflow-x-auto rounded-xl border bg-white shadow-sm md:block">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-3 text-left">Görsel</th>
                <th className="px-6 py-3 text-left">Başlık</th>
                <th className="px-6 py-3 text-left">Rozet</th>
                <th className="px-6 py-3 text-left">Başlangıç</th>
                <th className="px-6 py-3 text-left">Durum</th>
                <th className="px-6 py-3 text-right">İşlemler</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    {campaign.imageUrl ? (
                      <img
                        src={campaign.imageUrl}
                        alt={campaign.titleTr}
                        className="h-12 w-12 rounded-md border object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 text-xs text-gray-400">
                        Yok
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">{campaign.titleTr}</div>
                    <div className="text-xs text-gray-500">{campaign.titleEn}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{campaign.badgeTr ?? "-"}</td>
                  <td className="px-6 py-4 text-gray-600">{formatAdminDate(campaign.startsAt)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs ${
                        campaign.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {campaign.isActive ? "Yayında" : "Pasif"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex gap-3">
                      <Link
                        href={`/admin/campaigns/${campaign.id}/edit`}
                        className="text-blue-600 hover:underline"
                      >
                        Düzenle
                      </Link>
                      <button
                        type="button"
                        onClick={() => setDeleteId(campaign.id)}
                        className="text-red-600 hover:underline"
                      >
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="rounded-xl border bg-white p-4">
            <div className="flex items-center gap-3">
              {campaign.imageUrl ? (
                <img src={campaign.imageUrl} alt="" className="h-10 w-10 rounded-md object-cover" />
              ) : null}
              <div>
                <div className="font-semibold text-gray-800">{campaign.titleTr}</div>
                <div className="text-xs text-gray-500">{campaign.badgeTr ?? "-"}</div>
              </div>
            </div>
            <div className="mt-3 flex justify-end gap-4 border-t pt-3">
              <Link href={`/admin/campaigns/${campaign.id}/edit`} className="text-sm text-blue-600">
                Düzenle
              </Link>
              <button type="button" onClick={() => setDeleteId(campaign.id)} className="text-sm text-red-600">
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>

      <DeleteModal
        open={!!deleteId}
        title="Kampanya Sil"
        description="Bu kampanya kalıcı olarak silinecek."
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => !deleting && setDeleteId(null)}
      />
    </div>
  );
}
