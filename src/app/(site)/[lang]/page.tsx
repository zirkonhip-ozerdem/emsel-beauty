import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import "./home.css";
import { HomeHeroSlider, type HomeHeroSlide } from "@/components/site/home-hero-slider";
import { getLocalizedPath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getPageMetadata } from "@/i18n/metadata";
import { resolveLocale, type LangRouteParams } from "@/i18n/server";

type HomePageProps = {
  params: LangRouteParams;
};

type HomeShowcaseContent = {
  heroKicker: string;
  heroTitle: string;
  heroDescription: string;
  heroAction: string;
  treatmentsTitle: string;
  treatments: Array<{
    title: string;
    image: string;
  }>;
  storyTitle: string;
  storyDescription: string;
  storyAction: string;
  productsAction: string;
  products: Array<{
    eyebrow: string;
    title: string;
    description: string;
    image: string;
  }>;
};

const heroBackground =
  "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1600&q=80";

const heroRailImages = [
  "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?auto=format&fit=crop&w=600&q=80",
] as const;

const additionalHeroImages = [
  "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1600&q=80",
] as const;

const localizedHeroSlides: Record<Locale, HomeHeroSlide[]> = {
  tr: [
    {
      kicker: "Saf rahatlama ve kişisel bakım",
      title: "Emsel Beauty'nin imza ritüelleriyle sakinliğin en zarif halini keşfedin.",
      description:
        "Bedeni dinlendiren, görünümü rafine eden ve deneyimi yumuşak lüks hissiyle tamamlayan bakım akışları.",
      cta: "Online Rezervasyon",
      image: heroBackground,
      leftImages: [heroRailImages[0], heroRailImages[1]],
      rightImages: [heroRailImages[2], heroRailImages[3]],
    },
    {
      kicker: "Bütünsel spa deneyimi",
      title: "Masaj, bakım ve iç huzuru aynı rafine atmosferde buluşturan özel seanslar.",
      description:
        "Şehir ritmini yavaşlatan, tensel rahatlama ve yumuşak bir bakım hissi bırakan premium akışlar.",
      cta: "Seansları Keşfet",
      image: additionalHeroImages[0],
      leftImages: [heroRailImages[1], heroRailImages[0]],
      rightImages: [heroRailImages[3], heroRailImages[2]],
    },
    {
      kicker: "Şehir içinde kaçış",
      title: "Bedeni hafifleten, zihni sakinleştiren ve görünümü tazeleyen bakım sahnesi.",
      description:
        "Kısa bir mola değil, her detayı düşünülmüş dingin bir spa kompozisyonu sunuyoruz.",
      cta: "Bakımları İncele",
      image: additionalHeroImages[1],
      leftImages: [heroRailImages[2], heroRailImages[1]],
      rightImages: [heroRailImages[0], heroRailImages[3]],
    },
  ],
  en: [
    {
      kicker: "Pure relaxation and care",
      title: "Discover the most refined side of calm through Emsel Beauty's signature rituals.",
      description:
        "Care flows designed to relax the body, elevate the look and wrap the whole experience in a quiet sense of luxury.",
      cta: "Online Reservation",
      image: heroBackground,
      leftImages: [heroRailImages[0], heroRailImages[1]],
      rightImages: [heroRailImages[2], heroRailImages[3]],
    },
    {
      kicker: "Holistic spa experience",
      title: "Tailored treatments where massage, beauty care and inner calm meet in one refined setting.",
      description:
        "A premium flow created to slow the rhythm of the city and leave behind softness, stillness and polish.",
      cta: "Explore Sessions",
      image: additionalHeroImages[0],
      leftImages: [heroRailImages[1], heroRailImages[0]],
      rightImages: [heroRailImages[3], heroRailImages[2]],
    },
    {
      kicker: "An urban escape",
      title: "A care scene that lightens the body, softens the pace and restores a luminous finish.",
      description:
        "More than a break, it is a composed spa atmosphere where every visual detail supports calm.",
      cta: "View Treatments",
      image: additionalHeroImages[1],
      leftImages: [heroRailImages[2], heroRailImages[1]],
      rightImages: [heroRailImages[0], heroRailImages[3]],
    },
  ],
  de: [
    {
      kicker: "Ruhe, Pflege und sanfter Luxus",
      title: "Entdecken Sie die eleganteste Form der Entspannung mit den Signature-Ritualen von Emsel Beauty.",
      description:
        "Pflegeablaeufe, die den Koerper entspannen, das Erscheinungsbild verfeinern und das gesamte Erlebnis in ruhigen Luxus kleiden.",
      cta: "Termin Buchen",
      image: heroBackground,
      leftImages: [heroRailImages[0], heroRailImages[1]],
      rightImages: [heroRailImages[2], heroRailImages[3]],
    },
    {
      kicker: "Ganzheitliches Spa-Erlebnis",
      title: "Individuelle Treatments, in denen Massage, Pflege und innere Ruhe in einem edlen Setting zusammenfinden.",
      description:
        "Ein Premium-Ablauf, der den Takt der Stadt verlangsamt und ein Gefuehl von Sanftheit und Leichtigkeit hinterlaesst.",
      cta: "Sessions Entdecken",
      image: additionalHeroImages[0],
      leftImages: [heroRailImages[1], heroRailImages[0]],
      rightImages: [heroRailImages[3], heroRailImages[2]],
    },
    {
      kicker: "Eine ruhige Auszeit",
      title: "Eine Care-Szene, die den Koerper entlastet, den Blick verfeinert und die Stimmung spuerbar beruhigt.",
      description:
        "Mehr als nur eine Pause: eine sorgfaeltig komponierte Spa-Atmosphaere mit sanfter Eleganz.",
      cta: "Treatments Ansehen",
      image: additionalHeroImages[1],
      leftImages: [heroRailImages[2], heroRailImages[1]],
      rightImages: [heroRailImages[0], heroRailImages[3]],
    },
  ],
};

