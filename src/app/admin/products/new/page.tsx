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

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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
    <div className="mx-auto max-w-4xl space-y-8">
      <h1 className="text-2xl font-bold">Yeni Ürün</h1>

      {/* ÜRÜN ADI */}
      <div>
        <h2 className="mb-2 font-semibold">Ürün Adı</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <input name="nameTr" onChange={handleInput} placeholder="TR" className="border p-2" />
          <input name="nameEn" onChange={handleInput} placeholder="EN" className="border p-2" />
          <input name="nameDe" onChange={handleInput} placeholder="DE" className="border p-2" />
        </div>
      </div>

      {/* AÇIKLAMA */}
      <div>
        <h2 className="mb-2 font-semibold">Açıklama</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <textarea name="descriptionTr" onChange={handleInput} placeholder="TR" className="border p-2" />
          <textarea name="descriptionEn" onChange={handleInput} placeholder="EN" className="border p-2" />
          <textarea name="descriptionDe" onChange={handleInput} placeholder="DE" className="border p-2" />
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="rounded-md bg-[#8a6e36] px-6 py-2 text-white hover:bg-[#725a2c] transition"
      >
        {saving ? "Kaydediliyor..." : "Kaydet"}
      </button>
    </div>
  );
}
