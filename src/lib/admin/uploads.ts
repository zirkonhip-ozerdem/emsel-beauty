import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { put } from "@vercel/blob";
import type { NextRequest } from "next/server";

import type { AdminResourceKey } from "@/lib/admin/types";

const allowedImageTypes = new Map([
  ["image/avif", "avif"],
  ["image/gif", "gif"],
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

const maxUploadSizeInBytes = 5 * 1024 * 1024;

export class AdminUploadError extends Error {
  constructor(message: string, readonly status = 400) {
    super(message);
    this.name = "AdminUploadError";
  }
}

function parseJsonPayload(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return {};
  }

  try {
    return JSON.parse(value) as Record<string, unknown>;
  } catch {
    throw new AdminUploadError("Form verisi okunamadı.", 400);
  }
}

function getPathSegment(segment: string) {
  return /^\d+$/.test(segment) ? Number(segment) : segment;
}

function setValueByPath(
  target: Record<string, unknown>,
  fieldPath: string,
  value: string,
) {
  const segments = fieldPath.split(".").filter(Boolean);

  if (segments.length === 0) {
    return;
  }

  let cursor: Record<string, unknown> | unknown[] = target;

  segments.slice(0, -1).forEach((segment, index) => {
    const key = getPathSegment(segment);
    const nextSegment = segments[index + 1];
    const shouldCreateArray = /^\d+$/.test(nextSegment);

    if (Array.isArray(cursor)) {
      const arrayKey = Number(key);
      cursor[arrayKey] ??= shouldCreateArray ? [] : {};
      cursor = cursor[arrayKey] as Record<string, unknown> | unknown[];
      return;
    }

    cursor[key] ??= shouldCreateArray ? [] : {};
    cursor = cursor[key] as Record<string, unknown> | unknown[];
  });

  const lastKey = getPathSegment(segments.at(-1) ?? "");

  if (Array.isArray(cursor)) {
    cursor[Number(lastKey)] = value;
    return;
  }

  cursor[lastKey] = value;
}

async function saveAdminImageUpload(file: File, resourceKey: AdminResourceKey) {
  if (file.size <= 0) {
    return null;
  }

  if (file.size > maxUploadSizeInBytes) {
    throw new AdminUploadError("Görsel en fazla 5MB olabilir.", 413);
  }

  const extension = allowedImageTypes.get(file.type);

  if (!extension) {
    throw new AdminUploadError("Lütfen JPG, PNG, WEBP, GIF veya AVIF görsel yükleyin.");
  }

  const fileName = `${Date.now()}-${randomUUID()}.${extension}`;
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

  if (blobToken) {
    try {
      const blob = await put(`admin/${resourceKey}/${fileName}`, file, {
        access: "public",
        addRandomSuffix: false,
        contentType: file.type,
        token: blobToken,
      });

      return blob.url;
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("Cannot use public access on a private store")
      ) {
        throw new AdminUploadError(
          "Bagladiginiz Vercel Blob store private durumda. Site gorselleri icin public access ile olusturulmus bir Blob store baglamaniz gerekiyor.",
          500,
        );
      }

      throw error;
    }
  }

  if (process.env.VERCEL) {
    throw new AdminUploadError(
      "Canlı ortamda görsel yüklemek için Vercel Blob yapılandırması eksik.",
      500,
    );
  }

  const uploadRoot = path.join(process.cwd(), "public", "uploads", "admin", resourceKey);
  await mkdir(uploadRoot, { recursive: true });

  const filePath = path.join(uploadRoot, fileName);
  const buffer = Buffer.from(await file.arrayBuffer());

  await writeFile(filePath, buffer);

  return `/uploads/admin/${resourceKey}/${fileName}`;
}

export async function parseAdminRequestBody(
  request: NextRequest,
  resourceKey: AdminResourceKey,
) {
  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.includes("multipart/form-data")) {
    return request.json();
  }

  const formData = await request.formData();
  const payload = parseJsonPayload(formData.get("payload"));

  for (const [fieldPath, entry] of formData.entries()) {
    if (fieldPath === "payload" || !(entry instanceof File)) {
      continue;
    }

    const uploadedPath = await saveAdminImageUpload(entry, resourceKey);

    if (uploadedPath) {
      setValueByPath(payload, fieldPath, uploadedPath);
    }
  }

  return payload;
}
