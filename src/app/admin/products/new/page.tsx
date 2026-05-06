"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import RichTextEditor from "@/components/admin/RichTextEditor";
import { getAdminCsrfToken, slugifyAdminText } from "@/lib/admin/client-utils";

const inputClass =
  "w-full rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#f2d688]/50";

type GalleryFormItem = {
  imageUrl: string | null;
  imageAltTr: string;
  imageAltEn: string;
  imageAltDe: string;
  sortOrder: number;
  file: File | null;
};

const emptyGalleryItem = (): GalleryFormItem => ({
  imageUrl: null,
  imageAltTr: "",
  imageAltEn: "",
  imageAltDe: "",
  sortOrder: 0,
  file: null,
});

export default function NewProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [coverFile, setCoverFile] = useState<File | null>(null);
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
    descriptionTr: "",
    descriptionEn: "",
    descriptionDe: "",
    imageAltTr: "",
    imageAltEn: "",
    imageAltDe: "",
    isActive: true,
    sortOrder: 0,
  });
  const [galleries, setGalleries] = useState<GalleryFormItem[]>([]);

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = event.target;
    const checked =
      event.target instanceof HTMLInputElement ? event.target.checked : false;

    if (name === "nameTr") {
      setForm((prev) => ({
        ...prev,
        nameTr: value,
        slugTr: slugifyAdminText(value),
      }));
      return;
    }

    if (name === "nameEn") {
      setForm((prev) => ({
        ...prev,
        nameEn: value,
        slugEn: slugifyAdminText(value),
      }));
      return;
    }

    if (name === "nameDe") {
      setForm((prev) => ({
        ...prev,
        nameDe: value,
        slugDe: slugifyAdminText(value),
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGalleryInput = (
    index: number,
    field: keyof GalleryFormItem,
    value: string | number | File | null,
  ) => {
    setGalleries((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    );
  };

  const addGalleryItem = () => {
    setGalleries((prev) => [...prev, emptyGalleryItem()]);
  };

  const removeGalleryItem = (index: number) => {
    setGalleries((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
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
          galleries: galleries.map((item) => ({
            imageUrl: item.imageUrl,
            imageAltTr: item.imageAltTr || null,
            imageAltEn: item.imageAltEn || null,
            imageAltDe: item.imageAltDe || null,
            sortOrder: Number(item.sortOrder) || 0,
          })),
        }),
      );

      if (coverFile) {
        formData.append("imageUrl", coverFile);
      }

      galleries.forEach((item, index) => {
        if (item.file) {
          formData.append(`galleries.${index}.imageUrl`, item.file);
        }
      });

      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "x-csrf-token": csrfToken },
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as {
          message?: string;
        } | null;
        throw new Error(payload?.message || "Ürün oluşturulamadı.");
      }

      router.push("/admin/products");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Ürün oluşturulamadı.";
      alert(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Yeni Ürün</h1>
          <p className="mt-1 text-sm text-gray-500">
            Ürün içeriğini üç dilde oluşturun. SEO URL alanları ürün adına göre otomatik dolar.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/admin/products"
            className="rounded-md border px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
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
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Ürün Adı</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <input name="nameTr" value={form.nameTr} onChange={handleInput} placeholder="Ürün adı (TR)" className={inputClass} />
            <input name="nameEn" value={form.nameEn} onChange={handleInput} placeholder="Product name (EN)" className={inputClass} />
            <input name="nameDe" value={form.nameDe} onChange={handleInput} placeholder="Produktname (DE)" className={inputClass} />
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">SEO URL</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <input name="slugTr" value={form.slugTr} onChange={handleInput} placeholder="urun-seo-url" className={inputClass} />
            <input name="slugEn" value={form.slugEn} onChange={handleInput} placeholder="product-seo-url" className={inputClass} />
            <input name="slugDe" value={form.slugDe} onChange={handleInput} placeholder="produkt-seo-url" className={inputClass} />
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Kısa Açıklama</h2>
          <div className="grid grid-cols-1 gap-6">
            <RichTextEditor value={form.shortDescriptionTr} onChange={(value) => setForm((prev) => ({ ...prev, shortDescriptionTr: value }))} placeholder="Kisa aciklama (TR)" />
            <RichTextEditor value={form.shortDescriptionEn} onChange={(value) => setForm((prev) => ({ ...prev, shortDescriptionEn: value }))} placeholder="Short description (EN)" />
            <RichTextEditor value={form.shortDescriptionDe} onChange={(value) => setForm((prev) => ({ ...prev, shortDescriptionDe: value }))} placeholder="Kurzbeschreibung (DE)" />
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Detay Açıklama</h2>
          <div className="grid grid-cols-1 gap-6">
            <RichTextEditor value={form.descriptionTr} onChange={(value) => setForm((prev) => ({ ...prev, descriptionTr: value }))} minHeight={260} placeholder="Detay aciklama (TR)" />
            <RichTextEditor value={form.descriptionEn} onChange={(value) => setForm((prev) => ({ ...prev, descriptionEn: value }))} minHeight={260} placeholder="Description (EN)" />
            <RichTextEditor value={form.descriptionDe} onChange={(value) => setForm((prev) => ({ ...prev, descriptionDe: value }))} minHeight={260} placeholder="Beschreibung (DE)" />
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Kapak Görseli</label>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setCoverFile(event.target.files?.[0] ?? null)}
              className="block w-full text-sm text-gray-800 file:mr-4 file:rounded-md file:border-0 file:bg-[#f2d688]/45 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#8a6e36]"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <input name="imageAltTr" value={form.imageAltTr} onChange={handleInput} placeholder="Kapak alt metin TR" className={inputClass} />
            <input name="imageAltEn" value={form.imageAltEn} onChange={handleInput} placeholder="Cover alt text EN" className={inputClass} />
            <input name="imageAltDe" value={form.imageAltDe} onChange={handleInput} placeholder="Cover alt text DE" className={inputClass} />
          </div>
        </section>

        <section className="mt-10 space-y-4 border-t pt-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Galeri Görselleri</h2>
              <p className="mt-1 text-xs text-gray-500">İstersen ek ürün görselleri de ekleyebilirsin.</p>
            </div>
            <button
              type="button"
              onClick={addGalleryItem}
              className="rounded-md border border-[#c5a059] px-4 py-2 text-sm font-medium text-[#8a6e36] hover:bg-[#f9f5ea]"
            >
              + Galeri Ekle
            </button>
          </div>

          <div className="space-y-5">
            {galleries.map((item, index) => (
              <div key={index} className="rounded-xl border border-dashed border-gray-200 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-700">Galeri #{index + 1}</p>
                  <button type="button" onClick={() => removeGalleryItem(index)} className="text-sm text-red-600 hover:underline">
                    Kaldır
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleGalleryInput(index, "file", event.target.files?.[0] ?? null)}
                    className="block w-full text-sm text-gray-800 file:mr-4 file:rounded-md file:border-0 file:bg-[#f2d688]/45 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#8a6e36]"
                  />
                  <input
                    type="number"
                    min={0}
                    value={item.sortOrder}
                    onChange={(event) => handleGalleryInput(index, "sortOrder", Number(event.target.value))}
                    placeholder="Sıralama"
                    className={inputClass}
                  />
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
                  <input
                    value={item.imageAltTr}
                    onChange={(event) => handleGalleryInput(index, "imageAltTr", event.target.value)}
                    placeholder="Galeri alt metin TR"
                    className={inputClass}
                  />
                  <input
                    value={item.imageAltEn}
                    onChange={(event) => handleGalleryInput(index, "imageAltEn", event.target.value)}
                    placeholder="Gallery alt text EN"
                    className={inputClass}
                  />
                  <input
                    value={item.imageAltDe}
                    onChange={(event) => handleGalleryInput(index, "imageAltDe", event.target.value)}
                    placeholder="Gallery alt text DE"
                    className={inputClass}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 flex flex-col gap-5 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <input type="number" name="sortOrder" min={0} value={form.sortOrder} onChange={handleInput} placeholder="Sıralama" className={`${inputClass} sm:max-w-xs`} />

          <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
            <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleInput} className="h-4 w-4 accent-[#8a6e36]" />
            Yayında
          </label>
        </section>
      </div>
    </div>
  );
}
