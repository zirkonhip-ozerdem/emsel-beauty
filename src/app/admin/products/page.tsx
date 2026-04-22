"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import DeleteModal from "@/components/admin/DeleteModal";
import {
  formatAdminDate,
  getAdminCsrfToken,
  unwrapAdminApiData,
  type AdminApiPayload,
} from "@/lib/admin/client-utils";

type Product = {
  id: number;
  nameTr: string;
  nameEn: string;
  slugTr: string;
  price: string | number;
  stock: number;
  currency: string;
  imageUrl: string | null;
  isFeatured: boolean;
  isActive: boolean;
  updatedAt: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/admin/products", {
        credentials: "include",
        cache: "no-store",
      });
      const payload = (await response.json()) as AdminApiPayload<Product[]>;
      setProducts(unwrapAdminApiData(payload));
    } catch {
      alert("Ürünler yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchProducts();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setDeleting(true);
      const csrfToken = await getAdminCsrfToken();
      const response = await fetch("/api/admin/products", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify({ id: deleteId }),
      });

      if (!response.ok) throw new Error();

      setProducts((prev) => prev.filter((product) => product.id !== deleteId));
      setDeleteId(null);
    } catch {
      alert("Ürün silinemedi.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Ürünler</h1>
          <p className="mt-1 text-sm text-gray-500">
            Çok dilli ürün katalog kayıtlarını yönetin.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex w-fit rounded-md bg-[#8a6e36] px-4 py-2 text-sm font-semibold text-[#f9f8f4] hover:bg-[#725a2c]"
        >
          + Yeni Ürün
        </Link>
      </div>

      {loading ? <div className="text-sm text-gray-500">Ürünler yükleniyor...</div> : null}

      {!loading && products.length === 0 ? (
        <div className="rounded-xl border bg-white p-6 text-sm text-gray-500">Henüz ürün yok.</div>
      ) : null}

      {products.length > 0 ? (
        <div className="hidden overflow-x-auto rounded-xl border bg-white shadow-sm md:block">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-3 text-left">Görsel</th>
                <th className="px-6 py-3 text-left">Ürün</th>
                <th className="px-6 py-3 text-left">SEO URL</th>
                <th className="px-6 py-3 text-left">Fiyat / Stok</th>
                <th className="px-6 py-3 text-left">Durum</th>
                <th className="px-6 py-3 text-left">Güncelleme</th>
                <th className="px-6 py-3 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.nameTr}
                        className="h-12 w-12 rounded-md border object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 text-xs text-gray-400">
                        Yok
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">{product.nameTr}</div>
                    <div className="text-xs text-gray-500">{product.nameEn}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">/{product.slugTr}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {Number(product.price).toLocaleString("tr-TR")} {product.currency}
                    <div className="text-xs text-gray-500">Stok: {product.stock}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs ${
                        product.isActive ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {product.isActive ? "Yayında" : "Pasif"}
                    </span>
                    {product.isFeatured ? (
                      <span className="ml-2 inline-flex rounded-full bg-[#f2d688]/60 px-2 py-1 text-xs text-[#8a6e36]">
                        Öne çıkan
                      </span>
                    ) : null}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{formatAdminDate(product.updatedAt)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex gap-3">
                      <Link href={`/admin/products/${product.id}/edit`} className="text-blue-600 hover:underline">
                        Düzenle
                      </Link>
                      <button type="button" onClick={() => setDeleteId(product.id)} className="text-red-600 hover:underline">
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {products.map((product) => (
          <div key={product.id} className="rounded-xl border bg-white p-4">
            <div className="flex items-center gap-3">
              {product.imageUrl ? <img src={product.imageUrl} alt="" className="h-12 w-12 rounded-md object-cover" /> : null}
              <div>
                <div className="font-semibold text-gray-800">{product.nameTr}</div>
                <div className="text-xs text-gray-500">{Number(product.price).toLocaleString("tr-TR")} {product.currency}</div>
              </div>
            </div>
            <div className="mt-3 flex justify-end gap-4 border-t pt-3">
              <Link href={`/admin/products/${product.id}/edit`} className="text-sm text-blue-600">Düzenle</Link>
              <button type="button" onClick={() => setDeleteId(product.id)} className="text-sm text-red-600">Sil</button>
            </div>
          </div>
        ))}
      </div>

      <DeleteModal
        open={!!deleteId}
        title="Ürün Sil"
        description="Bu ürün kalıcı olarak silinecek."
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => !deleting && setDeleteId(null)}
      />
    </div>
  );
}
