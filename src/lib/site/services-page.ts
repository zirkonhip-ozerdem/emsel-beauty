import type { Locale } from "@/i18n/config";

export type ServicePageCard = {
  id: number;
  category: string;
  title: string;
  desc: string;
  img: string;
  items: string[];
};

type ServicesPageContent = {
  eyebrow: string;
  title: [string, string];
  description: string;
  detailCta: string;
  cards: ServicePageCard[];
};

const servicesPageContent: Record<Locale, ServicesPageContent> = {
  tr: {
    eyebrow: "Emsel Beauty & Care Studio",
    title: ["Profesyonel Güzellik", "Hizmetleri"],
    description:
      "Uzman ekibimiz ile cildinizin ve güzelliğinizin en iyi halini keşfedin. Her hizmet, sizin için özel olarak tasarlandı.",
    detailCta: "Detayları Gör",
    cards: [
      {
        id: 1,
        category: "Cilt Bakımı",
        title: "Derinlemesine Cilt Bakımı",
        desc: "Cilt tipinize özel hazırlanan temizleme, peeling ve nemlendirme protokolleri ile cildinizi yenileyin.",
        img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
        items: ["Derin Temizlik Protokolü", "Peeling & Nemlendirme", "Cilt Tonu Eşitleme", "Parlaklık Serumu"],
      },
      {
        id: 2,
        category: "Kalıcı Makyaj",
        title: "Microblading & Kaş Tasarımı",
        desc: "Yüz hatlarınıza uygun, doğal görünümlü kaş tasarımı ve uzun süreli bakımlı görünüm.",
        img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
        items: ["Kaş Analizi & Tasarım", "Microblading Uygulaması", "Renk Pigmentasyonu", "Şekil Düzeltme"],
      },
      {
        id: 3,
        category: "Lazer & Epilasyon",
        title: "Lazer Epilasyon",
        desc: "Güvenli ve etkili kalıcı tüy azaltma protokolleri ile tüm cilt tonlarına uygun uygulama.",
        img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80",
        items: ["Diode Lazer Teknolojisi", "Tüm Cilt Tonları", "Ağrısız Uygulama", "Kalıcı Sonuçlar"],
      },
      {
        id: 4,
        category: "Vücut Bakımı",
        title: "Aromaterapi Masajı",
        desc: "Özel yağlar ile kas gerginliğini gideren ve zihni dinlendiren bütüncül terapi.",
        img: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80",
        items: ["İsveç Masajı", "Aromaterapi Yağları", "Lenf Drenajı", "Sırt & Boyun Odaklı"],
      },
    ],
  },
  en: {
    eyebrow: "Emsel Beauty & Care Studio",
    title: ["Professional Beauty", "Services"],
    description:
      "Discover the finest version of your skin and beauty with our expert-led, thoughtfully designed rituals.",
    detailCta: "View Details",
    cards: [
      {
        id: 1,
        category: "Skin Care",
        title: "Deep Skin Renewal",
        desc: "Tailored cleansing, exfoliation and hydration protocols created for your skin's unique needs.",
        img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
        items: ["Deep Cleansing", "Peeling & Hydration", "Tone Balancing", "Glow Serum"],
      },
      {
        id: 2,
        category: "Permanent Makeup",
        title: "Microblading & Brow Design",
        desc: "Natural-looking brow design crafted to complement your facial features and elevate definition.",
        img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
        items: ["Brow Analysis", "Microblading Session", "Pigment Tone", "Shape Correction"],
      },
      {
        id: 3,
        category: "Laser & Hair Removal",
        title: "Laser Hair Removal",
        desc: "Safe and effective long-term hair reduction protocols suitable for a wide range of skin tones.",
        img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80",
        items: ["Diode Technology", "All Skin Tones", "Comfort Session", "Lasting Results"],
      },
      {
        id: 4,
        category: "Body Care",
        title: "Aromatherapy Massage",
        desc: "A holistic massage ritual designed to relax the body, release tension and calm the mind.",
        img: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80",
        items: ["Swedish Massage", "Essential Oils", "Lymph Support", "Back & Neck Focus"],
      },
    ],
  },
  de: {
    eyebrow: "Emsel Beauty & Care Studio",
    title: ["Professionelle Beauty", "Behandlungen"],
    description:
      "Entdecken Sie mit unserem Expertenteam die beste Version Ihrer Haut und Ihres Wohlgefuhls.",
    detailCta: "Details Ansehen",
    cards: [
      {
        id: 1,
        category: "Hautpflege",
        title: "Intensive Hautpflege",
        desc: "Individuell abgestimmte Reinigungs-, Peeling- und Feuchtigkeitsrituale fur strahlende Haut.",
        img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
        items: ["Tiefenreinigung", "Peeling & Pflege", "Teint-Ausgleich", "Glow-Serum"],
      },
      {
        id: 2,
        category: "Permanent Make-up",
        title: "Microblading & Brauendesign",
        desc: "Naturliche Brauenformung, abgestimmt auf Ihre Gesichtszuege und Ihren Ausdruck.",
        img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
        items: ["Brauenanalyse", "Microblading", "Pigmentwahl", "Formkorrektur"],
      },
      {
        id: 3,
        category: "Laser & Epilation",
        title: "Laser-Epilation",
        desc: "Sichere und wirksame Haarreduktion mit modernen Protokollen fur verschiedene Hauttypen.",
        img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80",
        items: ["Diodenlaser", "Alle Hauttone", "Schonende Anwendung", "Langfristige Wirkung"],
      },
      {
        id: 4,
        category: "Korperpflege",
        title: "Aromatherapie-Massage",
        desc: "Ein ganzheitliches Ritual zur Lockerung der Muskulatur und fur tiefe Entspannung.",
        img: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80",
        items: ["Schwedische Massage", "Aromaole", "Lymphfluss", "Rucken & Nacken"],
      },
    ],
  },
};

export function getServicesPageContent(locale: Locale) {
  return servicesPageContent[locale];
}
