import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";

import { getPageMetadata } from "@/i18n/metadata";
import { resolveLocale, type LangRouteParams } from "@/i18n/server";
import { getCorporatePageContent } from "@/lib/site/corporate-page";
import { getPublicSiteStats } from "@/lib/site/stats";
import { getLocalizedWhoValue, getPublishedWhoSections } from "@/lib/site/who";
import "./style.css";

type CorporatePageProps = {
  params: LangRouteParams;
};

export async function generateMetadata({
  params,
}: CorporatePageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return getPageMetadata(locale, "corporate");
}

export const revalidate = 3600;

const statsLabels: Record<
  Locale,
  [string, string, string, string]
> = {
  tr: ["Aktif Hizmet", "Seçili Ürün", "Blog Yazısı", "Aktif Kampanya"],
  en: ["Active Service", "Selected Product", "Blog Article", "Active Campaign"],
  de: ["Aktiver Service", "Ausgewahltes Produkt", "Blogbeitrag", "Aktive Kampagne"],
};

function renderParagraphHtml(value: string | null | undefined) {
  if (!value) {
    return [];
  }

  return value
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default async function KurumsalPage({ params }: CorporatePageProps) {
  const locale = await resolveLocale(params);
  const fallback = getCorporatePageContent(locale);
  const [whoSections, stats] = await Promise.all([
    getPublishedWhoSections(),
    getPublicSiteStats(),
  ]);

  const localizedSections = whoSections.map((item) => ({
    ...getLocalizedWhoValue(locale, item),
    imageUrl: item.imageUrl,
  }));
  const aboutSection = localizedSections[0];
  const missionSection = localizedSections[1];
  const visionSection = localizedSections[2];
  const galleryImages = localizedSections
    .map((item) => item.imageUrl)
    .filter((item): item is string => Boolean(item))
    .slice(0, 3);
  const labels = statsLabels[locale];
  const siteStats = [
    { value: `${stats.services}+`, label: labels[0] },
    { value: `${stats.products}+`, label: labels[1] },
    { value: `${stats.posts}+`, label: labels[2] },
    { value: `${stats.campaigns}+`, label: labels[3] },
  ];

  return (
    <>
      <div className="kp">
        <div className="kp-header">
          <h1>{fallback.heroTitle}</h1>
          <div className="kp-rule"><span /><i /><span /></div>
        </div>

        <section className="kp-about">
          <div className="kp-about-grid">
            <div className="kp-text">
              <div className="kp-section-title">
                {aboutSection?.title || fallback.about.title}
              </div>
              {(renderParagraphHtml(aboutSection?.description) || []).length > 0
                ? renderParagraphHtml(aboutSection?.description).map((paragraph) => (
                    <div
                      key={paragraph}
                      dangerouslySetInnerHTML={{ __html: paragraph }}
                    />
                  ))
                : fallback.about.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
            </div>
            <div className="kp-imgs">
              <img
                src={galleryImages[0] || fallback.about.galleryImages?.[0]}
                alt={aboutSection?.title || fallback.about.title}
              />
              <div className="kp-imgs-row">
                <img
                  src={galleryImages[1] || fallback.about.galleryImages?.[1]}
                  alt={aboutSection?.title || fallback.about.title}
                />
                <img
                  src={galleryImages[2] || fallback.about.galleryImages?.[2]}
                  alt={aboutSection?.title || fallback.about.title}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="kp-misyon">
          <div className="kp-misyon-grid">
            <img
              className="kp-misyon-img"
              src={missionSection?.imageUrl || fallback.mission.image}
              alt={missionSection?.title || fallback.mission.title}
            />
            <div className="kp-text-light">
              <div className="kp-section-title-light">
                {missionSection?.title || fallback.mission.title}
              </div>
              {(renderParagraphHtml(missionSection?.description) || []).length > 0
                ? renderParagraphHtml(missionSection?.description).map((paragraph) => (
                    <div
                      key={paragraph}
                      dangerouslySetInnerHTML={{ __html: paragraph }}
                    />
                  ))
                : fallback.mission.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
            </div>
          </div>
        </section>

        <section className="kp-vizyon">
          <div className="kp-vizyon-grid">
            <div className="kp-text">
              <div className="kp-section-title">
                {visionSection?.title || fallback.vision.title}
              </div>
              {(renderParagraphHtml(visionSection?.description) || []).length > 0
                ? renderParagraphHtml(visionSection?.description).map((paragraph) => (
                    <div
                      key={paragraph}
                      dangerouslySetInnerHTML={{ __html: paragraph }}
                    />
                  ))
                : fallback.vision.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
            </div>
            <img
              className="kp-vizyon-img"
              src={visionSection?.imageUrl || fallback.vision.image}
              alt={visionSection?.title || fallback.vision.title}
            />
          </div>
        </section>

        <section className="kp-stats">
          {siteStats.map((stat) => (
            <div key={stat.label} className="kp-stat">
              <span className="kp-stat-n">{stat.value}</span>
              <span className="kp-stat-l">{stat.label}</span>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
