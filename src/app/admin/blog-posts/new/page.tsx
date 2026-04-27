"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import RichTextEditor from "@/components/admin/RichTextEditor";
import { getAdminCsrfToken, slugifyAdminText } from "@/lib/admin/client-utils";

const inputClass =
  "w-full rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#f2d688]/50";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    titleTr: "",
    titleEn: "",
    titleDe: "",
    seoUrlTr: "",
    seoUrlEn: "",
    seoUrlDe: "",
    metaTr: "",
    metaEn: "",
    metaDe: "",
    descriptionTr: "",
    descriptionEn: "",
    descriptionDe: "",
    bodyTr: "",
    bodyEn: "",
    bodyDe: "",
    imageUrl: "",
    imageAltTr: "",
    imageAltEn: "",
    imageAltDe: "",
    readTimeMin: 1,
    publishedAt: "",
    sortOrder: 0,
    status: true,
  });

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = event.target;
    const checked =
      event.target instanceof HTMLInputElement ? event.target.checked : false;

    if (name === "titleTr") {
      setForm((prev) => ({ ...prev, titleTr: value, seoUrlTr: slugifyAdminText(value) }));
      return;
    }

    if (name === "titleEn") {
      setForm((prev) => ({ ...prev, titleEn: value, seoUrlEn: slugifyAdminText(value) }));
      return;
    }

    if (name === "titleDe") {
      setForm((prev) => ({ ...prev, titleDe: value, seoUrlDe: slugifyAdminText(value) }));
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
          publishedAt: form.publishedAt || null,
          readTimeMin: Number(form.readTimeMin) || 1,
          sortOrder: Number(form.sortOrder) || 0,
          galleries: [],
        }),
      );

      if (imageFile) {
        formData.append("imageUrl", imageFile);
      }

      const response = await fetch("/api/admin/blog-posts", {
        method: "POST",
        headers: { "x-csrf-token": csrfToken },
        credentials: "include",
        body: formData,
      });

      if (!response.ok) throw new Error();

      router.push("/admin/blog-posts");
    } catch {
      alert("Blog yazısı oluşturulamadı. Kapak görseli ve zorunlu alanları kontrol edin.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Yeni Blog Yazısı</h1>
          <p className="mt-1 text-sm text-gray-500">Blog liste ve detay içeriğini üç dilde oluşturun.</p>
        </div>

        <div className="flex gap-3">
          <Link href="/admin/blog-posts" className="rounded-md border px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
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
            <input name="titleTr" value={form.titleTr} onChange={handleInput} placeholder="Başlık (TR)" className={inputClass} />
            <input name="titleEn" value={form.titleEn} onChange={handleInput} placeholder="Title (EN)" className={inputClass} />
            <input name="titleDe" value={form.titleDe} onChange={handleInput} placeholder="Titel (DE)" className={inputClass} />
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
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Kategori Etiketi</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <input name="metaTr" value={form.metaTr} onChange={handleInput} placeholder="Meta TR" className={inputClass} />
            <input name="metaEn" value={form.metaEn} onChange={handleInput} placeholder="Meta EN" className={inputClass} />
            <input name="metaDe" value={form.metaDe} onChange={handleInput} placeholder="Meta DE" className={inputClass} />
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Kart Açıklaması</h2>
          <div className="grid grid-cols-1 gap-6">
            <RichTextEditor value={form.descriptionTr} onChange={(value) => setForm((prev) => ({ ...prev, descriptionTr: value }))} />
            <RichTextEditor value={form.descriptionEn} onChange={(value) => setForm((prev) => ({ ...prev, descriptionEn: value }))} />
            <RichTextEditor value={form.descriptionDe} onChange={(value) => setForm((prev) => ({ ...prev, descriptionDe: value }))} />
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Makale İçeriği</h2>
          <div className="grid grid-cols-1 gap-6">
            <RichTextEditor value={form.bodyTr} onChange={(value) => setForm((prev) => ({ ...prev, bodyTr: value }))} minHeight={300} />
            <RichTextEditor value={form.bodyEn} onChange={(value) => setForm((prev) => ({ ...prev, bodyEn: value }))} minHeight={300} />
            <RichTextEditor value={form.bodyDe} onChange={(value) => setForm((prev) => ({ ...prev, bodyDe: value }))} minHeight={300} />
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Blog Kapak Görseli</label>
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

        <section className="mt-10 grid grid-cols-1 gap-6 border-t pt-6 sm:grid-cols-3">
          <div className="space-y-2">
            <label htmlFor="readTimeMin" className="text-xs font-semibold uppercase tracking-wide text-gray-700">
              Okuma Suresi
            </label>
            <input
              id="readTimeMin"
              type="number"
              name="readTimeMin"
              min={1}
              value={form.readTimeMin}
              onChange={handleInput}
              placeholder="Okuma suresi (dk)"
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="publishedAt" className="text-xs font-semibold uppercase tracking-wide text-gray-700">
              Yayin Tarihi
            </label>
            <input
              id="publishedAt"
              type="datetime-local"
              name="publishedAt"
              value={form.publishedAt}
              onChange={handleInput}
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="sortOrder" className="text-xs font-semibold uppercase tracking-wide text-gray-700">
              Siralama
            </label>
            <input
              id="sortOrder"
              type="number"
              name="sortOrder"
              min={0}
              value={form.sortOrder}
              onChange={handleInput}
              placeholder="Siralama degeri"
              className={inputClass}
            />
          </div>
        </section>

        <label className="mt-6 flex items-center gap-3 text-sm font-medium text-gray-700">
          <input type="checkbox" name="status" checked={form.status} onChange={handleInput} className="h-4 w-4 accent-[#8a6e36]" />
          Yayında
        </label>
      </div>
    </div>
  );
}
