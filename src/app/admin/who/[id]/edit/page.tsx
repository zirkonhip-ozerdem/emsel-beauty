"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import RichTextEditor from "@/components/admin/RichTextEditor";
import {
  getAdminCsrfToken,
  unwrapAdminApiData,
  type AdminApiPayload,
} from "@/lib/admin/client-utils";

const inputClass =
  "w-full rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#f2d688]/50";

type WhoSection = {
  titleTr: string | null;
  titleEn: string | null;
  titleDe: string | null;
  whoDescTr: string | null;
  whoDescEn: string | null;
  whoDescDe: string | null;
  imageUrl: string | null;
  sortOrder: number;
  isActive: boolean;
};

export default function EditWhoPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    titleTr: "",
    titleEn: "",
    titleDe: "",
    whoDescTr: "",
    whoDescEn: "",
    whoDescDe: "",
    imageUrl: "",
    sortOrder: 0,
    isActive: true,
  });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/admin/who/${id}`, {
          credentials: "include",
          cache: "no-store",
        });
        const payload = (await response.json()) as AdminApiPayload<WhoSection>;
        const item = unwrapAdminApiData(payload);

        setForm({
          titleTr: item.titleTr ?? "",
          titleEn: item.titleEn ?? "",
          titleDe: item.titleDe ?? "",
          whoDescTr: item.whoDescTr ?? "",
          whoDescEn: item.whoDescEn ?? "",
          whoDescDe: item.whoDescDe ?? "",
          imageUrl: item.imageUrl ?? "",
          sortOrder: item.sortOrder ?? 0,
          isActive: item.isActive,
        });
      } catch {
        alert("Hikayemiz kaydı yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };

    void fetchItem();
  }, [id]);

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
          imageUrl: form.imageUrl || null,
          sortOrder: Number(form.sortOrder) || 0,
        }),
      );

      if (imageFile) {
        formData.append("imageUrl", imageFile);
      }

      const response = await fetch(`/api/admin/who/${id}`, {
        method: "PUT",
        headers: { "x-csrf-token": csrfToken },
        credentials: "include",
        body: formData,
      });

      if (!response.ok) throw new Error();

      router.push("/admin/who");
    } catch {
      alert("Hikayemiz kaydı güncellenemedi.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-sm text-gray-500">Kayıt yükleniyor...</div>;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Hikayemiz Düzenle</h1>
          <p className="mt-1 text-sm text-gray-500">Kurumsal anlatım metnini güncelleyin.</p>
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
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">İçerik</h2>
          <div className="grid grid-cols-1 gap-6">
            <RichTextEditor value={form.whoDescTr} onChange={(value) => setForm((prev) => ({ ...prev, whoDescTr: value }))} minHeight={260} />
            <RichTextEditor value={form.whoDescEn} onChange={(value) => setForm((prev) => ({ ...prev, whoDescEn: value }))} minHeight={260} />
            <RichTextEditor value={form.whoDescDe} onChange={(value) => setForm((prev) => ({ ...prev, whoDescDe: value }))} minHeight={260} />
          </div>
        </section>

        <section className="mt-10 flex flex-col gap-6 border-t pt-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Görsel</label>
            {form.imageUrl ? <img src={form.imageUrl} alt="" className="h-28 w-44 rounded-lg border object-cover" /> : null}
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
