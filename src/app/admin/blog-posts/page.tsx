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

type BlogPost = {
  id: number;
  titleTr: string;
  titleEn: string;
  seoUrlTr: string;
  metaTr: string | null;
  imageUrl: string | null;
  readTimeMin: number;
  publishedAt: string | null;
  status: boolean;
};

export default function BlogPostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/admin/blog-posts", {
        credentials: "include",
        cache: "no-store",
      });
      const payload = (await response.json()) as AdminApiPayload<BlogPost[]>;
      setPosts(unwrapAdminApiData(payload));
    } catch {
      alert("Blog yazıları yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchPosts();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setDeleting(true);
      const csrfToken = await getAdminCsrfToken();
      const response = await fetch("/api/admin/blog-posts", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify({ id: deleteId }),
      });

      if (!response.ok) throw new Error();

      setPosts((prev) => prev.filter((post) => post.id !== deleteId));
      setDeleteId(null);
    } catch {
      alert("Blog yazısı silinemedi.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Blog Yazıları</h1>
          <p className="mt-1 text-sm text-gray-500">Blog liste ve detay içeriklerini yönetin.</p>
        </div>

        <Link
          href="/admin/blog-posts/new"
          className="inline-flex w-fit rounded-md bg-[#8a6e36] px-4 py-2 text-sm font-semibold text-[#f9f8f4] hover:bg-[#725a2c]"
        >
          + Yeni Blog
        </Link>
      </div>

      {loading ? <div className="text-sm text-gray-500">Blog yazıları yükleniyor...</div> : null}

      {!loading && posts.length === 0 ? (
        <div className="rounded-xl border bg-white p-6 text-sm text-gray-500">Henüz blog yazısı yok.</div>
      ) : null}

      {posts.length > 0 ? (
        <div className="hidden overflow-x-auto rounded-xl border bg-white shadow-sm md:block">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-3 text-left">Görsel</th>
                <th className="px-6 py-3 text-left">Başlık</th>
                <th className="px-6 py-3 text-left">Kategori</th>
                <th className="px-6 py-3 text-left">Yayın Tarihi</th>
                <th className="px-6 py-3 text-left">Durum</th>
                <th className="px-6 py-3 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    {post.imageUrl ? (
                      <img src={post.imageUrl} alt={post.titleTr} className="h-12 w-12 rounded-md border object-cover" />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 text-xs text-gray-400">Yok</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">{post.titleTr}</div>
                    <div className="text-xs text-gray-500">/{post.seoUrlTr}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{post.metaTr ?? "-"}</td>
                  <td className="px-6 py-4 text-gray-600">{formatAdminDate(post.publishedAt)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs ${post.status ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}>
                      {post.status ? "Yayında" : "Taslak"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex gap-3">
                      <Link href={`/admin/blog-posts/${post.id}/edit`} className="text-blue-600 hover:underline">Düzenle</Link>
                      <button type="button" onClick={() => setDeleteId(post.id)} className="text-red-600 hover:underline">Sil</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {posts.map((post) => (
          <div key={post.id} className="rounded-xl border bg-white p-4">
            <div className="font-semibold text-gray-800">{post.titleTr}</div>
            <div className="mt-1 text-xs text-gray-500">{post.metaTr ?? "Kategori yok"}</div>
            <div className="mt-3 flex justify-end gap-4 border-t pt-3">
              <Link href={`/admin/blog-posts/${post.id}/edit`} className="text-sm text-blue-600">Düzenle</Link>
              <button type="button" onClick={() => setDeleteId(post.id)} className="text-sm text-red-600">Sil</button>
            </div>
          </div>
        ))}
      </div>

      <DeleteModal
        open={!!deleteId}
        title="Blog Yazısı Sil"
        description="Bu blog yazısı kalıcı olarak silinecek."
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => !deleting && setDeleteId(null)}
      />
    </div>
  );
}
