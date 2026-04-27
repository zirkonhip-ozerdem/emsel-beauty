import Link from "next/link";
import type { Metadata } from "next";
import { getLocalizedPath } from "@/i18n/config";
import { getPageMetadata } from "@/i18n/metadata";
import { resolveLocale, type LangRouteParams } from "@/i18n/server";
import { getServicesPageContent } from "@/lib/site/services-page";
import "./style.css";

type ServicesPageProps = {
  params: LangRouteParams;
};

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return getPageMetadata(locale, "services");
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const locale = await resolveLocale(params);
  const content = getServicesPageContent(locale);

  return (
    <div className="services-page">
      <header className="page-header">
        <p className="page-eyebrow">{content.eyebrow}</p>
        <h1 className="page-title">{content.title[0]}<br />{content.title[1]}</h1>
        <p className="page-sub">
          {content.description}
        </p>
      </header>
 
      <section className="services-grid">
        {content.cards.map((s) => (
          <Link key={s.id} href={`${getLocalizedPath(locale, "services")}/${s.id}`} className="scard" style={{ textDecoration: "none" }}>
            <div className="scard-img-wrap">
              <img className="scard-img" src={s.img} alt={s.title} />
              <div className="scard-img-overlay" />
              <span className="scard-cat-pill">{s.category}</span>
              <div className="scard-title-bar"><h2>{s.title}</h2></div>
            </div>
            <div className="scard-body">
              <p className="scard-desc">{s.desc}</p>
              <div className="scard-items">
                {s.items.map((item) => (
                  <div className="scard-item" key={item}>
                    <span>{item}</span>
                    <span className="scard-item-dot" />
                  </div>
                ))}
              </div>
            </div>
            <div className="scard-footer">
              <span className="btn-reserve">{content.detailCta}</span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
