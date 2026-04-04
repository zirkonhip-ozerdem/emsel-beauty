import type { Metadata } from "next";
import Link from "next/link";

import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getPageMetadata } from "@/i18n/metadata";
import { resolveLocale, type LangRouteParams } from "@/i18n/server";
import styles from "./style.module.css";

type ProductsPageProps = {
  params: LangRouteParams;
};

const PRODUCTS_HEADER_COPY: Record<
  Locale,
  {
    eyebrow: string;
    title: [string, string];
    description: string;
    detailCta: string;
    extras: Array<{
      title: string;
      description: string;
    }>;
  }
> = {
  tr: {
    eyebrow: "Emsel Beauty & Care Studio",
    title: ["Urunlerimiz", "Ve Bakim Serileri"],
    description:
      "Bakim rituelinizi tamamlayan formulleri, serileri ve one cikan urunleri tek bir seckide kesfedin.",
    detailCta: "Detayli Incele",
    extras: [
      {
        title: "Spa Tuzu",
        description: "Mineral acisindan zengin, rahatlatici banyo tuzu.",
      },
      {
        title: "Aromaterapi Yagi",
        description: "Zihni ve bedeni sakinlestiren dogal yag karisimi.",
      },
      {
        title: "Masaj Kremi",
        description: "Kaslari rahatlatan ozel bakim kremi.",
      },
      {
        title: "Yuz Serumu",
        description: "Cilde parlaklik ve yenilenme hissi kazandiran serum.",
      },
      {
        title: "Nemlendirici Krem",
        description: "Gunluk kullanim icin yogun nem destegi sunan krem.",
      },
    ],
  },
  en: {
    eyebrow: "Emsel Beauty & Care Studio",
    title: ["Products", "And Collections"],
    description:
      "Discover formulas, curated collections and standout essentials designed to complete your care ritual.",
    detailCta: "Explore Details",
    extras: [
      {
        title: "Spa Salt",
        description: "Mineral-rich bath salt designed for deep relaxation.",
      },
      {
        title: "Aromatherapy Oil",
        description: "A calming natural oil blend for body and mind.",
      },
      {
        title: "Massage Cream",
        description: "A special care cream with a relaxing touch.",
      },
      {
        title: "Face Serum",
        description: "A glow-boosting serum that refreshes the skin.",
      },
      {
        title: "Moisturizing Cream",
        description: "An everyday cream that delivers lasting hydration.",
      },
    ],
  },
  de: {
    eyebrow: "Emsel Beauty & Care Studio",
    title: ["Produkte", "Und Kollektionen"],
    description:
      "Entdecken Sie Formeln, Serien und ausgewahlte Produkte, die Ihre Pflegeroutine stilvoll erganzen.",
    detailCta: "Details Ansehen",
    extras: [
      {
        title: "Spa-Salz",
        description: "Mineralreiches Badesalz fur entspannende Rituale.",
      },
      {
        title: "Aromatherapie-Ol",
        description: "Eine naturliche Olmischung fur Ruhe und Balance.",
      },
      {
        title: "Massagecreme",
        description: "Pflegecreme mit angenehm entspannender Wirkung.",
      },
      {
        title: "Gesichtsserum",
        description: "Ein Serum fur mehr Ausstrahlung und Frische.",
      },
      {
        title: "Feuchtigkeitscreme",
        description: "Tagliche Pflege mit intensiver Feuchtigkeitswirkung.",
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: ProductsPageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return getPageMetadata(locale, "products");
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);
  const headerCopy = PRODUCTS_HEADER_COPY[locale];

  const allProducts = [
    ...dictionary.productsPage.categories.map((category) => ({
      title: category.title,
      description: category.description,
    })),
    ...headerCopy.extras,
  ];

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
              <div className="h-60 bg-[#e7e2d9]" />

              <div className="bg-[#f5f1ea] p-5 text-center">
                <h2 className="text-lg font-semibold text-[#3a2f1d]">
                  {product.title}
                </h2>

                <p className="mt-2 text-sm text-[#6b6257]">
                  {product.description}
                </p>

                <Link href={`/${locale}/products/pageDetail`}>
                  <div className="mt-4 border border-[#e5ded3] p-2">
                    <div className="w-full cursor-pointer bg-[#4b2e1a] py-3 text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#f5f0e6] transition">
                      {headerCopy.detailCta}
                    </div>
                  </div>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
