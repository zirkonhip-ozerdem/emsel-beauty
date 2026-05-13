"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { RequiredFieldNote } from "@/components/admin/RequiredFieldNote";
import RichTextEditor from "@/components/admin/RichTextEditor";
import {
  getAdminCsrfToken,
  slugifyAdminText,
  unwrapAdminApiData,
  type AdminApiPayload,
} from "@/lib/admin/client-utils";

const inputClass =
  "w-full rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#f2d688]/50";

const campaignLimits = {
  title: 100,
  seoUrl: 255,
  badge: 80,
  description: 10000,
} as const;

function clampLength(value: string, max: number) {
  return value.slice(0, max);
}

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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
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
      const nextValue = clampLength(value, campaignLimits.title);

      setForm((prev) => ({
        ...prev,
        titleTr: nextValue,
        seoUrlTr: clampLength(
          slugifyAdminText(nextValue),
          campaignLimits.seoUrl,
        ),
        badgeTr: clampLength(nextValue, campaignLimits.badge),
      }));
      return;
    }

    if (name === "titleEn") {
      const nextValue = clampLength(value, campaignLimits.title);

      setForm((prev) => ({
        ...prev,
        titleEn: nextValue,
        seoUrlEn: clampLength(
          slugifyAdminText(nextValue),
          campaignLimits.seoUrl,
        ),
        badgeEn: clampLength(nextValue, campaignLimits.badge),
      }));
      return;
    }

    if (name === "titleDe") {
      const nextValue = clampLength(value, campaignLimits.title);

      setForm((prev) => ({
        ...prev,
        titleDe: nextValue,
        seoUrlDe: clampLength(
          slugifyAdminText(nextValue),
          campaignLimits.seoUrl,
        ),
        badgeDe: clampLength(nextValue, campaignLimits.badge),
      }));
      return;
    }

    const limitedValue = (() => {
      if (name.startsWith("seoUrl")) {
        return clampLength(value, campaignLimits.seoUrl);
      }

      if (name.startsWith("badge")) {
        return clampLength(value, campaignLimits.badge);
      }

      return value;
    })();

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : limitedValue,
    }));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setForm((prev) => ({
      ...prev,
      imageUrl: "",
    }));

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const csrfToken = await getAdminCsrfToken();
      const formData = new FormData();

      formData.append(
        "payload",
        JSON.stringify({
          ...form,
          imageUrl: form.imageUrl || null,
          startsAt: form.startsAt || null,
          endsAt: form.endsAt || null,
          sortOrder: Number(form.sortOrder) || 0,
        }),
      );

      if (imageFile) {
        formData.append("imageUrl", imageFile);
      }

      const response = await fetch(`/api/admin/campaigns/${id}`, {
        method: "PUT",
        headers: { "x-csrf-token": csrfToken },
        credentials: "include",
        body: formData,
      });

      const payload = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        throw new Error(payload?.message || "Kampanya güncellenemedi.");
      }

      alert(payload?.message || "Kampanya güncellendi.");
      router.push("/admin/campaigns");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Kampanya güncellenemedi.";
      alert(message);
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
            <RequiredFieldNote compact />
          </h2>
          <p className="text-xs text-gray-500">
            Her başlık alanı en fazla {campaignLimits.title} karakter olabilir.
          </p>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <input
              name="titleTr"
              value={form.titleTr}
              onChange={handleInput}
              className={inputClass}
              maxLength={campaignLimits.title}
            />
            <input
              name="titleEn"
              value={form.titleEn}
              onChange={handleInput}
              className={inputClass}
              maxLength={campaignLimits.title}
            />
            <input
              name="titleDe"
              value={form.titleDe}
              onChange={handleInput}
              className={inputClass}
              maxLength={campaignLimits.title}
            />
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
            SEO URL
            <RequiredFieldNote compact />
          </h2>
          <p className="text-xs text-gray-500">
            Her SEO URL alanı en fazla {campaignLimits.seoUrl} karakter olabilir.
          </p>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <input
              name="seoUrlTr"
              value={form.seoUrlTr}
              onChange={handleInput}
              className={inputClass}
              maxLength={campaignLimits.seoUrl}
            />
            <input
              name="seoUrlEn"
              value={form.seoUrlEn}
              onChange={handleInput}
              className={inputClass}
              maxLength={campaignLimits.seoUrl}
            />
            <input
              name="seoUrlDe"
              value={form.seoUrlDe}
              onChange={handleInput}
              className={inputClass}
              maxLength={campaignLimits.seoUrl}
            />
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Rozet / Etiket</h2>
          <p className="text-xs text-gray-500">
            Rozet alanları en fazla {campaignLimits.badge} karakter olabilir.
          </p>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <input
              name="badgeTr"
              value={form.badgeTr}
              onChange={handleInput}
              className={inputClass}
              maxLength={campaignLimits.badge}
            />
            <input
              name="badgeEn"
              value={form.badgeEn}
              onChange={handleInput}
              className={inputClass}
              maxLength={campaignLimits.badge}
            />
            <input
              name="badgeDe"
              value={form.badgeDe}
              onChange={handleInput}
              className={inputClass}
              maxLength={campaignLimits.badge}
            />
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Açıklama</h2>
          <p className="text-xs text-gray-500">
            Her açıklama alanı en fazla {campaignLimits.description} karakter olabilir.
          </p>
          <div className="grid grid-cols-1 gap-6">
            <RichTextEditor
              value={form.descTr}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  descTr: clampLength(value, campaignLimits.description),
                }))
              }
            />
            <RichTextEditor
              value={form.descEn}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  descEn: clampLength(value, campaignLimits.description),
                }))
              }
            />
            <RichTextEditor
              value={form.descDe}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  descDe: clampLength(value, campaignLimits.description),
                }))
              }
            />
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Kapak Görseli</label>
            {form.imageUrl ? (
              <div className="space-y-3 rounded-xl border border-[#eadfc7] bg-[#fcfaf4] p-3">
                <img
                  src={form.imageUrl}
                  alt=""
                  className="h-32 w-full rounded-lg border object-cover sm:w-56"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="inline-flex items-center rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                >
                  Kapak Görselini Sil
                </button>
              </div>
            ) : null}
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
              className="block w-full text-sm text-gray-800 file:mr-4 file:rounded-md file:border-0 file:bg-[#f2d688]/45 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#8a6e36]"
            />
            {imageFile ? (
              <div className="flex items-center justify-between rounded-md border border-[#e6d9ba] bg-[#fbf8ef] px-3 py-2 text-xs text-gray-600">
                <span className="truncate">{imageFile.name}</span>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="font-semibold text-red-600 hover:underline"
                >
                  Görseli Kaldır
                </button>
              </div>
            ) : null}
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
