"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { RequiredFieldNote } from "@/components/admin/RequiredFieldNote";
import { getAdminCsrfToken } from "@/lib/admin/client-utils";

const inputClass =
  "w-full rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#f2d688]/50";
const textareaClass = `${inputClass} min-h-28 resize-y`;

export default function NewSiteSettingPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    siteName: "Emsel Beauty",
    siteSeoKeywords: "",
    siteSeoDescription: "",
    email: "",
    phoneNumber: "",
    wpNumber: "",
    addressTr: "",
    addressEn: "",
    addressDe: "",
    mapEmbedUrl: "",
    workingHoursTr: "",
    workingHoursEn: "",
    workingHoursDe: "",
    instagramUrl: "",
    facebookUrl: "",
    xUrl: "",
  });

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const csrfToken = await getAdminCsrfToken();
      const formData = new FormData();

      formData.append("payload", JSON.stringify(form));
      if (logoFile) formData.append("logoUrl", logoFile);
      if (faviconFile) formData.append("faviconUrl", faviconFile);

      const response = await fetch("/api/admin/site-settings", {
        method: "POST",
        headers: { "x-csrf-token": csrfToken },
        credentials: "include",
        body: formData,
      });

      if (!response.ok) throw new Error();

      router.push("/admin/site-settings");
    } catch {
      alert("Site ayarı oluşturulamadı.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Yeni Site Ayarı</h1>
          <p className="mt-1 text-sm text-gray-500">SEO, iletişim ve marka bilgilerini girin.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/site-settings" className="rounded-md border px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">Vazgeç</Link>
          <button type="button" onClick={handleSave} disabled={saving} className="rounded-md bg-[#8a6e36] px-5 py-2 text-sm font-semibold text-[#f9f8f4] hover:bg-[#725a2c] disabled:opacity-60">
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
            Temel Bilgiler
            <RequiredFieldNote compact />
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <input name="siteName" value={form.siteName} onChange={handleInput} placeholder="Site adı" className={inputClass} />
            <input name="siteSeoKeywords" value={form.siteSeoKeywords} onChange={handleInput} placeholder="SEO anahtar kelimeler" className={inputClass} />
            <input name="siteSeoDescription" value={form.siteSeoDescription} onChange={handleInput} placeholder="SEO açıklaması" className={inputClass} />
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">İletişim</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            <input name="email" value={form.email} onChange={handleInput} placeholder="E-posta" className={inputClass} />
            <input name="phoneNumber" value={form.phoneNumber} onChange={handleInput} placeholder="Telefon" className={inputClass} />
            <input name="wpNumber" value={form.wpNumber} onChange={handleInput} placeholder="WhatsApp" className={inputClass} />
            <input name="mapEmbedUrl" value={form.mapEmbedUrl} onChange={handleInput} placeholder="Google Maps embed URL" className={inputClass} />
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Adres ve Çalışma Saatleri</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <textarea name="addressTr" value={form.addressTr} onChange={handleInput} placeholder="Adres TR" className={textareaClass} />
            <textarea name="addressEn" value={form.addressEn} onChange={handleInput} placeholder="Address EN" className={textareaClass} />
            <textarea name="addressDe" value={form.addressDe} onChange={handleInput} placeholder="Adresse DE" className={textareaClass} />
            <input name="workingHoursTr" value={form.workingHoursTr} onChange={handleInput} placeholder="Çalışma saatleri TR" className={inputClass} />
            <input name="workingHoursEn" value={form.workingHoursEn} onChange={handleInput} placeholder="Working hours EN" className={inputClass} />
            <input name="workingHoursDe" value={form.workingHoursDe} onChange={handleInput} placeholder="Öffnungszeiten DE" className={inputClass} />
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-6 border-t pt-6 lg:grid-cols-2">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Logo</label>
            <input type="file" accept="image/*" onChange={(event) => setLogoFile(event.target.files?.[0] ?? null)} className="block w-full text-sm text-gray-800 file:mr-4 file:rounded-md file:border-0 file:bg-[#f2d688]/45 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#8a6e36]" />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Favicon</label>
            <input type="file" accept="image/*" onChange={(event) => setFaviconFile(event.target.files?.[0] ?? null)} className="block w-full text-sm text-gray-800 file:mr-4 file:rounded-md file:border-0 file:bg-[#f2d688]/45 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#8a6e36]" />
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Sosyal Medya</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <input name="instagramUrl" value={form.instagramUrl} onChange={handleInput} placeholder="Instagram URL" className={inputClass} />
            <input name="facebookUrl" value={form.facebookUrl} onChange={handleInput} placeholder="Facebook URL" className={inputClass} />
            <input name="xUrl" value={form.xUrl} onChange={handleInput} placeholder="X URL" className={inputClass} />
          </div>
        </section>
      </div>
    </div>
  );
}
