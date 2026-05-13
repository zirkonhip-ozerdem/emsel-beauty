"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { RequiredFieldNote } from "@/components/admin/RequiredFieldNote";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { getAdminCsrfToken, slugifyAdminText } from "@/lib/admin/client-utils";

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

export default function NewCampaignPage() {
  const router = useRouter();
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
    startsAt: "",
    endsAt: "",
    sortOrder: 0,
    isActive: true,
  });

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

  const handleRemoveSelectedImage = () => {
    setImageFile(null);

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
          startsAt: form.startsAt || null,
          endsAt: form.endsAt || null,
          sortOrder: Number(form.sortOrder) || 0,
        }),
      );

      if (imageFile) {
        formData.append("imageUrl", imageFile);
      }

      const response = await fetch("/api/admin/campaigns", {
        method: "POST",
        headers: { "x-csrf-token": csrfToken },
        credentials: "include",
        body: formData,
      });

      const payload = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        throw new Error(payload?.message || "Kampanya oluşturulamadı.");
      }

      alert(payload?.message || "Kampanya başarıyla oluşturuldu.");
      router.push("/admin/campaigns");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Kampanya oluşturulamadı.";
      alert(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Yeni Kampanya</h1>
          <p className="mt-1 text-sm text-gray-500">
            Türkçe, İngilizce ve Almanca kampanya içeriğini tek ekrandan hazırlayın.
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
            {saving ? "Kaydediliyor..." : "Kaydet"}
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
              placeholder="Kampanya başlığı (TR)"
              className={inputClass}
              maxLength={campaignLimits.title}
            />
            <input
              name="titleEn"
              value={form.titleEn}
              onChange={handleInput}
              placeholder="Campaign title (EN)"
              className={inputClass}
              maxLength={campaignLimits.title}
            />
            <input
              name="titleDe"
              value={form.titleDe}
              onChange={handleInput}
              placeholder="Kampagnentitel (DE)"
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
              placeholder="seo-url-tr"
              className={inputClass}
              maxLength={campaignLimits.seoUrl}
            />
            <input
              name="seoUrlEn"
              value={form.seoUrlEn}
              onChange={handleInput}
              placeholder="seo-url-en"
              className={inputClass}
              maxLength={campaignLimits.seoUrl}
            />
            <input
              name="seoUrlDe"
              value={form.seoUrlDe}
              onChange={handleInput}
              placeholder="seo-url-de"
              className={inputClass}
              maxLength={campaignLimits.seoUrl}
            />
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
            Rozet / Etiket
          </h2>
          <p className="text-xs text-gray-500">
            Rozet alanları en fazla {campaignLimits.badge} karakter olabilir.
          </p>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <input
              name="badgeTr"
              value={form.badgeTr}
              onChange={handleInput}
              placeholder="Rozet (TR)"
              className={inputClass}
              maxLength={campaignLimits.badge}
            />
            <input
              name="badgeEn"
              value={form.badgeEn}
              onChange={handleInput}
              placeholder="Badge (EN)"
              className={inputClass}
              maxLength={campaignLimits.badge}
            />
            <input
              name="badgeDe"
              value={form.badgeDe}
              onChange={handleInput}
              placeholder="Badge (DE)"
              className={inputClass}
              maxLength={campaignLimits.badge}
            />
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
            Açıklama
          </h2>
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
              placeholder="Aciklama (TR)"
            />
            <RichTextEditor
              value={form.descEn}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  descEn: clampLength(value, campaignLimits.description),
                }))
              }
              placeholder="Description (EN)"
            />
            <RichTextEditor
              value={form.descDe}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  descDe: clampLength(value, campaignLimits.description),
                }))
              }
              placeholder="Beschreibung (DE)"
            />
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Kapak Görseli</label>
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
                  onClick={handleRemoveSelectedImage}
                  className="font-semibold text-red-600 hover:underline"
                >
                  Görseli Kaldır
                </button>
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <input
              type="datetime-local"
              name="startsAt"
              value={form.startsAt}
              onChange={handleInput}
              className={inputClass}
            />
            <input
              type="datetime-local"
              name="endsAt"
              value={form.endsAt}
              onChange={handleInput}
              className={inputClass}
            />
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
            placeholder="Sıralama"
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
