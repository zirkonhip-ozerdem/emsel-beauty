"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    nameTr: "",
    nameEn: "",
    nameDe: "",
    descriptionTr: "",
    descriptionEn: "",
    descriptionDe: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      alert("Ürün oluşturuldu");
      router.push("/admin/products");
    } catch {
      alert("Ürün oluşturulamadı.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Yeni Ürün</h1>

      {/* Ürün adı */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-700">Ürün Adı</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <input
            name="nameTr"
            placeholder="Ürün adı (TR)"
            value={form.nameTr}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
          <input
            name="nameEn"
            placeholder="Product name (EN)"
            value={form.nameEn}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
          <input
            name="nameDe"
            placeholder="Produktname (DE)"
            value={form.nameDe}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
        </div>
      </div>

      {/* Açıklama */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-700">Açıklama</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <textarea
            name="descriptionTr"
            placeholder="Açıklama (TR)"
            value={form.descriptionTr}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
          <textarea
            name="descriptionEn"
            placeholder="Description (EN)"
            value={form.descriptionEn}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
          <textarea
            name="descriptionDe"
            placeholder="Beschreibung (DE)"
            value={form.descriptionDe}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
        </div>
      </div>

      {/* BUTON */}
      <div className="pt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#8a6e36] hover:bg-[#725a2c] text-[#f9f8f4] px-6 py-2 rounded-md font-semibold transition disabled:opacity-60"
        >
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>
    </div>
  );
}