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

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string | null;
  phoneNumber: string | null;
  status: "PENDING" | "ACTIVE" | "SUSPENDED" | "BANNED";
  createdAt: string;
};

const statusLabels = {
  PENDING: "Beklemede",
  ACTIVE: "Aktif",
  SUSPENDED: "Askıda",
  BANNED: "Engelli",
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users", {
        credentials: "include",
        cache: "no-store",
      });
      const payload = (await response.json()) as AdminApiPayload<User[]>;
      setUsers(unwrapAdminApiData(payload));
    } catch {
      alert("Kullanıcılar yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchUsers();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setDeleting(true);
      const csrfToken = await getAdminCsrfToken();
      const response = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify({ id: deleteId }),
      });

      if (!response.ok) throw new Error();

      setUsers((prev) => prev.filter((user) => user.id !== deleteId));
      setDeleteId(null);
    } catch {
      alert("Kullanıcı silinemedi.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kullanıcılar</h1>
          <p className="mt-1 text-sm text-gray-500">Müşteri veya panel dışı kullanıcı kayıtlarını yönetin.</p>
        </div>

        <Link
          href="/admin/users/new"
          className="inline-flex w-fit rounded-md bg-[#8a6e36] px-4 py-2 text-sm font-semibold text-[#f9f8f4] hover:bg-[#725a2c]"
        >
          + Yeni Kullanıcı
        </Link>
      </div>

      {loading ? <div className="text-sm text-gray-500">Kullanıcılar yükleniyor...</div> : null}

      {users.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-3 text-left">Ad Soyad</th>
                <th className="px-6 py-3 text-left">E-posta</th>
                <th className="px-6 py-3 text-left">Telefon</th>
                <th className="px-6 py-3 text-left">Durum</th>
                <th className="px-6 py-3 text-left">Kayıt</th>
                <th className="px-6 py-3 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">{user.firstName} {user.lastName}</td>
                  <td className="px-6 py-4 text-gray-600">{user.email ?? "-"}</td>
                  <td className="px-6 py-4 text-gray-600">{user.phoneNumber ?? "-"}</td>
                  <td className="px-6 py-4 text-gray-600">{statusLabels[user.status]}</td>
                  <td className="px-6 py-4 text-gray-600">{formatAdminDate(user.createdAt)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex gap-3">
                      <Link href={`/admin/users/${user.id}/edit`} className="text-blue-600 hover:underline">Düzenle</Link>
                      <button type="button" onClick={() => setDeleteId(user.id)} className="text-red-600 hover:underline">Sil</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : !loading ? (
        <div className="rounded-xl border bg-white p-6 text-sm text-gray-500">Henüz kullanıcı yok.</div>
      ) : null}

      <DeleteModal
        open={!!deleteId}
        title="Kullanıcı Sil"
        description="Bu kullanıcı kalıcı olarak silinecek."
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => !deleting && setDeleteId(null)}
      />
    </div>
  );
}
