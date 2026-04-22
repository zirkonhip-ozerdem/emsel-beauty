"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  getAdminCsrfToken,
  slugifyAdminText,
  unwrapAdminApiData,
  type AdminApiPayload,
} from "@/lib/admin/client-utils";

const inputClass =
  "w-full rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#f2d688]/50";
const textareaClass = `${inputClass} min-h-32 resize-y`;

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
  price: string | number;
  stock: number;
  currency: string;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
  galleries: ProductGallery[];
};

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [galleries, setGalleries] = useState<ProductGallery[]>([]);
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
    price: "0",
    stock: 0,
    currency: "TRY",
    isFeatured: false,
    isActive: true,
    sortOrder: 0,
  });

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
          price: String(product.price ?? "0"),
          stock: product.stock ?? 0,
          currency: product.currency ?? "TRY",
          isFeatured: product.isFeatured,
          isActive: product.isActive,
          sortOrder: product.sortOrder ?? 0,
        });
        setGalleries(
          (product.galleries ?? []).map((gallery) => ({
            imageUrl: gallery.imageUrl,
            imageAltTr: gallery.imageAltTr,
            imageAltEn: gallery.imageAltEn,
            imageAltDe: gallery.imageAltDe,
            sortOrder: gallery.sortOrder ?? 0,
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
          imageUrl: form.imageUrl || null,
          price: Number(form.price) || 0,
          stock: Number(form.stock) || 0,
          sortOrder: Number(form.sortOrder) || 0,
          galleries,
        }),
      );

      if (imageFile) {
        formData.append("imageUrl", imageFile);
      }

      const response = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: { "x-csrf-token": csrfToken },
        credentials: "include",
        body: formData,
      });

      if (!response.ok) throw new Error();

      router.push("/admin/products");
    } catch {
      alert("Ürün güncellenemedi.");
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
          <p className="mt-1 text-sm text-gray-500">Ürün bilgisini ve kapak görselini güncelleyin.</p>
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
            {saving ? "Güncelleniyor..." : "Güncelle"}
          </button>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Ürün Adı</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <input name="nameTr" value={form.nameTr} onChange={handleInput} className={inputClass} />
            <input name="nameEn" value={form.nameEn} onChange={handleInput} className={inputClass} />
            <input name="nameDe" value={form.nameDe} onChange={handleInput} className={inputClass} />
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">SEO URL</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <input name="slugTr" value={form.slugTr} onChange={handleInput} className={inputClass} />
            <input name="slugEn" value={form.slugEn} onChange={handleInput} className={inputClass} />
            <input name="slugDe" value={form.slugDe} onChange={handleInput} className={inputClass} />
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Kısa Açıklama</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <textarea name="shortDescriptionTr" value={form.shortDescriptionTr} onChange={handleInput} className={textareaClass} />
            <textarea name="shortDescriptionEn" value={form.shortDescriptionEn} onChange={handleInput} className={textareaClass} />
            <textarea name="shortDescriptionDe" value={form.shortDescriptionDe} onChange={handleInput} className={textareaClass} />
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Detay Açıklama</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <textarea name="descriptionTr" value={form.descriptionTr} onChange={handleInput} className={textareaClass} />
            <textarea name="descriptionEn" value={form.descriptionEn} onChange={handleInput} className={textareaClass} />
            <textarea name="descriptionDe" value={form.descriptionDe} onChange={handleInput} className={textareaClass} />
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Ürün Kapak Görseli</label>
            {form.imageUrl ? <img src={form.imageUrl} alt="" className="h-28 w-44 rounded-lg border object-cover" /> : null}
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
          <input type="number" name="price" min={0} step="0.01" value={form.price} onChange={handleInput} className={inputClass} />
          <input type="number" name="stock" min={0} value={form.stock} onChange={handleInput} className={inputClass} />
          <input name="currency" maxLength={3} value={form.currency} onChange={handleInput} className={inputClass} />
          <input type="number" name="sortOrder" min={0} value={form.sortOrder} onChange={handleInput} className={inputClass} />
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
