import type { Metadata } from "next";

import { getPageMetadata } from "@/i18n/metadata";
import { resolveLocale, type LangRouteParams } from "@/i18n/server";
import { getCorporatePageContent } from "@/lib/site/corporate-page";
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

export default async function KurumsalPage({ params }: CorporatePageProps) {
  const locale = await resolveLocale(params);
  const content = getCorporatePageContent(locale);

  return (
    <>
      <div className="kp">
        <div className="kp-header">
          <h1>{content.heroTitle}</h1>
          <div className="kp-rule"><span /><i /><span /></div>
        </div>

        <section className="kp-about">
          <div className="kp-about-grid">
            <div className="kp-text">
              <div className="kp-section-title">{content.about.title}</div>
              {content.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="kp-imgs">
              <img src={content.about.galleryImages?.[0]} alt={content.about.title} />
              <div className="kp-imgs-row">
                <img src={content.about.galleryImages?.[1]} alt={content.about.title} />
                <img src={content.about.galleryImages?.[2]} alt={content.about.title} />
              </div>
            </div>
          </div>
        </section>

        <section className="kp-misyon">
          <div className="kp-misyon-grid">
            <img className="kp-misyon-img" src={content.mission.image} alt={content.mission.title} />
            <div className="kp-text-light">
              <div className="kp-section-title-light">{content.mission.title}</div>
              {content.mission.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="kp-vizyon">
          <div className="kp-vizyon-grid">
            <div className="kp-text">
              <div className="kp-section-title">{content.vision.title}</div>
              {content.vision.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <img className="kp-vizyon-img" src={content.vision.image} alt={content.vision.title} />
          </div>
        </section>

        <section className="kp-stats">
          {content.stats.map((stat) => (
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
