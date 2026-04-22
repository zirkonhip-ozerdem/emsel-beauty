"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { getAdminCsrfToken } from "@/lib/admin/client-utils";

const inputClass =
  "w-full rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#f2d688]/50";
const textareaClass = `${inputClass} min-h-40 resize-y`;

export default function NewWhoPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    titleTr: "",
    titleEn: "",
    titleDe: "",
    whoDescTr: "",
    whoDescEn: "",
    whoDescDe: "",
    sortOrder: 0,
    isActive: true,
  });

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = event.target;
    const checked =
      event.target instanceof HTMLInputElement ? event.target.checked : false;

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
          sortOrder: Number(form.sortOrder) || 0,
        }),
      );

      if (imageFile) {
        formData.append("imageUrl", imageFile);
      }

      const response = await fetch("/api/admin/who", {
        method: "POST",
        headers: { "x-csrf-token": csrfToken },
        credentials: "include",
        body: formData,
      });

      if (!response.ok) throw new Error();

      router.push("/admin/who");
    } catch {
      alert("Hikayemiz kaydı oluşturulamadı.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Yeni Hikayemiz Kaydı</h1>
          <p className="mt-1 text-sm text-gray-500">Kurumsal anlatımı üç dilde hazırlayın.</p>
        </div>

        <div className="flex gap-3">
          <Link href="/admin/who" className="rounded-md border px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
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
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Başlık</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <input name="titleTr" value={form.titleTr} onChange={handleInput} placeholder="Başlık TR" className={inputClass} />
            <input name="titleEn" value={form.titleEn} onChange={handleInput} placeholder="Title EN" className={inputClass} />
            <input name="titleDe" value={form.titleDe} onChange={handleInput} placeholder="Titel DE" className={inputClass} />
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">İçerik</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <textarea name="whoDescTr" value={form.whoDescTr} onChange={handleInput} placeholder="İçerik TR" className={textareaClass} />
            <textarea name="whoDescEn" value={form.whoDescEn} onChange={handleInput} placeholder="Content EN" className={textareaClass} />
            <textarea name="whoDescDe" value={form.whoDescDe} onChange={handleInput} placeholder="Inhalt DE" className={textareaClass} />
          </div>
        </section>

        <section className="mt-10 flex flex-col gap-6 border-t pt-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Görsel</label>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
              className="block w-full text-sm text-gray-800 file:mr-4 file:rounded-md file:border-0 file:bg-[#f2d688]/45 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#8a6e36]"
            />
          </div>

          <input type="number" name="sortOrder" min={0} value={form.sortOrder} onChange={handleInput} className={`${inputClass} lg:max-w-48`} />

          <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
            <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleInput} className="h-4 w-4 accent-[#8a6e36]" />
            Aktif
          </label>
        </section>
      </div>
    </div>
  );
}
