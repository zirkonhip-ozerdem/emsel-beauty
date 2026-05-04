"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import RichTextEditor from "@/components/admin/RichTextEditor";
import {
  getAdminCsrfToken,
  slugifyAdminText,
  unwrapAdminApiData,
  type AdminApiPayload,
} from "@/lib/admin/client-utils";

const inputClass =
  "w-full rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#f2d688]/50";

type Campaign = {
  titleTr: string;
  titleEn: string;
  titleDe: string;
  seoUrlTr: string;
  seoUrlEn: string;
  seoUrlDe: string;
  badgeTr: string | null;
  badgeEn: string | null;
  badgeDe: string | null;
  descTr: string | null;
  descEn: string | null;
  descDe: string | null;
  imageUrl: string | null;
  startsAt: string | null;
  endsAt: string | null;
  sortOrder: number;
  isActive: boolean;
};

function toDateTimeInput(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 16);
}

export default function EditCampaignPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    titleTr: "",
    titleEn: "",
    titleDe: "",
    seoUrlTr: "",
    seoUrlEn: "",
    seoUrlDe: "",
    badgeTr: "",
    badgeEn: "",
    badgeDe: "",
    descTr: "",
    descEn: "",
    descDe: "",
    imageUrl: "",
    startsAt: "",
    endsAt: "",
    sortOrder: 0,
    isActive: true,
  });

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch(`/api/admin/campaigns/${id}`, {
          credentials: "include",
          cache: "no-store",
        });
        const payload = (await response.json()) as AdminApiPayload<Campaign>;
        const campaign = unwrapAdminApiData(payload);

        setForm({
          titleTr: campaign.titleTr,
          titleEn: campaign.titleEn,
          titleDe: campaign.titleDe,
          seoUrlTr: campaign.seoUrlTr,
          seoUrlEn: campaign.seoUrlEn,
          seoUrlDe: campaign.seoUrlDe,
          badgeTr: campaign.badgeTr ?? "",
          badgeEn: campaign.badgeEn ?? "",
          badgeDe: campaign.badgeDe ?? "",
          descTr: campaign.descTr ?? "",
          descEn: campaign.descEn ?? "",
          descDe: campaign.descDe ?? "",
          imageUrl: campaign.imageUrl ?? "",
          startsAt: toDateTimeInput(campaign.startsAt),
          endsAt: toDateTimeInput(campaign.endsAt),
          sortOrder: campaign.sortOrder ?? 0,
          isActive: campaign.isActive,
        });
      } catch {
        alert("Kampanya bilgileri yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };

    void fetchCampaign();
  }, [id]);

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = event.target;
    const checked =
      event.target instanceof HTMLInputElement ? event.target.checked : false;

    if (name === "titleTr") {
      setForm((prev) => ({
        ...prev,
        titleTr: value,
        seoUrlTr: slugifyAdminText(value),
        badgeTr: value,
      }));
      return;
    }

    if (name === "titleEn") {
      setForm((prev) => ({
        ...prev,
        titleEn: value,
        seoUrlEn: slugifyAdminText(value),
        badgeEn: value,
      }));
      return;
    }

    if (name === "titleDe") {
      setForm((prev) => ({
        ...prev,
        titleDe: value,
        seoUrlDe: slugifyAdminText(value),
        badgeDe: value,
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const csrfToken = await getAdminCsrfToken();
      const payload = {
        ...form,
        imageUrl: form.imageUrl.trim() || null,
        startsAt: form.startsAt || null,
        endsAt: form.endsAt || null,
        sortOrder: Number(form.sortOrder) || 0,
      };

      const response = await fetch(`/api/admin/campaigns/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          "x-csrf-token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error();
      }

      router.push("/admin/campaigns");
    } catch {
      alert("Kampanya güncellenemedi.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-sm text-gray-500">Kampanya yükleniyor...</div>;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kampanya Düzenle</h1>
          <p className="mt-1 text-sm text-gray-500">
            Kampanya metinlerini, kapak görselini ve yayın durumunu düzenleyin.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/admin/campaigns"
            className="rounded-md border px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Vazgeç
          </Link>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-md bg-[#8a6e36] px-5 py-2 text-sm font-semibold text-[#f9f8f4] shadow-sm hover:bg-[#725a2c] disabled:opacity-60"
          >
            {saving ? "Güncelleniyor..." : "Güncelle"}
          </button>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
            Kampanya Başlıkları
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <input name="titleTr" value={form.titleTr} onChange={handleInput} className={inputClass} />
            <input name="titleEn" value={form.titleEn} onChange={handleInput} className={inputClass} />
            <input name="titleDe" value={form.titleDe} onChange={handleInput} className={inputClass} />
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">SEO URL</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <input name="seoUrlTr" value={form.seoUrlTr} onChange={handleInput} className={inputClass} />
            <input name="seoUrlEn" value={form.seoUrlEn} onChange={handleInput} className={inputClass} />
            <input name="seoUrlDe" value={form.seoUrlDe} onChange={handleInput} className={inputClass} />
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Rozet / Etiket</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <input name="badgeTr" value={form.badgeTr} onChange={handleInput} className={inputClass} />
            <input name="badgeEn" value={form.badgeEn} onChange={handleInput} className={inputClass} />
            <input name="badgeDe" value={form.badgeDe} onChange={handleInput} className={inputClass} />
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Açıklama</h2>
          <div className="grid grid-cols-1 gap-6">
            <RichTextEditor value={form.descTr} onChange={(value) => setForm((prev) => ({ ...prev, descTr: value }))} />
            <RichTextEditor value={form.descEn} onChange={(value) => setForm((prev) => ({ ...prev, descEn: value }))} />
            <RichTextEditor value={form.descDe} onChange={(value) => setForm((prev) => ({ ...prev, descDe: value }))} />
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Kapak Görseli URL</label>
            {form.imageUrl ? (
              <img src={form.imageUrl} alt="" className="h-28 w-44 rounded-lg border object-cover" />
            ) : null}
            <input
              type="url"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleInput}
              placeholder="https://..."
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <input type="datetime-local" name="startsAt" value={form.startsAt} onChange={handleInput} className={inputClass} />
            <input type="datetime-local" name="endsAt" value={form.endsAt} onChange={handleInput} className={inputClass} />
          </div>
        </section>

        <section className="mt-10 flex flex-col gap-5 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="number"
            name="sortOrder"
            min={0}
            value={form.sortOrder}
            onChange={handleInput}
            className={`${inputClass} sm:max-w-xs`}
          />
          <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleInput}
              className="h-4 w-4 accent-[#8a6e36]"
            />
            Yayında
          </label>
        </section>
      </div>
    </div>
  );
}
