"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

import { slugify } from "@/lib/slugify";
import type {
  AdminField,
  AdminAutoFillRule,
  AdminInputField,
  AdminRepeaterField,
  AdminResourceDefinition,
} from "@/lib/admin/types";

type AdminRecordFormProps = {
  resource: AdminResourceDefinition;
  mode: "create" | "edit";
  endpoint: string;
  method: "POST" | "PATCH";
  initialValue: Record<string, unknown>;
  returnPath: string;
};

function cloneValue<T>(value: T) {
  return JSON.parse(JSON.stringify(value)) as T;
}

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

function inputClass(field: AdminField) {
  const base =
    "w-full rounded-[18px] border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-accent-strong focus:ring-2 focus:ring-accent-soft/50";

  if ("className" in field && field.className) {
    return `${base} ${field.className}`;
  }

  return base;
}

function normalizeInputValue(field: AdminInputField, rawValue: string | boolean) {
  if (field.type === "checkbox") {
    return Boolean(rawValue);
  }

  if (field.type === "number") {
    if (rawValue === "") {
      return 0;
    }

    return Number(rawValue);
  }

  return rawValue;
}

function formatDateTimeLocal(value: string) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value.slice(0, 16);
  }

  const localValue = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localValue.toISOString().slice(0, 16);
}

function getInputDisplayValue(field: AdminInputField, value: unknown) {
  if (field.type === "checkbox") {
    return Boolean(value);
  }

  if (typeof value === "number") {
    return String(value);
  }

  const stringValue = typeof value === "string" ? value : "";

  if (field.type === "datetime-local") {
    return formatDateTimeLocal(stringValue);
  }

  return stringValue;
}

function applyAutoFillTransform(value: string, transform: AdminAutoFillRule["transform"]) {
  if (transform === "slugify") {
    return slugify(value);
  }

  return value;
}

