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
    title: [string, string];
    description: string;
  }
> = {
  tr: {
    title: ["Urunlerimiz", "Ve Bakim Serileri"],
    description:
      "Bakim rituelinizi tamamlayan formulleri, serileri ve one cikan urunleri tek bir seckide kesfedin.",
  },
  en: {
    title: ["Products", "And Collections"],
    description:
      "Discover formulas, curated collections and standout essentials designed to complete your care ritual.",
  },
  de: {
    title: ["Produkte", "Und Kollektionen"],
    description:
      "Entdecken Sie Formeln, Serien und ausgewahlte Produkte, die Ihre Pflegeroutine stilvoll erganzen.",
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

  const extraProducts = [
    {
      title: "Spa Tuzu",
      description: "Mineral açısından zengin rahatlatıcı banyo tuzu.",
    },
    {
      title: "Aromaterapi Yağı",
      description: "Zihni ve bedeni rahatlatan doğal yağ karışımı.",
    },
    {
      title: "Masaj Kremi",
      description: "Kas gevşetici etkili özel bakım kremi.",
    },
    {
      title: "Yüz Serumu",
      description: "Cilt yenileyici ve parlaklık veren serum.",
    },
    {
      title: "Nemlendirici Krem",
      description: "Yoğun nem sağlayan günlük bakım kremi.",
    },
  ];

  const allProducts = [...dictionary.productsPage.categories, ...extraProducts];

  return (
    <div className={styles.productsPage}>
      <header className={styles.pageHeader}>
        <p className={styles.pageEyebrow}>Emsel Beauty &amp; Care Studio</p>
        <h1 className={styles.pageTitle}>
          {headerCopy.title[0]}
          <br />
          {headerCopy.title[1]}
        </h1>
        <p className={styles.pageSub}>{headerCopy.description}</p>
      </header>

      <div className={styles.productsContent}>
        <div className="grid gap-8 md:grid-cols-3">
          {allProducts.map((product) => (
            <article
              key={product.title}
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
                    <div
                      className="w-full cursor-pointer py-3 text-center text-sm font-semibold uppercase tracking-[0.2em] transition"
                      style={{
                        backgroundColor: "#4b2e1a",
                        color: "#f5f0e6",
                      }}
                    >
                      DETAYLI İNCELE
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
