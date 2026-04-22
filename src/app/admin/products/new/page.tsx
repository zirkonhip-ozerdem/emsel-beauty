"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { getAdminCsrfToken, slugifyAdminText } from "@/lib/admin/client-utils";

const inputClass =
  "w-full rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#f2d688]/50";
const textareaClass = `${inputClass} min-h-32 resize-y`;

export default function NewProductPage() {
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
    descriptionTr: "",
    descriptionEn: "",
    descriptionDe: "",
    imageAltTr: "",
    imageAltEn: "",
    imageAltDe: "",
    price: "0",
    stock: 0,
    currency: "TRY",
    isFeatured: false,
    isActive: true,
    sortOrder: 0,
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

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
          price: Number(form.price) || 0,
          stock: Number(form.stock) || 0,
          sortOrder: Number(form.sortOrder) || 0,
          galleries: [],
        }),
      );

      if (imageFile) {
        formData.append("imageUrl", imageFile);
      }

      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "x-csrf-token": csrfToken },
        credentials: "include",
        body: formData,
      });

      if (!response.ok) throw new Error();

      router.push("/admin/products");
    } catch {
      alert("Ürün oluşturulamadı.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Yeni Ürün</h1>
          <p className="mt-1 text-sm text-gray-500">Ürün bilgilerini üç dilde hazırlayın.</p>
        </div>

        <div className="flex gap-3">
          <Link href="/admin/products" className="rounded-md border px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
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
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <textarea name="shortDescriptionTr" value={form.shortDescriptionTr} onChange={handleInput} placeholder="Kısa açıklama (TR)" className={textareaClass} />
            <textarea name="shortDescriptionEn" value={form.shortDescriptionEn} onChange={handleInput} placeholder="Short description (EN)" className={textareaClass} />
            <textarea name="shortDescriptionDe" value={form.shortDescriptionDe} onChange={handleInput} placeholder="Kurzbeschreibung (DE)" className={textareaClass} />
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Detay Açıklama</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <textarea name="descriptionTr" value={form.descriptionTr} onChange={handleInput} placeholder="Detay açıklama (TR)" className={textareaClass} />
            <textarea name="descriptionEn" value={form.descriptionEn} onChange={handleInput} placeholder="Description (EN)" className={textareaClass} />
            <textarea name="descriptionDe" value={form.descriptionDe} onChange={handleInput} placeholder="Beschreibung (DE)" className={textareaClass} />
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Ürün Kapak Görseli</label>
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

        <section className="mt-10 grid grid-cols-1 gap-6 border-t pt-6 sm:grid-cols-4">
          <input type="number" name="price" min={0} step="0.01" value={form.price} onChange={handleInput} placeholder="Fiyat" className={inputClass} />
          <input type="number" name="stock" min={0} value={form.stock} onChange={handleInput} placeholder="Stok" className={inputClass} />
          <input name="currency" maxLength={3} value={form.currency} onChange={handleInput} placeholder="TRY" className={inputClass} />
          <input type="number" name="sortOrder" min={0} value={form.sortOrder} onChange={handleInput} placeholder="Sıralama" className={inputClass} />
        </section>

        <section className="mt-6 flex flex-wrap gap-6">
          <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
            <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleInput} className="h-4 w-4 accent-[#8a6e36]" />
            Öne çıkan ürün
          </label>
          <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
            <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleInput} className="h-4 w-4 accent-[#8a6e36]" />
            Yayında
          </label>
        </section>
      </div>
    </div>
  );
}
