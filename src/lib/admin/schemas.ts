export {
  blogPostInputSchema,
} from "@/lib/admin/modules/blog-posts/schema";
export {
  campaignInputSchema,
} from "@/lib/admin/modules/campaigns/schema";
export {
  contactAppointmentInputSchema,
} from "@/lib/admin/modules/contact-appointments/schema";
export {
  productInputSchema,
} from "@/lib/admin/modules/products/schema";
export {
  serviceInputSchema,
} from "@/lib/admin/modules/services/schema";
export {
  siteSettingInputSchema,
} from "@/lib/admin/modules/site-settings/schema";
export {
  userInputSchema,
} from "@/lib/admin/modules/users/schema";
export {
  whoInputSchema,
} from "@/lib/admin/modules/who/schema";

import { blogPostInputSchema } from "@/lib/admin/modules/blog-posts/schema";
import { campaignInputSchema } from "@/lib/admin/modules/campaigns/schema";
import { contactAppointmentInputSchema } from "@/lib/admin/modules/contact-appointments/schema";
import { productInputSchema } from "@/lib/admin/modules/products/schema";
import { serviceInputSchema } from "@/lib/admin/modules/services/schema";
import { siteSettingInputSchema } from "@/lib/admin/modules/site-settings/schema";
import { userInputSchema } from "@/lib/admin/modules/users/schema";
import { whoInputSchema } from "@/lib/admin/modules/who/schema";

export const adminResourceSchemas = {
  campaigns: campaignInputSchema,
  users: userInputSchema,
  who: whoInputSchema,
  "site-settings": siteSettingInputSchema,
  products: productInputSchema,
  services: serviceInputSchema,
  "blog-posts": blogPostInputSchema,
  "contact-appointments": contactAppointmentInputSchema,
};
