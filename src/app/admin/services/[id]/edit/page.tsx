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

type ServiceChildRecord = Record<string, string | number | null>;

type Service = {
  categoryTr: string | null;
  categoryEn: string | null;
  categoryDe: string | null;
  nameTr: string;
  nameEn: string;
  nameDe: string;
  slugTr: string;
  slugEn: string;
  slugDe: string;
  shortDescriptionTr: string | null;
  shortDescriptionEn: string | null;
  shortDescriptionDe: string | null;
  longDescriptionTr: string | null;
  longDescriptionEn: string | null;
  longDescriptionDe: string | null;
  badgeTr: string | null;
  badgeEn: string | null;
  badgeDe: string | null;
  sessionsLabelTr: string | null;
  sessionsLabelEn: string | null;
  sessionsLabelDe: string | null;
  durationMinutes: number | null;
  imageUrl: string | null;
  imageAltTr: string | null;
  imageAltEn: string | null;
  imageAltDe: string | null;
  isActive: boolean;
  sortOrder: number;
  galleries: ServiceChildRecord[];
  features: ServiceChildRecord[];
  processSteps: ServiceChildRecord[];
  faqs: ServiceChildRecord[];
};

function cleanGalleryItem(item: ServiceChildRecord) {
  return {
    imageUrl: String(item.imageUrl ?? ""),
    imageAltTr: item.imageAltTr ? String(item.imageAltTr) : null,
    imageAltEn: item.imageAltEn ? String(item.imageAltEn) : null,
    imageAltDe: item.imageAltDe ? String(item.imageAltDe) : null,
    sortOrder: Number(item.sortOrder ?? 0),
  };
}

function cleanFeatureItem(item: ServiceChildRecord) {
  return {
    labelTr: String(item.labelTr ?? ""),
    labelEn: String(item.labelEn ?? ""),
    labelDe: String(item.labelDe ?? ""),
    sortOrder: Number(item.sortOrder ?? 0),
  };
}

function cleanProcessStepItem(item: ServiceChildRecord) {
  return {
    stepNumber: Number(item.stepNumber ?? 1),
    titleTr: String(item.titleTr ?? ""),
    titleEn: String(item.titleEn ?? ""),
    titleDe: String(item.titleDe ?? ""),
    descriptionTr: String(item.descriptionTr ?? ""),
    descriptionEn: String(item.descriptionEn ?? ""),
    descriptionDe: String(item.descriptionDe ?? ""),
    sortOrder: Number(item.sortOrder ?? 0),
  };
}

function cleanFaqItem(item: ServiceChildRecord) {
  return {
    questionTr: String(item.questionTr ?? ""),
    questionEn: String(item.questionEn ?? ""),
    questionDe: String(item.questionDe ?? ""),
    answerTr: String(item.answerTr ?? ""),
    answerEn: String(item.answerEn ?? ""),
    answerDe: String(item.answerDe ?? ""),
    sortOrder: Number(item.sortOrder ?? 0),
  };
}

