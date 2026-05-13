import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getLocalizedPath } from "@/i18n/config";
import { getPageMetadata } from "@/i18n/metadata";
import { resolveLocale, type LangRouteParams } from "@/i18n/server";
import { getProductsPageCopy } from "@/lib/site/products-page";
import {
  getLocalizedProductValue,
  getPublishedProducts,
  stripHtmlTags,
} from "@/lib/site/products";
import "../pageDetail/style.css";

type ProductDetailPageProps = {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
};

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await resolveLocale(params as LangRouteParams);
  const products = await getPublishedProducts();
  const product = products.find((item) => {
    const localized = getLocalizedProductValue(locale, item);
    return localized.slug === slug;
  });

  if (!product) {
    return getPageMetadata(locale, "products");
  }

  const localized = getLocalizedProductValue(locale, product);

  return {
    title: `${localized.name} | Emsel Beauty`,
    description:
      stripHtmlTags(localized.shortDescription) ||
      stripHtmlTags(localized.description),
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const locale = await resolveLocale(params as LangRouteParams);
  const copy = getProductsPageCopy(locale);
  const productsPath = getLocalizedPath(locale, "products");
  const products = await getPublishedProducts();

  const product = products.find((item) => {
    const localized = getLocalizedProductValue(locale, item);
    return localized.slug === slug;
  });

  if (!product) {
    notFound();
  }

  const localized = getLocalizedProductValue(locale, product);
  const heroImage = product.imageUrl || "/background/back-1.jpeg";
  const heroAlt = localized.imageAlt || localized.name;
  const summary =
    stripHtmlTags(localized.shortDescription) ||
    stripHtmlTags(localized.description);

  return (
    <section className="product-detail-page">
      <nav className="product-detail-breadcrumb" aria-label="Breadcrumb">
        <Link href={`/${locale}`}>{copy.breadcrumbHome}</Link>
        <span aria-hidden>›</span>
        <Link href={productsPath}>{copy.breadcrumbProducts}</Link>
        <span aria-hidden>›</span>
        <span>{localized.name}</span>
      </nav>

      <div className="product-detail-layout">
        <div>
          <div className="product-detail-image-frame">
            <img
              src={heroImage}
              alt={heroAlt}
              className="product-detail-image"
            />
          </div>

          {localized.galleries.length > 0 ? (
            <div className="product-detail-gallery">
              {localized.galleries.map((gallery) => (
                <div
                  key={gallery.id}
                  className="product-detail-gallery-frame"
                >
                  <img
                    src={gallery.imageUrl}
                    alt={gallery.imageAlt || localized.name}
                    className="product-detail-gallery-image"
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="product-detail-content">
          <h1 className="product-detail-title">{localized.name}</h1>

          {summary ? (
            <p className="product-detail-summary">{summary}</p>
          ) : null}

          <h2 className="product-detail-subtitle">{copy.detailHeading}</h2>
          <div
            className="product-detail-richtext"
            dangerouslySetInnerHTML={{ __html: localized.description }}
          />
        </div>
      </div>
    </section>
  );
}
