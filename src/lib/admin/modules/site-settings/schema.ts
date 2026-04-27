import { z } from "zod";

import {
  optionalText,
  optionalUrl,
  requiredText,
} from "@/lib/admin/modules/shared/schema-helpers";

export const siteSettingInputSchema = z.object({
  siteName: requiredText(100),
  siteSeoKeywords: requiredText(255),
  siteSeoDescription: requiredText(255),
  email: optionalText(255),
  phoneNumber: optionalText(20),
  wpNumber: optionalText(20),
  addressTr: optionalText(255),
  addressEn: optionalText(255),
  addressDe: optionalText(255),
  mapEmbedUrl: optionalUrl(),
  workingHoursTr: optionalText(200),
  workingHoursEn: optionalText(200),
  workingHoursDe: optionalText(200),
  logoUrl: optionalUrl(),
  faviconUrl: optionalUrl(),
  instagramUrl: optionalUrl(),
  facebookUrl: optionalUrl(),
  xUrl: optionalUrl(),
});

export type SiteSettingInput = z.infer<typeof siteSettingInputSchema>;
