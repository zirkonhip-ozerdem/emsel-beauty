import { z } from "zod";

import {
  booleanValue,
  integerNumber,
  localizedOptionalTextObject,
  optionalText,
  optionalUrl,
} from "@/lib/admin/modules/shared/schema-helpers";

export const whoInputSchema = z.object({
  ...localizedOptionalTextObject("title", 150),
  whoDescTr: optionalText(10000),
  whoDescEn: optionalText(10000),
  whoDescDe: optionalText(10000),
  imageUrl: optionalUrl(),
  sortOrder: integerNumber(0).default(0),
  isActive: booleanValue().default(true),
});

export type WhoInput = z.infer<typeof whoInputSchema>;
