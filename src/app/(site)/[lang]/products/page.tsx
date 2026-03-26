import type { Metadata } from "next";

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

  // EKSTRA ÜRÜNLER
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
    <div className="py-10 bg-[#eae6df]">
      
      {/* MERMER PANEL */}
      <div
        className="max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-2xl p-8"
        style={{
          backgroundImage: "url('/back-1.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

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

                <button className="mt-4 px-4 py-2 bg-[#7a6a4f] text-white rounded transition hover:bg-[#6a5a3f]">
                  Detaylı İncele 
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}