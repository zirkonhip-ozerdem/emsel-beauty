import { z } from "zod";

import {
  optionalText,
  requiredText,
} from "@/lib/admin/modules/shared/schema-helpers";

export const contactAppointmentInputSchema = z.object({
  name: requiredText(120),
  phone: optionalText(30),
  service: requiredText(100),
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"]),
  locale: z.enum(["tr", "en", "de"]),
});

export type ContactAppointmentInput = z.infer<typeof contactAppointmentInputSchema>;
