"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  getAdminCsrfToken,
  unwrapAdminApiData,
  type AdminApiPayload,
} from "@/lib/admin/client-utils";

const inputClass =
  "w-full rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#f2d688]/50";
const textareaClass = `${inputClass} min-h-28 resize-y`;

type SiteSetting = {
  siteName: string;
  siteSeoKeywords: string;
  siteSeoDescription: string;
  email: string | null;
  phoneNumber: string | null;
  wpNumber: string | null;
  addressTr: string | null;
  addressEn: string | null;
  addressDe: string | null;
  mapEmbedUrl: string | null;
  workingHoursTr: string | null;
  workingHoursEn: string | null;
  workingHoursDe: string | null;
  logoUrl: string | null;
  faviconUrl: string | null;
  instagramUrl: string | null;
  facebookUrl: string | null;
  xUrl: string | null;
};

export default function EditSiteSettingPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    siteName: "",
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
    logoUrl: "",
    faviconUrl: "",
    instagramUrl: "",
    facebookUrl: "",
    xUrl: "",
  });

  useEffect(() => {
    const fetchSetting = async () => {
      try {
        const response = await fetch(`/api/admin/site-settings/${id}`, {
          credentials: "include",
          cache: "no-store",
        });
        const payload = (await response.json()) as AdminApiPayload<SiteSetting>;
        const setting = unwrapAdminApiData(payload);

        setForm({
          siteName: setting.siteName,
          siteSeoKeywords: setting.siteSeoKeywords,
          siteSeoDescription: setting.siteSeoDescription,
          email: setting.email ?? "",
          phoneNumber: setting.phoneNumber ?? "",
          wpNumber: setting.wpNumber ?? "",
          addressTr: setting.addressTr ?? "",
          addressEn: setting.addressEn ?? "",
          addressDe: setting.addressDe ?? "",
          mapEmbedUrl: setting.mapEmbedUrl ?? "",
          workingHoursTr: setting.workingHoursTr ?? "",
          workingHoursEn: setting.workingHoursEn ?? "",
          workingHoursDe: setting.workingHoursDe ?? "",
          logoUrl: setting.logoUrl ?? "",
          faviconUrl: setting.faviconUrl ?? "",
          instagramUrl: setting.instagramUrl ?? "",
          facebookUrl: setting.facebookUrl ?? "",
          xUrl: setting.xUrl ?? "",
        });
      } catch {
        alert("Site ayarı yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };

    void fetchSetting();
  }, [id]);

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

      formData.append(
        "payload",
        JSON.stringify({
          ...form,
          logoUrl: form.logoUrl || null,
          faviconUrl: form.faviconUrl || null,
        }),
      );
      if (logoFile) formData.append("logoUrl", logoFile);
      if (faviconFile) formData.append("faviconUrl", faviconFile);

      const response = await fetch(`/api/admin/site-settings/${id}`, {
        method: "PUT",
        headers: { "x-csrf-token": csrfToken },
        credentials: "include",
        body: formData,
      });

      if (!response.ok) throw new Error();

      router.push("/admin/site-settings");
    } catch {
      alert("Site ayarı güncellenemedi.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-sm text-gray-500">Site ayarı yükleniyor...</div>;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Site Ayarı Düzenle</h1>
          <p className="mt-1 text-sm text-gray-500">SEO, iletişim ve marka bilgilerini güncelleyin.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/site-settings" className="rounded-md border px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">Vazgeç</Link>
          <button type="button" onClick={handleSave} disabled={saving} className="rounded-md bg-[#8a6e36] px-5 py-2 text-sm font-semibold text-[#f9f8f4] hover:bg-[#725a2c] disabled:opacity-60">
            {saving ? "Güncelleniyor..." : "Güncelle"}
          </button>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Temel Bilgiler</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <input name="siteName" value={form.siteName} onChange={handleInput} className={inputClass} />
            <input name="siteSeoKeywords" value={form.siteSeoKeywords} onChange={handleInput} className={inputClass} />
            <input name="siteSeoDescription" value={form.siteSeoDescription} onChange={handleInput} className={inputClass} />
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">İletişim</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            <input name="email" value={form.email} onChange={handleInput} className={inputClass} />
            <input name="phoneNumber" value={form.phoneNumber} onChange={handleInput} className={inputClass} />
            <input name="wpNumber" value={form.wpNumber} onChange={handleInput} className={inputClass} />
            <input name="mapEmbedUrl" value={form.mapEmbedUrl} onChange={handleInput} className={inputClass} />
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Adres ve Çalışma Saatleri</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <textarea name="addressTr" value={form.addressTr} onChange={handleInput} className={textareaClass} />
            <textarea name="addressEn" value={form.addressEn} onChange={handleInput} className={textareaClass} />
            <textarea name="addressDe" value={form.addressDe} onChange={handleInput} className={textareaClass} />
            <input name="workingHoursTr" value={form.workingHoursTr} onChange={handleInput} className={inputClass} />
            <input name="workingHoursEn" value={form.workingHoursEn} onChange={handleInput} className={inputClass} />
            <input name="workingHoursDe" value={form.workingHoursDe} onChange={handleInput} className={inputClass} />
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-6 border-t pt-6 lg:grid-cols-2">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Logo</label>
            {form.logoUrl ? <img src={form.logoUrl} alt="" className="h-16 w-28 rounded-lg border object-contain" /> : null}
            <input type="file" accept="image/*" onChange={(event) => setLogoFile(event.target.files?.[0] ?? null)} className="block w-full text-sm text-gray-800 file:mr-4 file:rounded-md file:border-0 file:bg-[#f2d688]/45 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#8a6e36]" />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Favicon</label>
            {form.faviconUrl ? <img src={form.faviconUrl} alt="" className="h-16 w-16 rounded-lg border object-contain" /> : null}
            <input type="file" accept="image/*" onChange={(event) => setFaviconFile(event.target.files?.[0] ?? null)} className="block w-full text-sm text-gray-800 file:mr-4 file:rounded-md file:border-0 file:bg-[#f2d688]/45 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#8a6e36]" />
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Sosyal Medya</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <input name="instagramUrl" value={form.instagramUrl} onChange={handleInput} className={inputClass} />
            <input name="facebookUrl" value={form.facebookUrl} onChange={handleInput} className={inputClass} />
            <input name="xUrl" value={form.xUrl} onChange={handleInput} className={inputClass} />
          </div>
        </section>
      </div>
    </div>
  );
}
