"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

type ProductGallery = {
  imageUrl: string | null;
  imageAltTr: string | null;
  imageAltEn: string | null;
  imageAltDe: string | null;
  sortOrder: number;
};

type Product = {
  nameTr: string;
  nameEn: string;
  nameDe: string;
  slugTr: string;
  slugEn: string;
  slugDe: string;
  shortDescriptionTr: string | null;
  shortDescriptionEn: string | null;
  shortDescriptionDe: string | null;
  descriptionTr: string;
  descriptionEn: string;
  descriptionDe: string;
  imageUrl: string | null;
  imageAltTr: string | null;
  imageAltEn: string | null;
  imageAltDe: string | null;
  isActive: boolean;
  showOnHomepage: boolean;
  sortOrder: number;
  galleries: ProductGallery[];
};

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

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
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
    imageUrl: "",
    imageAltTr: "",
    imageAltEn: "",
    imageAltDe: "",
    isActive: true,
    showOnHomepage: false,
    sortOrder: 0,
  });
  const [galleries, setGalleries] = useState<GalleryFormItem[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/admin/products/${id}`, {
          credentials: "include",
          cache: "no-store",
        });
        const payload = (await response.json()) as AdminApiPayload<Product>;
        const product = unwrapAdminApiData(payload);

        setForm({
          nameTr: product.nameTr,
          nameEn: product.nameEn,
          nameDe: product.nameDe,
          slugTr: product.slugTr,
          slugEn: product.slugEn,
          slugDe: product.slugDe,
          shortDescriptionTr: product.shortDescriptionTr ?? "",
          shortDescriptionEn: product.shortDescriptionEn ?? "",
          shortDescriptionDe: product.shortDescriptionDe ?? "",
          descriptionTr: product.descriptionTr,
          descriptionEn: product.descriptionEn,
          descriptionDe: product.descriptionDe,
          imageUrl: product.imageUrl ?? "",
          imageAltTr: product.imageAltTr ?? "",
          imageAltEn: product.imageAltEn ?? "",
          imageAltDe: product.imageAltDe ?? "",
          isActive: product.isActive,
          showOnHomepage: product.showOnHomepage ?? false,
          sortOrder: product.sortOrder ?? 0,
        });

        setGalleries(
          (product.galleries ?? []).map((gallery) => ({
            imageUrl: gallery.imageUrl,
            imageAltTr: gallery.imageAltTr ?? "",
            imageAltEn: gallery.imageAltEn ?? "",
            imageAltDe: gallery.imageAltDe ?? "",
            sortOrder: gallery.sortOrder ?? 0,
            file: null,
          })),
        );
      } catch {
        alert("Ürün bilgileri yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };

    void fetchProduct();
  }, [id]);

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
          imageUrl: form.imageUrl || null,
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

      const response = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: { "x-csrf-token": csrfToken },
        credentials: "include",
        body: formData,
      });

     if (!response.ok) {
  const payload = (await response.json().catch(() => null)) as {
    message?: string;
  } | null;

  throw new Error(payload?.message || "Ürün güncellenemedi.");
}

alert("Ürün başarıyla güncellendi.");

router.push("/admin/products");

    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Ürün güncellenemedi.";
      alert(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-sm text-gray-500">Ürün yükleniyor...</div>;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Ürün Düzenle</h1>
          <p className="mt-1 text-sm text-gray-500">
            Ürün içeriğini, kapak görselini ve galeri alanlarını düzenleyin.
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
            {saving ? "Güncelleniyor..." : "Güncelle"}
          </button>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
            Ürün Adı
            <RequiredFieldNote compact />
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <input name="nameTr" value={form.nameTr} onChange={handleInput} className={inputClass} />
            <input name="nameEn" value={form.nameEn} onChange={handleInput} className={inputClass} />
            <input name="nameDe" value={form.nameDe} onChange={handleInput} className={inputClass} />
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
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
            Detay Açıklama
            <RequiredFieldNote compact />
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <RichTextEditor value={form.descriptionTr} onChange={(value) => setForm((prev) => ({ ...prev, descriptionTr: value }))} minHeight={260} />
            <RichTextEditor value={form.descriptionEn} onChange={(value) => setForm((prev) => ({ ...prev, descriptionEn: value }))} minHeight={260} />
            <RichTextEditor value={form.descriptionDe} onChange={(value) => setForm((prev) => ({ ...prev, descriptionDe: value }))} minHeight={260} />
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Kapak Görseli</label>
            {form.imageUrl ? <img src={form.imageUrl} alt="" className="h-28 w-44 rounded-lg border object-cover" /> : null}
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
              <p className="mt-1 text-xs text-gray-500">Mevcut görselleri koruyabilir, yenilerini ekleyebilir veya kaldırabilirsin.</p>
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

                {item.imageUrl ? <img src={item.imageUrl} alt="" className="mb-4 h-24 w-36 rounded-lg border object-cover" /> : null}

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
                    className={inputClass}
                  />
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
                  <input value={item.imageAltTr} onChange={(event) => handleGalleryInput(index, "imageAltTr", event.target.value)} placeholder="Galeri alt metin TR" className={inputClass} />
                  <input value={item.imageAltEn} onChange={(event) => handleGalleryInput(index, "imageAltEn", event.target.value)} placeholder="Gallery alt text EN" className={inputClass} />
                  <input value={item.imageAltDe} onChange={(event) => handleGalleryInput(index, "imageAltDe", event.target.value)} placeholder="Gallery alt text DE" className={inputClass} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 flex flex-col gap-5 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <input type="number" name="sortOrder" min={0} value={form.sortOrder} onChange={handleInput} className={`${inputClass} sm:max-w-xs`} />

          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
              <input type="checkbox" name="showOnHomepage" checked={form.showOnHomepage} onChange={handleInput} className="h-4 w-4 accent-[#8a6e36]" />
              Anasayfa Urunlerinde Goster
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
