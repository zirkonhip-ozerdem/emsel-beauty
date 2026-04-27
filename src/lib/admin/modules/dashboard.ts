import type { AdminResourceKey } from "@/lib/admin/types";
import { blogPostAdminService } from "@/lib/admin/modules/blog-posts/service";
import { campaignAdminService } from "@/lib/admin/modules/campaigns/service";
import { contactAppointmentAdminService } from "@/lib/admin/modules/contact-appointments/service";
import { productAdminService } from "@/lib/admin/modules/products/service";
import { serviceAdminService } from "@/lib/admin/modules/services/service";
import { siteSettingAdminService } from "@/lib/admin/modules/site-settings/service";
import { userAdminService } from "@/lib/admin/modules/users/service";
import { whoAdminService } from "@/lib/admin/modules/who/service";

const adminCountHandlers = {
  campaigns: campaignAdminService.count,
  users: userAdminService.count,
  who: whoAdminService.count,
  "site-settings": siteSettingAdminService.count,
  products: productAdminService.count,
  services: serviceAdminService.count,
  "blog-posts": blogPostAdminService.count,
  "contact-appointments": contactAppointmentAdminService.count,
} satisfies Record<AdminResourceKey, () => Promise<number>>;

const adminCountKeys = Object.keys(adminCountHandlers) as AdminResourceKey[];
const adminCountKeySet = new Set<string>(adminCountKeys);

export type AdminDashboardCounts = Partial<Record<AdminResourceKey, number>>;

export function isAdminCountKey(value: string): value is AdminResourceKey {
  return adminCountKeySet.has(value);
}

export async function getAdminDashboardCounts(
  resourceKeys: readonly AdminResourceKey[] = adminCountKeys,
): Promise<AdminDashboardCounts> {
  const uniqueKeys = Array.from(new Set(resourceKeys));
  const countEntries = await Promise.all(
    uniqueKeys.map(async (resourceKey) => [
      resourceKey,
      await adminCountHandlers[resourceKey](),
    ] as const),
  );

  return Object.fromEntries(countEntries) as AdminDashboardCounts;
}
