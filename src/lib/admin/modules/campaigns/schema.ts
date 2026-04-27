import { z } from "zod";

import {
  booleanValue,
  integerNumber,
  localizedOptionalTextObject,
  localizedRequiredTextObject,
  optionalDate,
  optionalUrl,
} from "@/lib/admin/modules/shared/schema-helpers";

export const campaignInputSchema = z.object({
  ...localizedRequiredTextObject("title", 100),
  ...localizedRequiredTextObject("seoUrl", 255),
  ...localizedOptionalTextObject("desc", 10000),
  ...localizedOptionalTextObject("badge", 80),
  imageUrl: optionalUrl(),
  startsAt: optionalDate(),
  endsAt: optionalDate(),
  sortOrder: integerNumber(0).default(0),
  isActive: booleanValue().default(true),
});

export type CampaignInput = z.infer<typeof campaignInputSchema>;
