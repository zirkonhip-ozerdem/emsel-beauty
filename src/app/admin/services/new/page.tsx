"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { RequiredFieldNote } from "@/components/admin/RequiredFieldNote";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { getAdminCsrfToken, slugifyAdminText } from "@/lib/admin/client-utils";

const inputClass =
  "w-full rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#f2d688]/50";

export default function NewServicePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    nameTr: "",
    nameEn: "",
    nameDe: "",
    slugTr: "",
    slugEn: "",
    slugDe: "",
    shortDescriptionTr: "",
    shortDescriptionEn: "",
    shortDescriptionDe: "",
    longDescriptionTr: "",
    longDescriptionEn: "",
    longDescriptionDe: "",
    badgeTr: "",
    badgeEn: "",
    badgeDe: "",
    sessionsLabelTr: "",
    sessionsLabelEn: "",
    sessionsLabelDe: "",
    durationMinutes: 0,
    imageAltTr: "",
    imageAltEn: "",
    imageAltDe: "",
    sortOrder: 0,
    isActive: true,
    showOnHomepage: false,
  });

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = event.target;
    const checked =
      event.target instanceof HTMLInputElement ? event.target.checked : false;

    if (name === "nameTr") {
      setForm((prev) => ({ ...prev, nameTr: value, slugTr: slugifyAdminText(value) }));
      return;
    }

    if (name === "nameEn") {
      setForm((prev) => ({ ...prev, nameEn: value, slugEn: slugifyAdminText(value) }));
      return;
    }

    if (name === "nameDe") {
      setForm((prev) => ({ ...prev, nameDe: value, slugDe: slugifyAdminText(value) }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
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
          durationMinutes: Number(form.durationMinutes) || 0,
          sortOrder: Number(form.sortOrder) || 0,
          galleries: [],
          features: [],
          processSteps: [],
          faqs: [],
        }),
      );

      if (imageFile) {
        formData.append("imageUrl", imageFile);
      }

      const response = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "x-csrf-token": csrfToken },
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as {
          message?: string;
        } | null;
        throw new Error(payload?.message || "Hizmet oluşturulamadı.");
      }

      alert("Hizmet başarıyla oluşturuldu.");

      router.push("/admin/services");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Hizmet oluşturulamadı.";
      alert(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Yeni Hizmet</h1>
          <p className="mt-1 text-sm text-gray-500">Hizmet içeriklerini üç dilde hazırlayın.</p>
        </div>

        <div className="flex gap-3">
          <Link href="/admin/services" className="rounded-md border px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
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
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
            Hizmet Adı
            <RequiredFieldNote compact />
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <input name="nameTr" value={form.nameTr} onChange={handleInput} placeholder="Hizmet adı (TR)" className={inputClass} />
            <input name="nameEn" value={form.nameEn} onChange={handleInput} placeholder="Service name (EN)" className={inputClass} />
            <input name="nameDe" value={form.nameDe} onChange={handleInput} placeholder="Servicename (DE)" className={inputClass} />
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
            SEO URL
            <RequiredFieldNote compact />
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <input name="slugTr" value={form.slugTr} onChange={handleInput} className={inputClass} />
            <input name="slugEn" value={form.slugEn} onChange={handleInput} className={inputClass} />
            <input name="slugDe" value={form.slugDe} onChange={handleInput} className={inputClass} />
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Kısa Açıklama</h2>
          <div className="grid grid-cols-1 gap-6">
            <RichTextEditor value={form.shortDescriptionTr} onChange={(value) => setForm((prev) => ({ ...prev, shortDescriptionTr: value }))} />
            <RichTextEditor value={form.shortDescriptionEn} onChange={(value) => setForm((prev) => ({ ...prev, shortDescriptionEn: value }))} />
            <RichTextEditor value={form.shortDescriptionDe} onChange={(value) => setForm((prev) => ({ ...prev, shortDescriptionDe: value }))} />
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Uzun Açıklama</h2>
          <div className="grid grid-cols-1 gap-6">
            <RichTextEditor value={form.longDescriptionTr} onChange={(value) => setForm((prev) => ({ ...prev, longDescriptionTr: value }))} minHeight={260} />
            <RichTextEditor value={form.longDescriptionEn} onChange={(value) => setForm((prev) => ({ ...prev, longDescriptionEn: value }))} minHeight={260} />
            <RichTextEditor value={form.longDescriptionDe} onChange={(value) => setForm((prev) => ({ ...prev, longDescriptionDe: value }))} minHeight={260} />
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Hizmet Kapak Görseli</label>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
              className="block w-full text-sm text-gray-800 file:mr-4 file:rounded-md file:border-0 file:bg-[#f2d688]/45 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#8a6e36]"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <input name="imageAltTr" value={form.imageAltTr} onChange={handleInput} placeholder="Alt metin TR" className={inputClass} />
            <input name="imageAltEn" value={form.imageAltEn} onChange={handleInput} placeholder="Alt text EN" className={inputClass} />
            <input name="imageAltDe" value={form.imageAltDe} onChange={handleInput} placeholder="Alt text DE" className={inputClass} />
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Rozet ve Seans Bilgisi</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <input name="badgeTr" value={form.badgeTr} onChange={handleInput} placeholder="Rozet TR" className={inputClass} />
            <input name="badgeEn" value={form.badgeEn} onChange={handleInput} placeholder="Badge EN" className={inputClass} />
            <input name="badgeDe" value={form.badgeDe} onChange={handleInput} placeholder="Badge DE" className={inputClass} />
            <input name="sessionsLabelTr" value={form.sessionsLabelTr} onChange={handleInput} placeholder="Seans etiketi TR" className={inputClass} />
            <input name="sessionsLabelEn" value={form.sessionsLabelEn} onChange={handleInput} placeholder="Session label EN" className={inputClass} />
            <input name="sessionsLabelDe" value={form.sessionsLabelDe} onChange={handleInput} placeholder="Session label DE" className={inputClass} />
          </div>
        </section>

        <section className="mt-10 flex flex-col gap-5 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="grid w-full grid-cols-1 gap-4 sm:max-w-md sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="durationMinutes" className="text-xs font-semibold uppercase tracking-wide text-gray-700">
                Hizmet Suresi
                <RequiredFieldNote compact />
              </label>
              <input id="durationMinutes" type="number" name="durationMinutes" min={0} value={form.durationMinutes} onChange={handleInput} placeholder="Hizmet suresi (dk)" className={inputClass} />
            </div>
            <div className="space-y-2">
              <label htmlFor="sortOrder" className="text-xs font-semibold uppercase tracking-wide text-gray-700">
                Siralama
              </label>
              <input id="sortOrder" type="number" name="sortOrder" min={0} value={form.sortOrder} onChange={handleInput} placeholder="Siralama degeri" className={inputClass} />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
              <input type="checkbox" name="showOnHomepage" checked={form.showOnHomepage} onChange={handleInput} className="h-4 w-4 accent-[#8a6e36]" />
              Anasayfa Imza Bakimlarinda Goster
            </label>
            <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
              <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleInput} className="h-4 w-4 accent-[#8a6e36]" />
              Yayinda
            </label>
          </div>
        </section>
      </div>
    </div>
  );
}
