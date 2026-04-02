import type { Metadata } from "next";
import Link from "next/link";

import { getDictionary } from "@/i18n/dictionaries";
import { getPageMetadata } from "@/i18n/metadata";
import { resolveLocale, type LangRouteParams } from "@/i18n/server";

type ProductsPageProps = {
  params: LangRouteParams;
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

  const allProducts = [
    ...dictionary.productsPage.categories,
    ...extraProducts,
  ];

  return (
    <div
      className="py-10"
      style={{
        backgroundImage: "url('/back-1.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 🔥 CONTAINER (KARTLARIN BOZULMAMASI İÇİN) */}
      <div className="max-w-6xl mx-auto p-8">

        {/* ÜRÜNLER */}
        <div className="grid gap-8 md:grid-cols-3">
          {allProducts.map((product) => (
            <article
              key={product.title}
              className="group rounded-[20px] overflow-hidden bg-[#f5f1ea] border border-[#e5ded3] shadow-lg transition duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* IMAGE */}
              <div className="h-60 bg-[#e7e2d9]"></div>

              {/* CONTENT */}
              <div className="p-5 text-center bg-[#f5f1ea]">
                <h2 className="text-lg font-semibold text-[#3a2f1d]">
                  {product.title}
                </h2>

                <p className="mt-2 text-sm text-[#6b6257]">
                  {product.description}
                </p>

                {/* BUTON */}
                <Link href={`/${locale}/products/pageDetail`}>
                  <div className="border border-[#e5ded3] p-2 mt-4">
                    <div
                      className="w-full py-3 text-sm font-semibold uppercase tracking-[0.2em] text-center cursor-pointer transition"
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