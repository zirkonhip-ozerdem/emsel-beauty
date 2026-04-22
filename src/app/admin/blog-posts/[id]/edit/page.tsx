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

type BlogGallery = {
  imageUrl: string | null;
  imageAltTr: string | null;
  imageAltEn: string | null;
  imageAltDe: string | null;
  sortOrder: number;
};

type BlogPost = {
  titleTr: string;
  titleEn: string;
  titleDe: string;
  seoUrlTr: string;
  seoUrlEn: string;
  seoUrlDe: string;
  metaTr: string | null;
  metaEn: string | null;
  metaDe: string | null;
  descriptionTr: string;
  descriptionEn: string;
  descriptionDe: string;
  bodyTr: string | null;
  bodyEn: string | null;
  bodyDe: string | null;
  imageUrl: string;
  imageAltTr: string | null;
  imageAltEn: string | null;
  imageAltDe: string | null;
  readTimeMin: number;
  publishedAt: string | null;
  status: boolean;
  sortOrder: number;
  galleries: BlogGallery[];
};

function toDateTimeInput(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 16);
}

export default function EditBlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [galleries, setGalleries] = useState<BlogGallery[]>([]);
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

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/admin/blog-posts/${id}`, {
          credentials: "include",
          cache: "no-store",
        });
        const payload = (await response.json()) as AdminApiPayload<BlogPost>;
        const post = unwrapAdminApiData(payload);

        setForm({
          titleTr: post.titleTr,
          titleEn: post.titleEn,
          titleDe: post.titleDe,
          seoUrlTr: post.seoUrlTr,
          seoUrlEn: post.seoUrlEn,
          seoUrlDe: post.seoUrlDe,
          metaTr: post.metaTr ?? "",
          metaEn: post.metaEn ?? "",
          metaDe: post.metaDe ?? "",
          descriptionTr: post.descriptionTr,
          descriptionEn: post.descriptionEn,
          descriptionDe: post.descriptionDe,
          bodyTr: post.bodyTr ?? "",
          bodyEn: post.bodyEn ?? "",
          bodyDe: post.bodyDe ?? "",
          imageUrl: post.imageUrl,
          imageAltTr: post.imageAltTr ?? "",
          imageAltEn: post.imageAltEn ?? "",
          imageAltDe: post.imageAltDe ?? "",
          readTimeMin: post.readTimeMin ?? 1,
          publishedAt: toDateTimeInput(post.publishedAt),
          sortOrder: post.sortOrder ?? 0,
          status: post.status,
        });
        setGalleries(
          (post.galleries ?? []).map((gallery) => ({
            imageUrl: gallery.imageUrl,
            imageAltTr: gallery.imageAltTr,
            imageAltEn: gallery.imageAltEn,
            imageAltDe: gallery.imageAltDe,
            sortOrder: gallery.sortOrder ?? 0,
          })),
        );
      } catch {
        alert("Blog yazısı yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };

    void fetchPost();
  }, [id]);

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
          galleries,
        }),
      );

      if (imageFile) {
        formData.append("imageUrl", imageFile);
      }

      const response = await fetch(`/api/admin/blog-posts/${id}`, {
        method: "PUT",
        headers: { "x-csrf-token": csrfToken },
        credentials: "include",
        body: formData,
      });

      if (!response.ok) throw new Error();

      router.push("/admin/blog-posts");
    } catch {
      alert("Blog yazısı güncellenemedi.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-sm text-gray-500">Blog yazısı yükleniyor...</div>;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Blog Yazısı Düzenle</h1>
          <p className="mt-1 text-sm text-gray-500">Blog metinlerini, kapak görselini ve yayın durumunu düzenleyin.</p>
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
            {saving ? "Güncelleniyor..." : "Güncelle"}
          </button>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Başlık</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <input name="titleTr" value={form.titleTr} onChange={handleInput} className={inputClass} />
            <input name="titleEn" value={form.titleEn} onChange={handleInput} className={inputClass} />
            <input name="titleDe" value={form.titleDe} onChange={handleInput} className={inputClass} />
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
            <input name="metaTr" value={form.metaTr} onChange={handleInput} className={inputClass} />
            <input name="metaEn" value={form.metaEn} onChange={handleInput} className={inputClass} />
            <input name="metaDe" value={form.metaDe} onChange={handleInput} className={inputClass} />
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Kart Açıklaması</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <textarea name="descriptionTr" value={form.descriptionTr} onChange={handleInput} className={textareaClass} />
            <textarea name="descriptionEn" value={form.descriptionEn} onChange={handleInput} className={textareaClass} />
            <textarea name="descriptionDe" value={form.descriptionDe} onChange={handleInput} className={textareaClass} />
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Makale İçeriği</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <textarea name="bodyTr" value={form.bodyTr} onChange={handleInput} className={`${textareaClass} min-h-52`} />
            <textarea name="bodyEn" value={form.bodyEn} onChange={handleInput} className={`${textareaClass} min-h-52`} />
            <textarea name="bodyDe" value={form.bodyDe} onChange={handleInput} className={`${textareaClass} min-h-52`} />
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Blog Kapak Görseli</label>
            {form.imageUrl ? <img src={form.imageUrl} alt="" className="h-28 w-44 rounded-lg border object-cover" /> : null}
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
              className="block w-full text-sm text-gray-800 file:mr-4 file:rounded-md file:border-0 file:bg-[#f2d688]/45 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#8a6e36]"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <input name="imageAltTr" value={form.imageAltTr} onChange={handleInput} className={inputClass} />
            <input name="imageAltEn" value={form.imageAltEn} onChange={handleInput} className={inputClass} />
            <input name="imageAltDe" value={form.imageAltDe} onChange={handleInput} className={inputClass} />
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-6 border-t pt-6 sm:grid-cols-3">
          <input type="number" name="readTimeMin" min={1} value={form.readTimeMin} onChange={handleInput} className={inputClass} />
          <input type="datetime-local" name="publishedAt" value={form.publishedAt} onChange={handleInput} className={inputClass} />
          <input type="number" name="sortOrder" min={0} value={form.sortOrder} onChange={handleInput} className={inputClass} />
        </section>

        <label className="mt-6 flex items-center gap-3 text-sm font-medium text-gray-700">
          <input type="checkbox" name="status" checked={form.status} onChange={handleInput} className="h-4 w-4 accent-[#8a6e36]" />
          Yayında
        </label>
      </div>
    </div>
  );
}