const localizedHomeShowcase: Record<Locale, HomeShowcaseContent> = {
  tr: {
    heroKicker: "Saf rahatlama ve kişisel bakım",
    heroTitle: "Emsel Beauty'nin imza ritüelleriyle sakinliğin en zarif halini keşfedin.",
    heroDescription:
      "Bedeni dinlendiren, görünümü rafine eden ve deneyimi yumuşak lüks hissiyle tamamlayan bakım akışları.",
    heroAction: "Online Rezervasyon",
    treatmentsTitle: "İmza Bakımlarımız",
    treatments: [
      { title: "Head Massage", image: heroRailImages[0] },
      { title: "Aroma Therapy", image: heroRailImages[1] },
      { title: "Nail Art", image: heroRailImages[2] },
      { title: "Relax Ritual", image: heroRailImages[3] },
      { title: "Skin Glow", image: heroRailImages[1] },
    ],
    storyTitle: "Hikayemiz",
    storyDescription:
      "Emsel Beauty, klinik disiplini ve spa zarafetini aynı atmosferde buluşturan butik bir bakım evi olarak kurgulandı. Her dokunuşta sakinlik, güven ve sonuç hissi bırakmayı hedefleyen bu yapı; ürün, servis ve marka hikayesini tek bir ritimde bir araya getiriyor.",
    storyAction: "Kurumsalı İncele",
    productsAction: "Ürünleri İncele",
    products: [
      {
        eyebrow: "Meditatif dokunuş",
        title: "Aromatik Mumlar",
        description:
          "Alanı sakinleştiren, bakım atmosferini güçlendiren sıcak ve rafine koku notaları.",
        image:
          "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80",
      },
      {
        eyebrow: "Vücut ritüeli",
        title: "Vücut Yağı",
        description:
          "İpeksi doku, yumuşak parlaklık ve günlük bakıma kolayca eşlik eden besleyici formül.",
        image:
          "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=900&q=80",
      },
      {
        eyebrow: "Bakım bitişi",
        title: "Cilt Bakım Spreyi",
        description:
          "Gün içinde tazelik, ışık ve yumuşak bir bitiş hissi bırakan hafif tamamlayıcı bakım.",
        image:
          "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  en: {
    heroKicker: "Pure relaxation and care",
    heroTitle: "Discover the most refined side of calm through Emsel Beauty's signature rituals.",
    heroDescription:
      "Care flows designed to relax the body, elevate the look and wrap the whole experience in a quiet sense of luxury.",
    heroAction: "Book Your Session",
    treatmentsTitle: "Our Signature Treatments",
    treatments: [
      { title: "Head Massage", image: heroRailImages[0] },
      { title: "Aroma Therapy", image: heroRailImages[1] },
      { title: "Nail Art", image: heroRailImages[2] },
      { title: "Relax Ritual", image: heroRailImages[3] },
      { title: "Skin Glow", image: heroRailImages[1] },
    ],
    storyTitle: "Our Story",
    storyDescription:
      "Emsel Beauty was designed as a boutique care house where clinical discipline meets spa elegance. Every touchpoint is shaped to leave a feeling of calm, trust and visible refinement while bringing product, service and brand story into one rhythm.",
    storyAction: "Explore Corporate",
    productsAction: "Explore Products",
    products: [
      {
        eyebrow: "Meditative detail",
        title: "Aromatic Candles",
        description:
          "Warm, refined scent notes that soften the room and enrich the care atmosphere.",
        image:
          "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80",
      },
      {
        eyebrow: "Body ritual",
        title: "Body Oil",
        description:
          "A nourishing formula with a silky finish, soft glow and a daily ritual-friendly texture.",
        image:
          "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=900&q=80",
      },
      {
        eyebrow: "Finishing care",
        title: "Skin Mist",
        description:
          "A light finishing layer that leaves freshness, luminosity and a soft polished touch.",
        image:
          "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  de: {
    heroKicker: "Ruhe, Pflege und sanfter Luxus",
    heroTitle: "Entdecken Sie die eleganteste Form der Entspannung mit den Signature-Ritualen von Emsel Beauty.",
    heroDescription:
      "Pflegeablaeufe, die den Koerper entspannen, das Erscheinungsbild verfeinern und das gesamte Erlebnis in ruhigen Luxus kleiden.",
    heroAction: "Termin Buchen",
    treatmentsTitle: "Unsere Signature Treatments",
    treatments: [
      { title: "Head Massage", image: heroRailImages[0] },
      { title: "Aroma Therapy", image: heroRailImages[1] },
      { title: "Nail Art", image: heroRailImages[2] },
      { title: "Relax Ritual", image: heroRailImages[3] },
      { title: "Skin Glow", image: heroRailImages[1] },
    ],
    storyTitle: "Unsere Geschichte",
    storyDescription:
      "Emsel Beauty wurde als Boutique fuer Pflege und Wohlbefinden entwickelt, in der klinische Disziplin auf Spa-Eleganz trifft. Jede Beruehrung soll Ruhe, Vertrauen und sichtbare Raffinesse vermitteln und Produkt, Service und Markenwelt in einen gemeinsamen Rhythmus bringen.",
    storyAction: "Mehr zur Marke",
    productsAction: "Produkte ansehen",
    products: [
      {
        eyebrow: "Meditativer Akzent",
        title: "Aromatische Kerzen",
        description:
          "Warme, raffinierte Duftnoten, die den Raum beruhigen und die Pflegeatmosphaere veredeln.",
        image:
          "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80",
      },
      {
        eyebrow: "Body Ritual",
        title: "Koerperoel",
        description:
          "Pflegende Formel mit seidiger Textur, sanftem Glow und einem Finish fuer den taeglichen Einsatz.",
        image:
          "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=900&q=80",
      },
      {
        eyebrow: "Feiner Abschluss",
        title: "Pflegespray",
        description:
          "Leichte Abschlusspflege, die Frische, Licht und ein weiches Hautgefuehl hinterlaesst.",
        image:
          "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return getPageMetadata(locale, "home");
}

export default async function HomePage({ params }: HomePageProps) {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);
  const content = localizedHomeShowcase[locale];
  const heroSlides = localizedHeroSlides[locale];

  return (
    <div className="home-flow">
      <HomeHeroSlider
        slides={heroSlides}
        ctaHref={getLocalizedPath(locale, "contact")}
        treatmentsTitle={content.treatmentsTitle}
        treatments={content.treatments}
      />

      <section className="home-story-shell">
        <div className="home-story-panel">
          <div className="home-story-art">
            <h2 className="home-story-title">{content.storyTitle}</h2>
            <div className="home-story-logo-wrap">
              <span className="home-story-glow" aria-hidden="true" />
              <Image
                src="/logo/emsel-logo.png"
                alt={dictionary.brand.name}
                width={248}
                height={303}
                className="home-story-logo"
              />
            </div>
          </div>

          <div className="home-story-copy">
            <p>{content.storyDescription}</p>
            <Link href={getLocalizedPath(locale, "corporate")} className="home-story-button">
              {content.storyAction}
            </Link>
          </div>
        </div>
      </section>

      <section className="home-product-shell">
        <div className="home-product-grid">
          {content.products.map((product) => (
            <article key={product.title} className="home-product-card">
              <div
                className="home-product-image"
                style={{ backgroundImage: `url(${product.image})` }}
                aria-hidden="true"
              />
              <div className="home-product-body">
                <span className="home-product-eyebrow">{product.eyebrow}</span>
                <h3 className="home-product-title">{product.title}</h3>
                <p className="home-product-description">{product.description}</p>
              </div>
              <Link href={getLocalizedPath(locale, "products")} className="home-product-button">
                {content.productsAction}
              </Link>
            </article>
          ))}
        </div>

        <div className="home-product-footer">
          <Link href={getLocalizedPath(locale, "products")} className="home-product-more">
            {content.productsAction}
          </Link>
        </div>
      </section>
    </div>
  );
}
