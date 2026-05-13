import { unstable_cache } from "next/cache";

import { hasDatabaseConfig, prisma } from "@/lib/prisma";

export type PublicSiteStats = {
  services: number;
  products: number;
  posts: number;
  campaigns: number;
};

export const getPublicSiteStats = unstable_cache(
  async (): Promise<PublicSiteStats> => {
    if (!hasDatabaseConfig()) {
      return {
        services: 0,
        products: 0,
        posts: 0,
        campaigns: 0,
      };
    }

    try {
      const [services, products, posts, campaigns] = await Promise.all([
        prisma.service.count({ where: { isActive: true } }),
        prisma.product.count({ where: { isActive: true } }),
        prisma.blogPost.count({ where: { status: true } }),
        prisma.campaign.count({ where: { isActive: true } }),
      ]);

      return {
        services,
        products,
        posts,
        campaigns,
      };
    } catch (error) {
      console.error("PUBLIC SITE STATS CACHE ERROR:", error);
      return {
        services: 0,
        products: 0,
        posts: 0,
        campaigns: 0,
      };
    }
  },
  ["public-site-stats"],
  {
    revalidate: 3600,
    tags: ["services", "products", "blog-posts", "campaigns"],
  },
);
