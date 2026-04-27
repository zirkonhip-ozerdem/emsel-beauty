import { z } from "zod";

import {
  booleanValue,
  galleryItemSchema,
  integerNumber,
  localizedRequiredTextObject,
  optionalDate,
  optionalText,
  requiredText,
} from "@/lib/admin/modules/shared/schema-helpers";

export const blogPostInputSchema = z.object({
  ...localizedRequiredTextObject("title", 200),
  ...localizedRequiredTextObject("seoUrl", 255),
  metaTr: optionalText(80),
  metaEn: optionalText(80),
  metaDe: optionalText(80),
  descriptionTr: requiredText(10000),
  descriptionEn: requiredText(10000),
  descriptionDe: requiredText(10000),
  bodyTr: optionalText(30000),
  bodyEn: optionalText(30000),
  bodyDe: optionalText(30000),
  imageUrl: requiredText(500),
  imageAltTr: optionalText(255),
  imageAltEn: optionalText(255),
  imageAltDe: optionalText(255),
  readTimeMin: integerNumber(1).default(1),
  publishedAt: optionalDate(),
  status: booleanValue().default(true),
  sortOrder: integerNumber(0).default(0),
  galleries: z.array(galleryItemSchema).default([]),
});

export type BlogPostInput = z.infer<typeof blogPostInputSchema>;
