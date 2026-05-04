import Link from "next/link";
import { notFound } from "next/navigation";

import type { Locale } from "@/i18n/config";
import { siteLocales } from "@/i18n/config";
import {
  getLocalizedServiceValue,
  getPublishedServices,
  stripHtmlTags,
} from "@/lib/site/services";
import "./detail.css";

type PageProps = {
  params: Promise<{
    lang: string;
    id: string;
  }>;
};

const detailCopy: Record<
  Locale,
  {
    home: string;
    services: string;
    duration: string;
    sessions: string;
    processEyebrow: string;
    processTitle: string;
    galleryEyebrow: string;
    galleryTitle: string;
    scopeEyebrow: string;
    scopeTitle: [string, string];
    faqEyebrow: string;
    faqTitle: string;
    relatedEyebrow: string;
    relatedTitle: string;
    reservation: string;
  }
> = {
  tr: {
    home: "Anasayfa",
    services: "Hizmetlerimiz",
    duration: "Sure",
    sessions: "Seans",
    processEyebrow: "Nasil Calisir",
    processTitle: "Uygulama Sureci",
    galleryEyebrow: "Galeri",
    galleryTitle: "Uygulama Goruntuleri",
    scopeEyebrow: "Kapsam",
    scopeTitle: ["Bu Hizmete", "Neler Dahil?"],
    faqEyebrow: "Sorular",
    faqTitle: "Sikca Sorulan Sorular",
    relatedEyebrow: "Diger Hizmetler",
    relatedTitle: "Ilginizi Cekebilir",
    reservation: "Online Rezervasyon",
  },
  en: {
    home: "Home",
    services: "Services",
    duration: "Duration",
    sessions: "Sessions",
    processEyebrow: "How It Works",
    processTitle: "Treatment Journey",
    galleryEyebrow: "Gallery",
    galleryTitle: "Treatment Visuals",
    scopeEyebrow: "Scope",
    scopeTitle: ["What Is", "Included?"],
    faqEyebrow: "Questions",
    faqTitle: "Frequently Asked Questions",
    relatedEyebrow: "Other Services",
    relatedTitle: "You May Also Like",
    reservation: "Online Reservation",
  },
  de: {
    home: "Startseite",
    services: "Unsere Services",
    duration: "Dauer",
    sessions: "Sitzungen",
    processEyebrow: "Ablauf",
    processTitle: "Behandlungsverlauf",
    galleryEyebrow: "Galerie",
    galleryTitle: "Anwendungsbilder",
    scopeEyebrow: "Umfang",
    scopeTitle: ["Was Ist", "Enthalten?"],
    faqEyebrow: "Fragen",
    faqTitle: "Haufig Gestellte Fragen",
    relatedEyebrow: "Weitere Services",
    relatedTitle: "Das Konnte Ihnen Gefallen",
    reservation: "Online Reservierung",
  },
};

export const dynamic = "force-dynamic";

