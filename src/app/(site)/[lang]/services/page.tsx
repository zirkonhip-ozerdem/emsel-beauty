import Link from "next/link";
import type { Metadata } from "next";
import { getLocalizedPath } from "@/i18n/config";
import { getPageMetadata } from "@/i18n/metadata";
import { resolveLocale, type LangRouteParams } from "@/i18n/server";
import { getServicesPageContent } from "@/lib/site/services-page";
import {
  getLocalizedServiceValue,
  getPublishedServices,
  stripHtmlTags,
} from "@/lib/site/services";
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

export const revalidate = 3600;

export default async function ServicesPage({ params }: ServicesPageProps) {
  const locale = await resolveLocale(params);
  const content = getServicesPageContent(locale);
  const services = await getPublishedServices();
  const serviceCards = services.length
    ? services.map((service) => {
        const localized = getLocalizedServiceValue(locale, service);

        return {
          id: service.id,
          slug: localized.slug,
          title: localized.name,
          img: service.imageUrl,
          category:
            localized.badge ||
            localized.sessionsLabel ||
            content.eyebrow,
          desc:
            stripHtmlTags(localized.shortDescription) ||
            stripHtmlTags(localized.longDescription),
          items: localized.features.slice(0, 4),
        };
      })
    : content.cards.map((card) => ({
        ...card,
        slug: "",
      }));

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
        {serviceCards.map((s) => (
          <Link key={s.id} href={s.slug ? `${getLocalizedPath(locale, "services")}/${s.slug}` : getLocalizedPath(locale, "services")} className="scard" style={{ textDecoration: "none" }}>
            <div className="scard-img-wrap">
              {s.img ? <img className="scard-img" src={s.img} alt={s.title} /> : null}
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
