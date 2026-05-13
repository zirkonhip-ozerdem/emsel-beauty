import type { Metadata } from "next";
import Link from "next/link";

import { getLocalizedPath } from "@/i18n/config";
import { getPageMetadata } from "@/i18n/metadata";
import { resolveLocale, type LangRouteParams } from "@/i18n/server";
import { getProductsPageCopy } from "@/lib/site/products-page";
import {
  getLocalizedProductValue,
  getPublishedProducts,
  stripHtmlTags,
} from "@/lib/site/products";
import styles from "./style.module.css";

type ProductsPageProps = {
  params: LangRouteParams;
};

export async function generateMetadata({
  params,
}: ProductsPageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return getPageMetadata(locale, "products");
}

export const revalidate = 3600;

export default async function ProductsPage({ params }: ProductsPageProps) {
  const locale = await resolveLocale(params);
  const headerCopy = getProductsPageCopy(locale);
  const products = await getPublishedProducts();
  const productsPath = getLocalizedPath(locale, "products");

  const allProducts = products.length
    ? products.map((product) => {
        const localized = getLocalizedProductValue(locale, product);

        return {
          title: localized.name,
          description:
            stripHtmlTags(localized.shortDescription) ||
            stripHtmlTags(localized.description),
          imageUrl: product.imageUrl,
          imageAlt: localized.imageAlt || localized.name,
          href: `${productsPath}/${localized.slug}`,
        };
      })
    : headerCopy.extras.map((product) => ({
        title: product.title,
        description: product.description,
        imageUrl: null,
        imageAlt: product.title,
        href: null,
      }));

  return (
    <div className={styles.productsPage}>
      <header className={styles.pageHeader}>
        <p className={styles.pageEyebrow}>{headerCopy.eyebrow}</p>
        <h1 className={styles.pageTitle}>
          {headerCopy.title[0]}
          <br />
          {headerCopy.title[1]}
        </h1>
        <p className={styles.pageSub}>{headerCopy.description}</p>
      </header>

      <div className={styles.productsContent}>
        <div className="grid gap-8 md:grid-cols-3">
          {allProducts.map((product, index) => (
            <article
              key={`${product.title}-${index}`}
              className="group overflow-hidden rounded-[20px] border border-[#e5ded3] bg-[#f5f1ea] shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="h-60 bg-[#e7e2d9]">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>

              <div className="bg-[#f5f1ea] p-5 text-center">
                <h2 className="text-lg font-semibold text-[#3a2f1d]">
                  {product.title}
                </h2>

                <p className="mt-2 text-sm text-[#6b6257]">
                  {product.description}
                </p>

                {product.href ? (
                  <Link href={product.href}>
                    <div className="mt-4 border border-[#e5ded3] p-2">
                      <div className="w-full cursor-pointer bg-[#4b2e1a] py-3 text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#f5f0e6] transition">
                        {headerCopy.detailCta}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="mt-4 border border-[#e5ded3] p-2">
                    <div className="w-full bg-[#4b2e1a] py-3 text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#f5f0e6] opacity-70">
                      {headerCopy.detailCta}
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