function formatDuration(locale: Locale, minutes: number | null) {
  if (!minutes) {
    return "-";
  }

  if (locale === "en") {
    return `${minutes} min`;
  }

  if (locale === "de") {
    return `${minutes} min`;
  }

  return `${minutes} dk`;
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { id, lang } = await params;

  if (!siteLocales.includes(lang as Locale)) {
    notFound();
  }

  const locale = lang as Locale;
  const copy = detailCopy[locale];
  const services = await getPublishedServices();
  const service = services.find((item) => item.id === Number(id));

  if (!service) {
    notFound();
  }

  const localized = getLocalizedServiceValue(locale, service);
  const related = services.filter((item) => item.id !== service.id).slice(0, 3);
  const summary =
    stripHtmlTags(localized.shortDescription) ||
    stripHtmlTags(localized.longDescription);
  const heroDescription = localized.longDescription || localized.shortDescription || "";

  return (
    <>
      <div className="detail-breadcrumb">
        <Link href={`/${locale}`}>{copy.home}</Link>
        <span className="detail-breadcrumb-sep">/</span>
        <Link href={`/${locale}/services`}>{copy.services}</Link>
        <span className="detail-breadcrumb-sep">/</span>
        <span>{localized.name}</span>
      </div>

      <section className="detail-hero">
        <div className="detail-hero-img">
          {service.imageUrl ? (
            <img
              src={service.imageUrl}
              alt={localized.imageAlt || localized.name}
            />
          ) : null}
        </div>
        <div className="detail-hero-content">
          {localized.badge ? <span className="detail-badge">{localized.badge}</span> : null}
          <p className="detail-eyebrow">
            {localized.sessionsLabel || copy.services}
          </p>
          <h1 className="detail-title">{localized.name}</h1>
          {heroDescription ? (
            <div
              className="detail-desc"
              dangerouslySetInnerHTML={{ __html: heroDescription }}
            />
          ) : null}
          <div className="detail-meta">
            <div className="detail-meta-item">
              <span className="detail-meta-label">{copy.duration}</span>
              <span className="detail-meta-value">
                {formatDuration(locale, service.durationMinutes)}
              </span>
            </div>
            <div className="detail-meta-divider" />
            <div className="detail-meta-item">
              <span className="detail-meta-label">{copy.sessions}</span>
              <span className="detail-meta-value">
                {localized.sessionsLabel || "-"}
              </span>
            </div>
          </div>
          <Link href={`/${locale}/contact`} className="detail-btn-primary">
            {copy.reservation}
          </Link>
        </div>
      </section>

      {localized.features.length > 0 ? (
        <div className="detail-features-strip">
          {localized.features.map((item) => (
            <div className="detail-feature-item" key={item}>
              <span className="detail-feature-dot" />
              <span className="detail-feature-text">{item}</span>
            </div>
          ))}
        </div>
      ) : null}

      {localized.processSteps.length > 0 ? (
        <section className="detail-section">
          <p className="detail-section-eyebrow">{copy.processEyebrow}</p>
          <h2 className="detail-section-title">{copy.processTitle}</h2>
          <div className="detail-process-grid">
            {localized.processSteps.map((step) => (
              <div className="detail-process-card" key={step.id}>
                <div className="detail-process-step">
                  {String(step.stepNumber).padStart(2, "0")}
                </div>
                <div className="detail-process-title">{step.title}</div>
                <div className="detail-process-desc">{step.description}</div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {localized.galleries.length > 0 ? (
        <section className="detail-section detail-section-alt">
          <p className="detail-section-eyebrow">{copy.galleryEyebrow}</p>
          <h2 className="detail-section-title">{copy.galleryTitle}</h2>
          <div className="detail-gallery-grid">
            {localized.galleries.map((gallery, index) => (
              <img
                key={gallery.id}
                src={gallery.imageUrl}
                alt={gallery.imageAlt || `${localized.name} ${index + 1}`}
                className="detail-gallery-img"
              />
            ))}
          </div>
        </section>
      ) : null}

      {summary || localized.features.length > 0 ? (
        <section className="detail-section">
          <div className="detail-items-layout">
            <div>
              <p className="detail-section-eyebrow">{copy.scopeEyebrow}</p>
              <h2 className="detail-section-title">
                {copy.scopeTitle[0]}
                <br />
                {copy.scopeTitle[1]}
              </h2>
              {summary ? <p className="detail-items-sub">{summary}</p> : null}
            </div>
            <ul className="detail-items-list">
              {localized.features.map((item) => (
                <li key={item}>
                  <span>{item}</span>
                  <span className="detail-item-dot" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {localized.faqs.length > 0 ? (
        <section className="detail-section detail-section-alt">
          <p className="detail-section-eyebrow">{copy.faqEyebrow}</p>
          <h2 className="detail-section-title">{copy.faqTitle}</h2>
          <div className="detail-faq-list">
            {localized.faqs.map((faq) => (
              <details className="detail-faq-item" key={faq.id}>
                <summary className="detail-faq-q">
                  <span>{faq.question}</span>
                  <span className="detail-faq-icon">+</span>
                </summary>
                <div className="detail-faq-a">{faq.answer}</div>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="detail-section">
          <p className="detail-section-eyebrow">{copy.relatedEyebrow}</p>
          <h2 className="detail-section-title">{copy.relatedTitle}</h2>
          <div className="detail-related-grid">
            {related.map((item) => {
              const relatedLocalized = getLocalizedServiceValue(locale, item);

              return (
                <Link
                  key={item.id}
                  href={`/${locale}/services/${item.id}`}
                  className="detail-rcard"
                >
                  <div className="detail-rcard-img-wrap">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={relatedLocalized.imageAlt || relatedLocalized.name}
                        className="detail-rcard-img"
                      />
                    ) : null}
                    <span className="detail-rcard-cat">
                      {relatedLocalized.badge || relatedLocalized.sessionsLabel || copy.services}
                    </span>
                  </div>
                  <div className="detail-rcard-body">
                    <div className="detail-rcard-title">{relatedLocalized.name}</div>
                    <div className="detail-rcard-desc">
                      {stripHtmlTags(relatedLocalized.shortDescription)}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}
    </>
  );
}
