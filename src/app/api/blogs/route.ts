import { hasDatabaseConfig } from "@/lib/prisma";
import {
  getLocalizedBlogPostValue,
  getPublishedBlogPosts,
} from "@/lib/site/blogs";
import {
  resolveSiteLocale,
  siteDbUnavailableResponse,
  siteJsonSuccess,
} from "@/lib/site/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!hasDatabaseConfig()) {
    return siteDbUnavailableResponse();
  }

  const { searchParams } = new URL(request.url);
  const locale = resolveSiteLocale(searchParams.get("locale"));
  const posts = await getPublishedBlogPosts();

  const localizedPosts = posts.map((post) => {
    const localized = getLocalizedBlogPostValue(locale, post);

    return {
      id: post.id,
      title: localized.title,
      slug: localized.slug,
      meta: localized.meta,
      description: localized.description,
      body: localized.body,
      imageUrl: post.imageUrl,
      imageAlt: localized.imageAlt,
      readTimeMin: post.readTimeMin,
      publishedAt: post.publishedAt,
      sortOrder: post.sortOrder,
      galleries: localized.galleries.map((gallery) => ({
        id: gallery.id,
        imageUrl: gallery.imageUrl,
        imageAlt: gallery.imageAlt,
        sortOrder: gallery.sortOrder,
      })),
    };
  });

  return siteJsonSuccess(localizedPosts);
}
