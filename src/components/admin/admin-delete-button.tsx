"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

function getCookieValue(name: string) {
  if (typeof document === "undefined") {
    return null;
  }

  const value = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${name}=`))
    ?.split("=")[1];

  return value ? decodeURIComponent(value) : null;
}

type AdminDeleteButtonProps = {
  endpoint: string;
  label?: string;
};

export function AdminDeleteButton({
  endpoint,
  label = "Sil",
}: AdminDeleteButtonProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Bu kaydı silmek istediğinize emin misiniz? Bu işlem geri alınmaz.",
    );

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      setError(null);

      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          "x-csrf-token": getCookieValue("emsel_admin_csrf") ?? "",
        },
        credentials: "include",
      });

      const payload = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!response.ok) {
        setError(payload?.message ?? "Kayıt silinemedi.");
        return;
      }

      router.refresh();
    });
  };

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        className="rounded-full border border-[#d9c49f] px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8a6e36] transition hover:bg-[#f4ecda] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Siliniyor..." : label}
      </button>

      {error ? <p className="text-right text-xs text-red-700">{error}</p> : null}
    </div>
  );
}
