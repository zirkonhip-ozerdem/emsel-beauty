import { z } from "zod";

import {
  optionalText,
  requiredText,
} from "@/lib/admin/modules/shared/schema-helpers";

export const userInputSchema = z.object({
  firstName: requiredText(100),
  lastName: requiredText(100),
  email: optionalText(255),
  phoneNumber: optionalText(20),
  status: z.enum(["PENDING", "ACTIVE", "SUSPENDED", "BANNED"]),
});

export type UserInput = z.infer<typeof userInputSchema>;
