import Image from "next/image";
import Link from "next/link";

import { resolveLocale, type LangRouteParams } from "@/i18n/server";

import "./style.css";

type ProductDetailPageProps = {
  params: LangRouteParams;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const locale = await resolveLocale(params);

  return (
    <section className="product-detail-page">
      <nav className="product-detail-breadcrumb" aria-label="Breadcrumb">
        <Link href={`/${locale}`}>Ana Sayfa</Link>
        <span aria-hidden>›</span>
        <Link href={`/${locale}/products`}>Ürünler</Link>
        <span aria-hidden>›</span>
        <span>Vücut Masaj Yağı</span>
      </nav>

      <div className="product-detail-layout">
        <div className="product-detail-image-frame">
          <Image
            src="/background/back-1.jpeg"
            alt="Vücut masaj yağı ürün görseli"
            width={800}
            height={530}
            className="product-detail-image"
            priority
          />
        </div>

        <div className="product-detail-content">
          <h1 className="product-detail-title">VÜCUT MASAJ YAĞI</h1>
          <h2 className="product-detail-subtitle">ÜRÜN AÇIKLAMASI</h2>
          <p className="product-detail-description">
            Vücut masaj yağı, cilt besleyici doğal yağlar içeren özel formülü
            ile rahatlatıcı ve besleyici bir bakım sağlar. Yorgunluğu giderir ve
            cildi nemlendirir.
          </p>
        </div>
      </div>
    </section>
  );
}