export function AdminRecordForm({
  resource,
  mode,
  endpoint,
  method,
  initialValue,
  returnPath,
}: AdminRecordFormProps) {
  const router = useRouter();
  const [formState, setFormState] = useState<Record<string, unknown>>(
    cloneValue(initialValue),
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const formTitle = useMemo(
    () =>
      mode === "create"
        ? `${resource.singular} oluştur`
        : `${resource.singular} düzenle`,
    [mode, resource.singular],
  );

  const updateField = (field: AdminInputField, value: string | boolean) => {
    setFormState((current) => {
      const normalizedValue = normalizeInputValue(field, value);
      const nextState = {
        ...current,
        [field.name]: normalizedValue,
      };

      const sourceRules = resource.autoFillRules?.filter(
        (rule) => rule.source === field.name,
      );

      if (
        !sourceRules?.length ||
        typeof normalizedValue !== "string"
      ) {
        return nextState;
      }

      const previousSourceValue =
        typeof current[field.name] === "string" ? String(current[field.name]) : "";

      for (const rule of sourceRules) {
        const nextAutoValue = applyAutoFillTransform(normalizedValue, rule.transform);
        const previousAutoValue = applyAutoFillTransform(
          previousSourceValue,
          rule.transform,
        );

        for (const target of rule.targets) {
          const currentTargetValue =
            typeof current[target] === "string" ? String(current[target]) : "";

          if (
            currentTargetValue === "" ||
            currentTargetValue === previousAutoValue
          ) {
            nextState[target] = nextAutoValue;
          }
        }
      }

      return nextState;
    });
  };

  const updateRepeaterField = (
    repeater: AdminRepeaterField,
    index: number,
    field: AdminInputField,
    value: string | boolean,
  ) => {
    setFormState((current) => {
      const currentItems = Array.isArray(current[repeater.name])
        ? Array.from(current[repeater.name] as Record<string, unknown>[])
        : [];

      currentItems[index] = {
        ...currentItems[index],
        [field.name]: normalizeInputValue(field, value),
      };

      return {
        ...current,
        [repeater.name]: currentItems,
      };
    });
  };

  const addRepeaterItem = (repeater: AdminRepeaterField) => {
    setFormState((current) => {
      const currentItems = Array.isArray(current[repeater.name])
        ? Array.from(current[repeater.name] as Record<string, unknown>[])
        : [];

      currentItems.push(cloneValue(repeater.defaultItem));

      return {
        ...current,
        [repeater.name]: currentItems,
      };
    });
  };

  const removeRepeaterItem = (repeater: AdminRepeaterField, index: number) => {
    setFormState((current) => {
      const currentItems = Array.isArray(current[repeater.name])
        ? Array.from(current[repeater.name] as Record<string, unknown>[])
        : [];

      currentItems.splice(index, 1);

      return {
        ...current,
        [repeater.name]: currentItems,
      };
    });
  };

  const handleSubmit = () => {
    startTransition(async () => {
      setError(null);
      setSuccess(null);

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": getCookieValue("emsel_admin_csrf") ?? "",
        },
        credentials: "include",
        body: JSON.stringify(formState),
      });

      const payload = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!response.ok) {
        setError(payload?.message ?? "Kayıt kaydedilemedi.");
        return;
      }

      setSuccess(
        mode === "create" ? "Kayıt oluşturuldu." : "Değişiklikler kaydedildi.",
      );

      router.push(returnPath);
    });
  };

  return (
    <section className="rounded-[32px] border border-border bg-white/88 p-6 shadow-[var(--shadow)] sm:p-8">
      <div className="flex flex-col gap-4 border-b border-border pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-strong">
            {resource.title}
          </p>
          <h2 className="font-display mt-3 text-3xl text-foreground">
            {formTitle}
          </h2>
        </div>
        <p className="max-w-3xl text-sm leading-7 text-muted">
          Tüm alanlar admin panelinden yönetilecek şekilde kurgulandı. TR / EN /
          DE alanlarını birlikte doldurman, public sitedeki çok dilli akışı
          doğrudan besleyecek.
        </p>
      </div>

      <div className="mt-8 space-y-8">
        {resource.formSections.map((section) => (
          <section key={section.title} className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {section.title}
              </h3>
              {section.description ? (
                <p className="mt-1 text-sm leading-7 text-muted">
                  {section.description}
                </p>
              ) : null}
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {section.fields.map((field) => {
                if (field.type === "repeater") {
                  const items = Array.isArray(formState[field.name])
                    ? (formState[field.name] as Record<string, unknown>[])
                    : [];

                  return (
                    <div
                      key={field.name}
                      className="lg:col-span-2 rounded-[24px] border border-border bg-surface-strong/80 p-5"
                    >
                      <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {field.label}
                          </p>
                          {field.description ? (
                            <p className="mt-1 text-sm leading-6 text-muted">
                              {field.description}
                            </p>
                          ) : null}
                        </div>

                        <button
                          type="button"
                          onClick={() => addRepeaterItem(field)}
                          className="inline-flex rounded-full bg-accent-strong px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white"
                        >
                          {field.itemLabel} ekle
                        </button>
                      </div>

                      <div className="mt-4 space-y-4">
                        {items.length === 0 ? (
                          <div className="rounded-[18px] border border-dashed border-border px-4 py-6 text-sm text-muted">
                            Henüz {field.itemLabel.toLowerCase()} eklenmedi.
                          </div>
                        ) : null}

                        {items.map((item, index) => (
                          <div
                            key={`${field.name}-${index}`}
                            className="rounded-[20px] border border-border bg-white p-4"
                          >
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-semibold text-foreground">
                                {field.itemLabel} #{index + 1}
                              </p>
                              <button
                                type="button"
                                onClick={() => removeRepeaterItem(field, index)}
                                className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9c4b38]"
                              >
                                Kaldır
                              </button>
                            </div>

                            <div className="mt-4 grid gap-4 lg:grid-cols-2">
                              {field.fields.map((nestedField) => {
                                const value = item[nestedField.name];
                                const inputValue = getInputDisplayValue(
                                  nestedField,
                                  value,
                                );

                                return (
                                  <label
                                    key={`${field.name}-${index}-${nestedField.name}`}
                                    className={`flex flex-col gap-2 ${
                                      nestedField.type === "textarea"
                                        ? "lg:col-span-2"
                                        : ""
                                    }`}
                                  >
                                    <span className="text-sm font-medium text-foreground">
                                      {nestedField.label}
                                    </span>

                                    {nestedField.type === "textarea" ? (
                                      <textarea
                                        rows={4}
                                        className={inputClass(nestedField)}
                                        value={String(inputValue)}
                                        placeholder={nestedField.placeholder}
                                        onChange={(event) =>
                                          updateRepeaterField(
                                            field,
                                            index,
                                            nestedField,
                                            event.target.value,
                                          )
                                        }
                                      />
                                    ) : nestedField.type === "checkbox" ? (
                                      <input
                                        type="checkbox"
                                        checked={Boolean(value)}
                                        onChange={(event) =>
                                          updateRepeaterField(
                                            field,
                                            index,
                                            nestedField,
                                            event.target.checked,
                                          )
                                        }
                                        className="h-5 w-5 accent-[var(--accent-strong)]"
                                      />
                                    ) : (
                                      <input
                                        type={
                                          nestedField.type === "datetime-local"
                                            ? "datetime-local"
                                            : nestedField.type
                                        }
                                        className={inputClass(nestedField)}
                                        value={String(inputValue)}
                                        min={nestedField.min}
                                        step={nestedField.step}
                                        placeholder={nestedField.placeholder}
                                        onChange={(event) =>
                                          updateRepeaterField(
                                            field,
                                            index,
                                            nestedField,
                                            event.target.value,
                                          )
                                        }
                                      />
                                    )}
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                const currentValue = formState[field.name];
                const inputValue = getInputDisplayValue(field, currentValue);

                return (
                  <label
                    key={field.name}
                    className={`flex flex-col gap-2 ${
                      field.type === "textarea" ? "lg:col-span-2" : ""
                    }`}
                  >
                    <span className="text-sm font-medium text-foreground">
                      {field.label}
                    </span>

                    {field.description ? (
                      <span className="-mt-1 text-xs leading-6 text-muted">
                        {field.description}
                      </span>
                    ) : null}

                    {field.type === "textarea" ? (
                      <textarea
                        rows={5}
                        className={inputClass(field)}
                        value={String(inputValue)}
                        placeholder={field.placeholder}
                        onChange={(event) =>
                          updateField(field, event.target.value)
                        }
                      />
                    ) : field.type === "select" ? (
                      <select
                        className={inputClass(field)}
                        value={String(inputValue)}
                        onChange={(event) =>
                          updateField(field, event.target.value)
                        }
                      >
                        {(field.options ?? []).map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "checkbox" ? (
                      <div className="flex min-h-[52px] items-center rounded-[18px] border border-border bg-white px-4">
                        <input
                          type="checkbox"
                          checked={Boolean(inputValue)}
                          onChange={(event) =>
                            updateField(field, event.target.checked)
                          }
                          className="h-5 w-5 accent-[var(--accent-strong)]"
                        />
                      </div>
                    ) : (
                      <input
                        type={
                          field.type === "datetime-local"
                            ? "datetime-local"
                            : field.type
                        }
                        className={inputClass(field)}
                        value={String(inputValue)}
                        min={field.min}
                        step={field.step}
                        placeholder={field.placeholder}
                        onChange={(event) =>
                          updateField(field, event.target.value)
                        }
                      />
                    )}
                  </label>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6">
        <div className="space-y-2">
          {error ? <p className="text-sm text-red-700">{error}</p> : null}
          {success ? <p className="text-sm text-green-700">{success}</p> : null}
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push(returnPath)}
            className="min-w-[120px] rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground"
          >
            Vazgeç
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
            className="min-w-[120px] rounded-full border border-[#8a6e36] bg-[linear-gradient(135deg,#f2d688_0%,#c5a059_48%,#8a6e36_100%)] px-5 py-3 text-sm font-semibold text-[#4f452b] shadow-[0_14px_32px_rgba(138,110,54,0.22)] transition hover:brightness-[1.03] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? mode === "create" ? "Kaydediliyor..." : "Güncelleniyor..." : mode === "create" ? "Kaydet" : "Güncelle"}
          </button>
        </div>
      </div>
    </section>
  );
}
