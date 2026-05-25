"use client";

import Link from "next/link";
import { useEffect, useEffectEvent, useRef, useState } from "react";

export type HomeHeroSlide = {
  kicker: string;
  title: string;
  description: string;
  cta: string;
  image: string;
  leftImages: [string, string];
  rightImages: [string, string];
};

type HomeTreatment = {
  title: string;
  image: string;
  href?: string;
};

type HomeHeroSliderProps = {
  slides: HomeHeroSlide[];
  ctaHref: string;
  treatmentsTitle: string;
  treatments: HomeTreatment[];
};

export function HomeHeroSlider({
  slides,
  ctaHref,
  treatmentsTitle,
  treatments,
}: HomeHeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollTreatmentsPrev, setCanScrollTreatmentsPrev] = useState(false);
  const [canScrollTreatmentsNext, setCanScrollTreatmentsNext] = useState(true);
  const treatmentViewportRef = useRef<HTMLDivElement | null>(null);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const goToNextSlide = useEffectEvent(() => {
    setActiveIndex((current) => (current + 1) % slides.length);
  });

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      goToNextSlide();
    }, 5500);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [goToNextSlide, slides.length]);

  const syncTreatmentArrows = useEffectEvent(() => {
    const viewport = treatmentViewportRef.current;

    if (!viewport) {
      return;
    }

    const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth - 2;

    setCanScrollTreatmentsPrev(viewport.scrollLeft > 2);
    setCanScrollTreatmentsNext(viewport.scrollLeft < maxScrollLeft);
  });

  useEffect(() => {
    const viewport = treatmentViewportRef.current;

    if (!viewport) {
      return;
    }

    const handleSync = () => {
      syncTreatmentArrows();
    };

    handleSync();
    viewport.addEventListener("scroll", handleSync, { passive: true });
    window.addEventListener("resize", handleSync);

    return () => {
      viewport.removeEventListener("scroll", handleSync);
      window.removeEventListener("resize", handleSync);
    };
  }, [syncTreatmentArrows, treatments.length]);

  const scrollTreatments = (direction: "prev" | "next") => {
    const viewport = treatmentViewportRef.current;

    if (!viewport) {
      return;
    }

    const scrollAmount = Math.max(viewport.clientWidth * 0.76, 220);

    viewport.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section className="home-hero-shell">
        <div className="home-slider-stage">
          {slides.map((slide, index) => {
            const active = index === activeIndex;

            return (
              <article
                key={`${slide.title}-${index}`}
                className={`home-hero-slide ${active ? "is-active" : ""}`}
                aria-hidden={!active}
              >
                <div
                  className="home-hero-slide-image"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(45, 33, 17, 0.18), rgba(45, 33, 17, 0.46)), url(${slide.image})`,
                  }}
                />

                <div className="home-hero-inner">
                  <div className="home-hero-copy">
                    <span className="home-hero-kicker">{slide.kicker}</span>
                    <h1 className="home-hero-title">{slide.title}</h1>
                    <p className="home-hero-description">{slide.description}</p>
                    <Link href={ctaHref} className="home-hero-button">
                      {slide.cta}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}

          <div className="home-slider-dots" aria-label="Slider navigasyonu">
            {slides.map((slide, index) => {
              const active = index === activeIndex;

              return (
                <button
                  key={`${slide.title}-dot`}
                  type="button"
                  className={`home-slider-dot ${active ? "is-active" : ""}`}
                  aria-label={`${index + 1}. slayta git`}
                  aria-pressed={active}
                  onClick={() => goToSlide(index)}
                />
              );
            })}
          </div>
        </div>
      </section>

      {treatments.length > 0 ? (
        <section className="home-treatment-shell">
          <div className="home-treatment-panel">
            <p className="home-panel-title">{treatmentsTitle}</p>
            <div className="home-treatment-carousel">
              <button
                type="button"
                className="home-treatment-arrow"
                aria-label="Bakimlari sola kaydir"
                onClick={() => scrollTreatments("prev")}
                disabled={!canScrollTreatmentsPrev}
              >
                <span aria-hidden="true">{"<"}</span>
              </button>

              <div className="home-treatment-viewport" ref={treatmentViewportRef}>
                <div className="home-treatment-track">
                  {treatments.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href ?? ctaHref}
                      className="home-treatment-card"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(56, 39, 19, 0.08), rgba(56, 39, 19, 0.42)), url(${item.image})`,
                      }}
                    >
                      <span className="home-treatment-card-title">{item.title}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="home-treatment-arrow"
                aria-label="Bakimlari saga kaydir"
                onClick={() => scrollTreatments("next")}
                disabled={!canScrollTreatmentsNext}
              >
                <span aria-hidden="true">{">"}</span>
              </button>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
