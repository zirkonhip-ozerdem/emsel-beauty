import type { Locale } from "@/i18n/config";

type ProductFallbackCard = {
  title: string;
  description: string;
};

type ProductsPageCopy = {
  eyebrow: string;
  title: [string, string];
  description: string;
  detailCta: string;
  breadcrumbHome: string;
  breadcrumbProducts: string;
  detailHeading: string;
  extras: ProductFallbackCard[];
};

const productsPageCopy: Record<Locale, ProductsPageCopy> = {
  tr: {
    eyebrow: "Emsel Beauty & Care Studio",
    title: ["Ürünlerimiz", "Ve Bakım Serileri"],
    description:
      "Bakım ritüelinizi tamamlayan formülleri, serileri ve öne çıkan ürünleri tek bir seçkide keşfedin.",
    detailCta: "Detaylı İncele",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbProducts: "Ürünlerimiz",
    detailHeading: "Ürün Açıklaması",
    extras: [
      { title: "Spa Tuzu", description: "Mineral açısından zengin, rahatlatıcı banyo tuzu." },
      { title: "Aromaterapi Yağı", description: "Zihni ve bedeni sakinleştiren doğal yağ karışımı." },
      { title: "Masaj Kremi", description: "Kasları rahatlatan özel bakım kremi." },
      { title: "Yüz Serumu", description: "Cilde parlaklık ve yenilenme hissi kazandıran serum." },
      { title: "Nemlendirici Krem", description: "Günlük kullanım için yoğun nem desteği sunan krem." },
    ],
  },
  en: {
    eyebrow: "Emsel Beauty & Care Studio",
    title: ["Products", "And Collections"],
    description:
      "Discover formulas, curated collections and standout essentials designed to complete your care ritual.",
    detailCta: "Explore Details",
    breadcrumbHome: "Home",
    breadcrumbProducts: "Products",
    detailHeading: "Product Description",
    extras: [
      { title: "Spa Salt", description: "Mineral-rich bath salt designed for deep relaxation." },
      { title: "Aromatherapy Oil", description: "A calming natural oil blend for body and mind." },
      { title: "Massage Cream", description: "A special care cream with a relaxing touch." },
      { title: "Face Serum", description: "A glow-boosting serum that refreshes the skin." },
      { title: "Moisturizing Cream", description: "An everyday cream that delivers lasting hydration." },
    ],
  },
  de: {
    eyebrow: "Emsel Beauty & Care Studio",
    title: ["Produkte", "Und Kollektionen"],
    description:
      "Entdecken Sie Formeln, Serien und ausgewahlte Produkte, die Ihre Pflegeroutine stilvoll erganzen.",
    detailCta: "Details Ansehen",
    breadcrumbHome: "Startseite",
    breadcrumbProducts: "Produkte",
    detailHeading: "Produktbeschreibung",
    extras: [
      { title: "Spa-Salz", description: "Mineralreiches Badesalz fur entspannende Rituale." },
      { title: "Aromatherapie-Ol", description: "Eine naturliche Olmischung fur Ruhe und Balance." },
      { title: "Massagecreme", description: "Pflegecreme mit angenehm entspannender Wirkung." },
      { title: "Gesichtsserum", description: "Ein Serum fur mehr Ausstrahlung und Frische." },
      { title: "Feuchtigkeitscreme", description: "Tagliche Pflege mit intensiver Feuchtigkeitswirkung." },
    ],
  },
};

export function getProductsPageCopy(locale: Locale) {
  return productsPageCopy[locale];
}
