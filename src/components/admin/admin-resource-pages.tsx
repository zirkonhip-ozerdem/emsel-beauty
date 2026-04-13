import Link from "next/link";
import { notFound } from "next/navigation";

import { AdminDeleteButton } from "@/components/admin/admin-delete-button";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminRecordForm } from "@/components/admin/admin-record-form";
import { adminCrud } from "@/lib/admin/crud";
import { adminResourceMap } from "@/lib/admin/resources";
import { isDatabaseReady, serializeAdminData, withOptionalDatabase } from "@/lib/admin/server";
import type { AdminColumn, AdminResourceKey } from "@/lib/admin/types";

type RecordShape = Record<string, unknown>;

function getValueByPath(record: RecordShape, path: string): unknown {
  return path.split(".").reduce<unknown>((currentValue, segment) => {
    if (currentValue && typeof currentValue === "object" && segment in currentValue) {
      return (currentValue as Record<string, unknown>)[segment];
    }

    return undefined;
  }, record);
}

function formatCell(column: AdminColumn, record: RecordShape) {
  const rawValue = getValueByPath(record, column.key);

  if (column.type === "count") {
    return Array.isArray(rawValue) ? String(rawValue.length) : "0";
  }

  if (column.type === "boolean") {
    return rawValue ? column.trueLabel ?? "Evet" : column.falseLabel ?? "Hayir";
  }

  if (column.type === "date") {
    if (!rawValue) {
      return column.placeholder ?? "-";
    }

    const date = new Date(String(rawValue));

    if (Number.isNaN(date.getTime())) {
      return column.placeholder ?? "-";
    }

    return new Intl.DateTimeFormat("tr-TR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  }

  if (column.type === "money") {
    if (rawValue === null || rawValue === undefined || rawValue === "") {
      return column.placeholder ?? "-";
    }

    const numericValue = Number(rawValue);

    if (Number.isNaN(numericValue)) {
      return String(rawValue);
    }

    const currency = String(getValueByPath(record, column.currencyKey ?? "currency") ?? "TRY");

    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(numericValue);
  }

  if (rawValue === null || rawValue === undefined || rawValue === "") {
    return column.placeholder ?? "-";
  }

  return String(rawValue);
}

function DatabaseNotice() {
  return (
    <section className="rounded-[28px] border border-dashed border-[#d4bd95] bg-[#fff8ec] p-5 text-sm leading-7 text-[#7b6b4a]">
      Veritabani baglantisi henuz tanimli degil. Supabase icin `DATABASE_URL` ve
      `DIRECT_URL` degerlerini ekledigimiz anda bu ekranlar dogrudan canli CRUD
      akisi ile calisacak.
    </section>
  );
}

export async function AdminResourceListPage({
  resourceKey,
}: {
  resourceKey: AdminResourceKey;
}) {
  const resource = adminResourceMap[resourceKey];
  const databaseReady = isDatabaseReady();
  const records = await withOptionalDatabase<RecordShape[]>([], async () =>
    serializeAdminData((await adminCrud[resourceKey].list()) as RecordShape[]),
  );

  const singletonRecord = resource.singleton ? records[0] : null;
  const primaryHref = resource.singleton
    ? singletonRecord
      ? `${resource.href}/${singletonRecord.id}/edit`
      : `${resource.href}/new`
    : `${resource.href}/new`;
  const primaryLabel = resource.singleton
    ? singletonRecord
      ? "Ayarlari duzenle"
      : resource.createLabel
    : resource.createLabel;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow={resource.title}
        title={`${resource.title} yonetimi`}
        description={resource.description}
        action={
          <Link
            href={primaryHref}
            className="inline-flex rounded-full bg-accent-strong px-5 py-3 text-sm font-semibold text-white"
          >
            {primaryLabel}
          </Link>
        }
      />

      {!databaseReady ? <DatabaseNotice /> : null}

      <section className="rounded-[32px] border border-border bg-white/88 p-6 shadow-[var(--shadow)]">
        {records.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-border px-5 py-10 text-center">
            <p className="text-lg font-semibold text-foreground">{resource.emptyState}</p>
            <p className="mt-2 text-sm leading-7 text-muted">
              Ilk kaydi actigimizda listeler, API route’lari ve admin formlari ayni
              akistan calisacak.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-3">
              <thead>
                <tr>
                  {resource.columns.map((column) => (
                    <th
                      key={column.key}
                      className="px-4 pb-2 text-left text-xs font-semibold uppercase tracking-[0.16em] text-muted"
                    >
                      {column.label}
                    </th>
                  ))}
                  <th className="px-4 pb-2 text-right text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    Islemler
                  </th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => {
                  const recordId = String(record.id ?? "");

                  return (
                    <tr key={`${resource.key}-${recordId}`}>
                      {resource.columns.map((column) => (
                        <td
                          key={`${recordId}-${column.key}`}
                          className="bg-surface-strong px-4 py-4 text-sm text-foreground first:rounded-l-[20px] last:rounded-r-[20px]"
                        >
                          {formatCell(column, record)}
                        </td>
                      ))}
                      <td className="bg-surface-strong px-4 py-4 text-right first:rounded-l-[20px] last:rounded-r-[20px]">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`${resource.href}/${recordId}/edit`}
                            className="rounded-full bg-accent-soft/50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-accent-strong"
                          >
                            Duzenle
                          </Link>
                          <AdminDeleteButton endpoint={`${resource.apiPath}/${recordId}`} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export function AdminResourceCreatePage({
  resourceKey,
}: {
  resourceKey: AdminResourceKey;
}) {
  const resource = adminResourceMap[resourceKey];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow={resource.title}
        title={`${resource.singular} olustur`}
        description={`${resource.title} icin yeni bir kayit olusturuyoruz. Panelde girdigin veriler daha sonra public siteyi dinamik besleyecek.`}
      />

      {!isDatabaseReady() ? <DatabaseNotice /> : null}

      <AdminRecordForm
        resource={resource}
        mode="create"
        endpoint={resource.apiPath}
        method="POST"
        initialValue={serializeAdminData(resource.defaultValues)}
        returnPath={resource.href}
      />
    </div>
  );
}

export async function AdminResourceEditPage({
  resourceKey,
  id,
}: {
  resourceKey: AdminResourceKey;
  id: number;
}) {
  const resource = adminResourceMap[resourceKey];

  if (!isDatabaseReady()) {
    return (
      <div className="space-y-6">
        <AdminPageHeader
          eyebrow={resource.title}
          title={`${resource.singular} duzenle`}
          description="Duzenleme sayfasi hazir; veritabani baglantisi aktif oldugunda kaydi dogrudan cekip duzenleyecegiz."
        />
        <DatabaseNotice />
      </div>
    );
  }

  const record = serializeAdminData(
    (await adminCrud[resourceKey].get(id)) as RecordShape | null,
  );

  if (!record) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow={resource.title}
        title={`${resource.singular} duzenle`}
        description={`${resource.singular} kaydi burada guncellenir. Kaydetme sonrasinda listeye geri donuyoruz.`}
      />

      <AdminRecordForm
        resource={resource}
        mode="edit"
        endpoint={`${resource.apiPath}/${id}`}
        method="PATCH"
        initialValue={record}
        returnPath={resource.href}
      />
    </div>
  );
}
