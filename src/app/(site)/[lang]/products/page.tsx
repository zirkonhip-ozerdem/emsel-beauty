import type { Metadata } from "next";
<<<<<<< HEAD

import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { getDictionary } from "@/i18n/dictionaries";
import { getPageMetadata } from "@/i18n/metadata";
import { resolveLocale, type LangRouteParams } from "@/i18n/server";
=======
import Link from "next/link";

import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getPageMetadata } from "@/i18n/metadata";
import { resolveLocale, type LangRouteParams } from "@/i18n/server";
import styles from "./style.module.css";
>>>>>>> feat/son-islemler

type ProductsPageProps = {
  params: LangRouteParams;
};

<<<<<<< HEAD
=======
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

>>>>>>> feat/son-islemler
export async function generateMetadata({
  params,
}: ProductsPageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return getPageMetadata(locale, "products");
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);
<<<<<<< HEAD
  const headingFont = "font-display";

  return (
    <div className="site-page">
      <PageHero
        locale={locale}
        eyebrow={dictionary.productsPage.hero.eyebrow}
        title={dictionary.productsPage.hero.title}
        description={dictionary.productsPage.hero.description}
        aside={
          <div className="space-y-3">
            {dictionary.productsPage.categories.map((category) => (
              <div key={category.title} className="site-card-plain">
                <p className="site-kicker">{category.title}</p>
                <p className="site-body mt-2">{category.detail}</p>
              </div>
            ))}
          </div>
        }
      />

      <section className="site-section">
        <SectionHeading
          locale={locale}
          eyebrow={dictionary.productsPage.hero.eyebrow}
          title={dictionary.productsPage.hero.title}
          description={dictionary.productsPage.hero.description}
        />
        <div className="site-grid-3">
          {dictionary.productsPage.categories.map((category) => (
            <article key={category.title} className="site-card">
              <h2 className={`${headingFont} text-3xl text-foreground`}>
                {category.title}
              </h2>
              <p className="site-body mt-4">{category.description}</p>
              <p className="mt-5 border-t border-border pt-5 text-sm leading-7 text-foreground">
                {category.detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="site-grid-3">
        {dictionary.productsPage.pillars.map((pillar) => (
          <article key={pillar.title} className="site-card-soft">
            <h3 className="site-title">{pillar.title}</h3>
            <p className="site-body mt-2">{pillar.description}</p>
          </article>
        ))}
      </section>

      <section className="site-section">
        <div className="grid gap-4">
          {dictionary.productsPage.roadmap.map((step, index) => (
            <article
              key={step.title}
              className="grid gap-4 rounded-[28px] border border-border bg-white/75 p-5 md:grid-cols-[72px_minmax(0,1fr)] md:items-start"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-lg font-semibold text-accent-strong">
                0{index + 1}
              </div>
              <div>
                <h3 className="site-title">{step.title}</h3>
                <p className="site-body mt-2">{step.description}</p>
=======
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
>>>>>>> feat/son-islemler
              </div>
            </article>
          ))}
        </div>
<<<<<<< HEAD
      </section>
=======
      </div>
>>>>>>> feat/son-islemler
    </div>
  );
}