export default function EditServicePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [related, setRelated] = useState({
    galleries: [] as ServiceChildRecord[],
    features: [] as ServiceChildRecord[],
    processSteps: [] as ServiceChildRecord[],
    faqs: [] as ServiceChildRecord[],
  });
  const [form, setForm] = useState({
    categoryTr: "",
    categoryEn: "",
    categoryDe: "",
    nameTr: "",
    nameEn: "",
    nameDe: "",
    slugTr: "",
    slugEn: "",
    slugDe: "",
    shortDescriptionTr: "",
    shortDescriptionEn: "",
    shortDescriptionDe: "",
    longDescriptionTr: "",
    longDescriptionEn: "",
    longDescriptionDe: "",
    badgeTr: "",
    badgeEn: "",
    badgeDe: "",
    sessionsLabelTr: "",
    sessionsLabelEn: "",
    sessionsLabelDe: "",
    durationMinutes: 0,
    imageUrl: "",
    imageAltTr: "",
    imageAltEn: "",
    imageAltDe: "",
    sortOrder: 0,
    isActive: true,
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`/api/admin/services/${id}`, {
          credentials: "include",
          cache: "no-store",
        });
        const payload = (await response.json()) as AdminApiPayload<Service>;
        const service = unwrapAdminApiData(payload);

        setForm({
          categoryTr: service.categoryTr ?? "",
          categoryEn: service.categoryEn ?? "",
          categoryDe: service.categoryDe ?? "",
          nameTr: service.nameTr,
          nameEn: service.nameEn,
          nameDe: service.nameDe,
          slugTr: service.slugTr,
          slugEn: service.slugEn,
          slugDe: service.slugDe,
          shortDescriptionTr: service.shortDescriptionTr ?? "",
          shortDescriptionEn: service.shortDescriptionEn ?? "",
          shortDescriptionDe: service.shortDescriptionDe ?? "",
          longDescriptionTr: service.longDescriptionTr ?? "",
          longDescriptionEn: service.longDescriptionEn ?? "",
          longDescriptionDe: service.longDescriptionDe ?? "",
          badgeTr: service.badgeTr ?? "",
          badgeEn: service.badgeEn ?? "",
          badgeDe: service.badgeDe ?? "",
          sessionsLabelTr: service.sessionsLabelTr ?? "",
          sessionsLabelEn: service.sessionsLabelEn ?? "",
          sessionsLabelDe: service.sessionsLabelDe ?? "",
          durationMinutes: service.durationMinutes ?? 0,
          imageUrl: service.imageUrl ?? "",
          imageAltTr: service.imageAltTr ?? "",
          imageAltEn: service.imageAltEn ?? "",
          imageAltDe: service.imageAltDe ?? "",
          sortOrder: service.sortOrder ?? 0,
          isActive: service.isActive,
        });
        setRelated({
          galleries: (service.galleries ?? []).map(cleanGalleryItem),
          features: (service.features ?? []).map(cleanFeatureItem),
          processSteps: (service.processSteps ?? []).map(cleanProcessStepItem),
          faqs: (service.faqs ?? []).map(cleanFaqItem),
        });
      } catch {
        alert("Hizmet bilgileri yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };

    void fetchService();
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
          durationMinutes: Number(form.durationMinutes) || 0,
          sortOrder: Number(form.sortOrder) || 0,
          ...related,
        }),
      );

      if (imageFile) {
        formData.append("imageUrl", imageFile);
      }

      const response = await fetch(`/api/admin/services/${id}`, {
        method: "PUT",
        headers: { "x-csrf-token": csrfToken },
        credentials: "include",
        body: formData,
      });

      if (!response.ok) throw new Error();

      router.push("/admin/services");
    } catch {
      alert("Hizmet güncellenemedi.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-sm text-gray-500">Hizmet yükleniyor...</div>;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Hizmet Düzenle</h1>
          <p className="mt-1 text-sm text-gray-500">Hizmet metinlerini ve kapak görselini güncelleyin.</p>
        </div>

        <div className="flex gap-3">
          <Link href="/admin/services" className="rounded-md border px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
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
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Kategori</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <input name="categoryTr" value={form.categoryTr} onChange={handleInput} className={inputClass} />
            <input name="categoryEn" value={form.categoryEn} onChange={handleInput} className={inputClass} />
            <input name="categoryDe" value={form.categoryDe} onChange={handleInput} className={inputClass} />
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Hizmet Adı</h2>
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
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Uzun Açıklama</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <textarea name="longDescriptionTr" value={form.longDescriptionTr} onChange={handleInput} className={textareaClass} />
            <textarea name="longDescriptionEn" value={form.longDescriptionEn} onChange={handleInput} className={textareaClass} />
            <textarea name="longDescriptionDe" value={form.longDescriptionDe} onChange={handleInput} className={textareaClass} />
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Hizmet Kapak Görseli</label>
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

        <section className="mt-10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Rozet ve Seans Bilgisi</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <input name="badgeTr" value={form.badgeTr} onChange={handleInput} className={inputClass} />
            <input name="badgeEn" value={form.badgeEn} onChange={handleInput} className={inputClass} />
            <input name="badgeDe" value={form.badgeDe} onChange={handleInput} className={inputClass} />
            <input name="sessionsLabelTr" value={form.sessionsLabelTr} onChange={handleInput} className={inputClass} />
            <input name="sessionsLabelEn" value={form.sessionsLabelEn} onChange={handleInput} className={inputClass} />
            <input name="sessionsLabelDe" value={form.sessionsLabelDe} onChange={handleInput} className={inputClass} />
          </div>
        </section>

        <section className="mt-10 flex flex-col gap-5 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="grid w-full grid-cols-1 gap-4 sm:max-w-md sm:grid-cols-2">
            <input type="number" name="durationMinutes" min={0} value={form.durationMinutes} onChange={handleInput} className={inputClass} />
            <input type="number" name="sortOrder" min={0} value={form.sortOrder} onChange={handleInput} className={inputClass} />
          </div>
          <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
            <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleInput} className="h-4 w-4 accent-[#8a6e36]" />
            Yayında
          </label>
        </section>
      </div>
    </div>
  );
}
