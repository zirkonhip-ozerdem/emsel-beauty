import { z } from "zod";

import {
  booleanValue,
  galleryItemSchema,
  integerNumber,
  localizedRequiredTextObject,
  optionalText,
  optionalUrl,
  requiredText,
} from "@/lib/admin/modules/shared/schema-helpers";

export const productInputSchema = z.object({
  ...localizedRequiredTextObject("name", 150),
  ...localizedRequiredTextObject("slug", 180),
  shortDescriptionTr: optionalText(10000),
  shortDescriptionEn: optionalText(10000),
  shortDescriptionDe: optionalText(10000),
  descriptionTr: requiredText(10000),
  descriptionEn: requiredText(10000),
  descriptionDe: requiredText(10000),
  imageUrl: optionalUrl(),
  imageAltTr: optionalText(255),
  imageAltEn: optionalText(255),
  imageAltDe: optionalText(255),
  isActive: booleanValue().default(true),
  showOnHomepage: booleanValue().default(false),
  sortOrder: integerNumber(0).default(0),
  galleries: z.array(galleryItemSchema).default([]),
});

export type ProductInput = z.infer<typeof productInputSchema>;
