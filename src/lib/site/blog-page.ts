import type { Locale } from "@/i18n/config";

export const BLOG_IMAGES = [
  "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80",
] as const;

type BlogPageUi = {
  heroTitle: [string, string];
  subtitle: string;
  labels: {
    readMore: string;
    continueReading: string;
    prev: string;
    next: string;
    page: string;
    loading: string;
  };
};

const blogPageUi: Record<Locale, BlogPageUi> = {
  tr: {
    heroTitle: [
      "Blog, markanin sadece anlattigi degil",
      "yon verdigi bir alana donusuyor.",
    ],
    subtitle: "Bakim, estetik ve marka dunyasindan seckiler",
    labels: {
      readMore: "Devamini Oku",
      continueReading: "Daha Fazla Goster",
      prev: "Onceki",
      next: "Sonraki",
      page: "Sayfa",
      loading: "Yukleniyor...",
    },
  },
  en: {
    heroTitle: [
      "The journal becomes more than a voice,",
      "it becomes a direction for the brand.",
    ],
    subtitle: "Curated stories on beauty, care and brand culture",
    labels: {
      readMore: "Read More",
      continueReading: "Load More",
      prev: "Previous",
      next: "Next",
      page: "Page",
      loading: "Loading...",
    },
  },
  de: {
    heroTitle: [
      "Der Blog wird nicht nur zur Stimme,",
      "sondern zur Richtung der Marke.",
    ],
    subtitle: "Ausgewahlte Inhalte aus Beauty, Care und Markenwelt",
    labels: {
      readMore: "Mehr Lesen",
      continueReading: "Mehr Anzeigen",
      prev: "Zuruck",
      next: "Weiter",
      page: "Seite",
      loading: "Wird geladen...",
    },
  },
};

export function getBlogPageUi(locale: Locale) {
  return blogPageUi[locale];
}
