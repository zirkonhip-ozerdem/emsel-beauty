import { z } from "zod";

import {
  booleanValue,
  galleryItemSchema,
  integerNumber,
  localizedRequiredTextObject,
  optionalText,
  optionalUrl,
  serviceFaqSchema,
  serviceFeatureSchema,
  serviceProcessStepSchema,
} from "@/lib/admin/modules/shared/schema-helpers";

export const serviceInputSchema = z.object({
  ...localizedRequiredTextObject("name", 150),
  ...localizedRequiredTextObject("slug", 180),
  shortDescriptionTr: optionalText(300),
  shortDescriptionEn: optionalText(300),
  shortDescriptionDe: optionalText(300),
  longDescriptionTr: optionalText(10000),
  longDescriptionEn: optionalText(10000),
  longDescriptionDe: optionalText(10000),
  badgeTr: optionalText(120),
  badgeEn: optionalText(120),
  badgeDe: optionalText(120),
  sessionsLabelTr: optionalText(80),
  sessionsLabelEn: optionalText(80),
  sessionsLabelDe: optionalText(80),
  durationMinutes: integerNumber(0)
    .nullable()
    .optional()
    .transform((value) => value ?? 0),
  imageUrl: optionalUrl(),
  imageAltTr: optionalText(255),
  imageAltEn: optionalText(255),
  imageAltDe: optionalText(255),
  isActive: booleanValue().default(true),
  showOnHomepage: booleanValue().default(false),
  sortOrder: integerNumber(0).default(0),
  galleries: z.array(galleryItemSchema).default([]),
  features: z.array(serviceFeatureSchema).default([]),
  processSteps: z.array(serviceProcessStepSchema).default([]),
  faqs: z.array(serviceFaqSchema).default([]),
});

export type ServiceInput = z.infer<typeof serviceInputSchema>;
