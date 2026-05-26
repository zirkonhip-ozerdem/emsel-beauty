import type { Locale } from "@/i18n/config";

type CorporateSection = {
  title: string;
  paragraphs: string[];
  image?: string;
  galleryImages?: string[];
};

type CorporateStat = {
  value: string;
  label: string;
};

export type CorporatePageContent = {
  heroTitle: string;
  about: CorporateSection;
  mission: CorporateSection;
  vision: CorporateSection;
  stats: CorporateStat[];
};

const corporatePageContent: Record<Locale, CorporatePageContent> = {
  tr: {
    heroTitle: "Hakkımızda & Misyonumuz",
    about: {
      title: "Hakkımızda",
      paragraphs: [
        "Emsel Beauty & Care Studio, 2018 yılından bu yana İstanbul'un kalbinde profesyonel güzellik hizmetleri sunmaktadır. Uzman ekibimiz ve en son teknolojik ekipmanlarımızla her müşterimize özel, kişiselleştirilmiş bir deneyim sunuyoruz.",
        "Güzelliğin sadece dışsal değil, içsel bir yolculuk olduğuna inanıyoruz. Her seansımızda müşterilerimizin kendilerini en iyi hissetmelerini sağlamayı amaçlıyoruz.",
        "Yüksek kalite standartları, güven ve şeffaflık ilkeleriyle hareket eden ekibimiz, sizin için en iyi deneyimi yaratmak adına sürekli kendini geliştirmektedir.",
      ],
      galleryImages: [
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
        "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=300&q=80",
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&q=80",
      ],
    },
    mission: {
      title: "Misyonumuz",
      paragraphs: [
        "En yüksek kalite standartlarında, uzman ekibimizle her müşterimizin doğal güzelliğini ön plana çıkarmak; güven, şeffaflık ve mükemmellik ilkeleriyle hizmet vermek temel misyonumuzdur.",
        "Her müşterimizin benzersiz olduğuna inanıyor, kişiye özel çözümler sunuyoruz. Kullandığımız ürünler ve uygulanan teknikler, uluslararası standartlara uygun olarak özenle seçilmektedir.",
      ],
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80",
    },
    vision: {
      title: "Vizyonumuz",
      paragraphs: [
        "Türkiye'nin en güvenilir ve yenilikçi güzellik merkezi olmak; her kadının kendini en iyi hissedeceği, kişiselleştirilmiş deneyimler sunan bir marka haline gelmek vizyonumuzdur.",
        "Sektördeki gelişmeleri yakından takip ederek hizmetlerimizi sürekli yeniliyor, müşterilerimize her zaman en güncel ve etkili çözümleri sunuyoruz.",
      ],
      image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=600&q=80",
    },
    stats: [
      { value: "6+", label: "Yıllık Deneyim" },
      { value: "2.500+", label: "Mutlu Müşteri" },
      { value: "15+", label: "Uzman Kadro" },
      { value: "20+", label: "Hizmet Çeşidi" },
    ],
  },
  en: {
    heroTitle: "About Us & Our Mission",
    about: {
      title: "About Us",
      paragraphs: [
        "Since 2018, Emsel Beauty & Care Studio has been offering professional beauty rituals in the heart of İstanbul with a refined and personal approach.",
        "We believe beauty is both an outer and inner journey. Every session is designed to help our guests feel their absolute best.",
        "With a commitment to quality, trust and transparency, our team continuously evolves to craft the best possible experience.",
      ],
      galleryImages: [
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
        "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=300&q=80",
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&q=80",
      ],
    },
    mission: {
      title: "Our Mission",
      paragraphs: [
        "Our mission is to highlight natural beauty through expert-led care while serving every guest with trust, clarity and excellence.",
        "We believe every guest is unique and deserves tailored solutions, supported by carefully selected products and globally aligned techniques.",
      ],
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80",
    },
    vision: {
      title: "Our Vision",
      paragraphs: [
        "Our vision is to become one of Türkiye's most trusted and innovative beauty destinations, known for personal and memorable care experiences.",
        "By following industry developments closely, we continuously renew our service approach and offer up-to-date, effective solutions.",
      ],
      image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=600&q=80",
    },
    stats: [
      { value: "6+", label: "Years of Experience" },
      { value: "2,500+", label: "Happy Guests" },
      { value: "15+", label: "Expert Team" },
      { value: "20+", label: "Service Types" },
    ],
  },
  de: {
    heroTitle: "Uber Uns & Unsere Mission",
    about: {
      title: "Uber Uns",
      paragraphs: [
        "Seit 2018 bietet Emsel Beauty & Care Studio im Herzen İstanbuls professionelle Beauty-Rituale mit personlicher und stilvoller Betreuung an.",
        "Wir glauben, dass Schonheit sowohl eine aussere als auch eine innere Reise ist. Jede Sitzung soll dazu beitragen, dass sich unsere Gaste von ihrer besten Seite fuhlen.",
        "Mit hohen Qualitatsstandards, Vertrauen und Transparenz entwickelt sich unser Team standig weiter, um das bestmogliche Erlebnis zu schaffen.",
      ],
      galleryImages: [
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
        "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=300&q=80",
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&q=80",
      ],
    },
    mission: {
      title: "Unsere Mission",
      paragraphs: [
        "Unsere Mission ist es, naturliche Schonheit mit fachkundiger Pflege hervorzuheben und jede Gastebeziehung auf Vertrauen, Klarheit und Exzellenz aufzubauen.",
        "Wir glauben, dass jede Person einzigartig ist und individuelle Losungen verdient, gestutzt durch sorgfaltig ausgewahlte Produkte und moderne Techniken.",
      ],
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80",
    },
    vision: {
      title: "Unsere Vision",
      paragraphs: [
        "Unsere Vision ist es, zu einem der vertrauenswurdigsten und innovativsten Beauty-Zentren der Turkei zu werden, bekannt fur personliche Erlebnisse.",
        "Durch die genaue Beobachtung von Branchenentwicklungen erneuern wir unsere Dienstleistungen standig und bieten zeitgemasse, wirksame Losungen an.",
      ],
      image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=600&q=80",
    },
    stats: [
      { value: "6+", label: "Jahre Erfahrung" },
      { value: "2.500+", label: "Zufriedene Gaste" },
      { value: "15+", label: "Expertenteam" },
      { value: "20+", label: "Servicearten" },
    ],
  },
};

export function getCorporatePageContent(locale: Locale) {
  return corporatePageContent[locale];
}
