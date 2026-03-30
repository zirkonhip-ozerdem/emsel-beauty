import type { Locale } from "@/i18n/config";

type SeoEntry = {
  title: string;
  description: string;
};

type ContentCard = {
  title: string;
  description: string;
};

type ProductCard = ContentCard & {
  detail: string;
};

type ServiceCard = ContentCard & {
  meta: string;
};

type BlogCard = ContentCard & {
  meta: string;
};

type ContactCard = ContentCard & {
  detail: string;
};

type Milestone = {
  year: string;
  title: string;
  description: string;
};

export interface SiteDictionary {
  brand: {
    name: string;
    tagline: string;
    description: string;
  };
  navigation: {
    home: string;
    products: string;
    services: string;
    blog: string;
    contact: string;
    corporate: string;
  };
  languageLabels: Record<Locale, string>;
  header: {
    consultation: string;
  };
  footer: {
    note: string;
    rights: string;
    addressLabel: string;
    address: string;
    phoneLabel: string;
    phone: string;
    mailLabel: string;
    mail: string;
  };
  seo: {
    default: SeoEntry;
    home: SeoEntry;
    products: SeoEntry;
    services: SeoEntry;
    blog: SeoEntry;
    contact: SeoEntry;
    corporate: SeoEntry;
  };
  home: {
    hero: {
      eyebrow: string;
      title: string;
      description: string;
      primary: string;
      secondary: string;
      badges: string[];
    };
    stats: Array<{
      value: string;
      label: string;
    }>;
    products: {
      eyebrow: string;
      title: string;
      description: string;
      items: ContentCard[];
    };
    services: {
      eyebrow: string;
      title: string;
      description: string;
      items: ContentCard[];
    };
    journal: {
      eyebrow: string;
      title: string;
      description: string;
      entries: BlogCard[];
    };
    cta: {
      title: string;
      description: string;
      primary: string;
      secondary: string;
    };
  };
  productsPage: {
    hero: {
      eyebrow: string;
      title: string;
      description: string;
    };
    categories: ProductCard[];
    pillars: ContentCard[];
    roadmap: ContentCard[];
  };
  servicesPage: {
    hero: {
      eyebrow: string;
      title: string;
      description: string;
    };
    packages: ServiceCard[];
    flow: ContentCard[];
    cta: {
      title: string;
      description: string;
      action: string;
    };
  };
  blogPage: {
    hero: {
      eyebrow: string;
      title: string;
      description: string;
    };
    featured: {
      tag: string;
      title: string;
      description: string;
    };
    posts: BlogCard[];
    topics: string[];
    readMoreLabel: string;
    continueLabel: string;  
    loadMoreCta: string;
  };
  contactPage: {
    hero: {
      eyebrow: string;
      title: string;
      description: string;
    };
    cards: ContactCard[];
    office: {
      title: string;
      description: string;
      items: Array<{
        label: string;
        value: string;
      }>;
    };
    form: {
      title: string;
      description: string;
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      button: string;
      note: string;
    };
  };
  corporatePage: {
    hero: {
      eyebrow: string;
      title: string;
      description: string;
    };
    intro: {
      title: string;
      description: string;
    };
    values: ContentCard[];
    milestones: Milestone[];
    promise: {
      title: string;
      description: string;
      items: string[];
    };
  };
}

const dictionaries: Record<Locale, SiteDictionary> = {
  tr: {
    brand: {
      name: "Emsel Beauty",
      tagline: "Sakin bir lüks duygusuyla tasarlanan guzellik deneyimi",
      description:
        "Cilt, sac ve marka deneyimini tek bir editorial cizgide birlestiren cok dilli guzellik platformu.",
    },
    navigation: {
      home: "Anasayfa",
      products: "Urunlerimiz",
      services: "Hizmetlerimiz",
      blog: "Blog",
      contact: "Iletisim",
      corporate: "Kurumsal",
    },
    languageLabels: {
      tr: "Turkce",
      en: "English",
      ar: "العربية",
    },
    header: {
      consultation: "Online Rezervasyon",
    },
    footer: {
      note: "Starter icerikler ornek olarak hazirlandi; marka detaylari kolayca guncellenebilir.",
      rights: "Tum haklari saklidir.",
      addressLabel: "Merkez",
      address: "Istanbul merkez ofis ve randevulu deneyim alani",
      phoneLabel: "Telefon",
      phone: "+90 (5xx) xxx xx xx",
      mailLabel: "E-posta",
      mail: "hello@emselbeauty.com",
    },
    seo: {
      default: {
        title: "Emsel Beauty",
        description:
          "Emsel Beauty icin hazirlanan cok dilli site mimarisi ve premium guzellik markasi deneyimi.",
      },
      home: {
        title: "Anasayfa",
        description:
          "Emsel Beauty anasayfasi; marka hikayesi, urun seckisi, hizmetler ve editoral icerikler tek deneyimde.",
      },
      products: {
        title: "Urunlerimiz",
        description:
          "Emsel Beauty urun gamini kategori, formulasyon yaklasimi ve deneyim basliklariyla kesfedin.",
      },
      services: {
        title: "Hizmetlerimiz",
        description:
          "Guzellik ritullerini, salon deneyimini ve randevu akislarini hizmet sayfasinda inceleyin.",
      },
      blog: {
        title: "Blog",
        description:
          "Bakim ritulleri, trend yorumlari ve marka editoryalini blog sayfasinda okuyun.",
      },
      contact: {
        title: "Iletisim",
        description:
          "Emsel Beauty ile iletisime gecmek, randevu planlamak ve marka gorusmesi istemek icin iletisim sayfasi.",
      },
      corporate: {
        title: "Kurumsal",
        description:
          "Marka vaadi, degerler ve gelisim yol haritasini kurumsal sayfada inceleyin.",
      },
    },
    home: {
      hero: {
        eyebrow: "Editorial guzellik platformu",
        title: "Bakim, estetik ve marka hikayesini tek bir sakin ritimde bulusturuyoruz.",
        description:
          "Emsel Beauty icin kurdugumuz bu altyapi; cok dilli site deneyimini premium bir gorunumle, tek dilli yonetim panelini ise operasyon odakli bir yapiyla bir araya getiriyor.",
        primary: "Hizmetleri Incele",
        secondary: "Markayi Tani",
        badges: ["TR / EN / AR hazir", "Admin yapisi ayrik", "Premium landing kurgusu"],
      },
      stats: [
        { value: "3", label: "Dil ile ayni icerik mimarisi" },
        { value: "6", label: "Ana sayfa ve temel site rotasi" },
        { value: "1", label: "Tek dilli admin merkezi" },
        { value: "∞", label: "Icerik ve modul genisletme alani" },
      ],
      products: {
        eyebrow: "Secili koleksiyonlar",
        title: "Urun mimarisi kategorilere ayrildi, marka dili ise tek cizgide tutuldu.",
        description:
          "Her kategori farkli bir ihtiyaca hitap ederken, sayfa akisi tum dillerde ayni deneyim ritmini koruyor.",
        items: [
          {
            title: "Skin Rituals",
            description: "Cilt hazirligi, dengeleme ve isiltı odakli temel koleksiyon.",
          },
          {
            title: "Hair Signature",
            description: "Sac bakiminda parlaklik, onarim ve bitis etkisini one cikarir.",
          },
          {
            title: "Studio Essentials",
            description: "Profesyonel uygulamalara uyumlu, rafine icerik kurgusu.",
          },
        ],
      },
      services: {
        eyebrow: "Deneyim tasarimi",
        title: "Hizmet sayfalari tek seferlik degil, tekrar kullanilabilir bloklarla kurgulandi.",
        description:
          "Boylece randevu, kampanya ve sezonluk servisleri yeni layout kurmadan genisletebiliriz.",
        items: [
          {
            title: "Cilt analiz ve rutin planlama",
            description: "Ilk temas icin net, yonlendirici ve premium baslangic noktasi.",
          },
          {
            title: "Bakim seanslari",
            description: "Servis kartlariyla sure, odak alan ve deneyim tonu birlikte anlatilir.",
          },
          {
            title: "VIP marka gorusmeleri",
            description: "Kurumsal is birlikleri icin farkli bir temas akisi sunar.",
          },
        ],
      },
      journal: {
        eyebrow: "Editorial alan",
        title: "Blog tarafi sadece yazi listesi degil, markanin sesini tasiyan bir katman.",
        description:
          "Trend yazilari, bakim notlari ve urun egitimi icerikleri icin ayni moduler duzeni kullaniyoruz.",
        entries: [
          {
            title: "Mevsim gecislerinde cilt rutini nasil sade tutulur?",
            description: "Daha az urunle daha dengeli bir gorunum kurmak icin editorial notlar.",
            meta: "Bakim rutini",
          },
          {
            title: "Salon deneyiminde premium hissi olusturan detaylar",
            description: "Karsilama, dil tonu ve mekan akisini bir arada dusunen servis tasarimi.",
            meta: "Marka deneyimi",
          },
          {
            title: "Yayin takvimi icin guzellik icerikleri nasil gruplanir?",
            description: "Blog ve sosyal medya arasinda uyumlu icerik kolonlari kurmak icin.",
            meta: "Icerik stratejisi",
          },
        ],
      },
      cta: {
        title: "Site altyapisini buyutmeye hazir bir iskelet kurduk.",
        description:
          "Sonraki adimda CMS, form entegrasyonu, coklu blog detay sayfalari ve admin modullerini ayni mimari ustune ekleyebiliriz.",
        primary: "Iletisime Gec",
        secondary: "Admin Paneli",
      },
    },
    productsPage: {
      hero: {
        eyebrow: "Urun kurgusu",
        title: "Koleksiyonlari sadece urun listesi olarak degil, deneyim aileleri olarak konumluyoruz.",
        description:
          "Bu sayfa; kategori sunumu, formulasyon ilkeleri ve urun gelistirme akislarini ileride rahatca besleyebilecegin moduler bloklarla hazirlandi.",
      },
      categories: [
        {
          title: "Core Skin",
          description: "Gunluk rutinin temel katmani icin temiz, dengeli ve hizli karar verdiren seri.",
          detail: "Temizleme, tonik, serum ve koruyucu basliklari icin uygun iskelet.",
        },
        {
          title: "Repair Focus",
          description: "Bariyer destegi, hassasiyet yonetimi ve toparlama odakli alt seri.",
          detail: "Uzman onerileri ve kullanim rutinleri icin acik icerik alani sunar.",
        },
        {
          title: "Finish Touch",
          description: "Anlik gorunum etkisi ve gun sonu isiltisini destekleyen tamamlayici urunler.",
          detail: "Kampanya ve sezon urunleri icin ayrik ama uyumlu vitrin alani.",
        },
      ],
      pillars: [
        {
          title: "Net formul dili",
          description: "Icerik karmasasini azaltan, kullaniciya karar kolayligi saglayan anlatim.",
        },
        {
          title: "Premium raf duzeni",
          description: "Kart yapisi, gorsel yerlesim ve kisa aciklamalarla daha editorial sunum.",
        },
        {
          title: "Cok dilli tutarlilik",
          description: "Tum locale'lerde ayni bilgi mimarisi ve ayni kullanici akisi korunur.",
        },
      ],
      roadmap: [
        {
          title: "Kategori stratejisi",
          description: "Ana urun aileleri ve alt segmentler tanimlanir.",
        },
        {
          title: "Icerik zenginlestirme",
          description: "Faydalar, kullanim sekilleri ve editor notlari eklenir.",
        },
        {
          title: "Admin baglantisi",
          description: "Son asamada panellerden kolayca yonetilecek veri modeli baglanir.",
        },
      ],
    },
    servicesPage: {
      hero: {
        eyebrow: "Servis deneyimi",
        title: "Hizmetler; operasyon, randevu ve premium algiyi ayni anda tasiyacak sekilde yerlesiyor.",
        description:
          "Salon ya da studio tarafindaki servislerin her biri; sure, odak alan ve sonrasindaki bakim onerileriyle birlikte anlasilir hale geliyor.",
      },
      packages: [
        {
          title: "Signature Skin Session",
          description: "Cilt analizi, hedef belirleme ve ilk rutin planlamasini tek seans icinde toplar.",
          meta: "60 dakika / yeni musteri odakli",
        },
        {
          title: "Glow Maintenance",
          description: "Duzenli bakim alan misafirler icin daha kisa ama ritmi koruyan tekrar seansi.",
          meta: "45 dakika / aylik devam paketi",
        },
        {
          title: "Private Beauty Edit",
          description: "Marka is birlikleri veya VIP misafirler icin ozellestirilmis deneyim akisi.",
          meta: "Ozel planlama / ekip koordinasyonu",
        },
      ],
      flow: [
        {
          title: "On gorusme",
          description: "Talep alinır, beklenti cercevelenir ve uygun servis belirlenir.",
        },
        {
          title: "Deneyim oturumu",
          description: "Servis kartindaki adimlar standardize edilerek ekip ici uyum korunur.",
        },
        {
          title: "Takip ve oneriler",
          description: "Seans sonrasi rutin notlari ve sonraki randevu aksiyonu netlestirilir.",
        },
      ],
      cta: {
        title: "Bu servisler admin panelinden rahatca yonetilmeye uygun bir yapiya sahip.",
        description:
          "Bir sonraki adimda paket sureleri, fiyatlar, rezervasyon durumlari ve ekip atamalari baglanabilir.",
        action: "Randevu Akisini Tasarla",
      },
    },
    blogPage: {
      hero: {
        eyebrow: "Marka editozu",
        title: "Blog, markanin sadece anlattigi degil yon verdigi bir alana donusuyor.",
        description:
          "Kategori bazli yazi yapisi sayesinde SEO, sosyal medya ve marka tonu tek merkezden hizalanabilir.",
      },
      featured: {
        tag: "One cikan yazi",
        title: "Guzellik markasinda icerik takvimi neden urun takvimiyle ayni anda dusunulmeli?",
        description:
          "Yazilar, kampanyalar ve hizmet tanitimlari tek bir editorial sistem icinde planlandiginda daha guclu bir marka ritmi olusur.",
      },
      posts: [
        {
          title: "Kafa masaji ve head spa: gerginligi azaltan rituel rehberi",
          description:
            "Sac derisi, bas bolgesi ve omuz hatti icin sakin tempolu, premium bir deneyim vaadiyle nasil anlatilir?",
          meta: "Kafa masaji",
        },
        {
          title: "Salon blog'unda once deneyim mi, once sonuc mu gosterilmeli?",
          description: "Dijital vitrinde kullanicinin guvenini en hizli toplayan kurgular.",
          meta: "Deneyim stratejisi",
        },
        {
          title: "Cok dilli blog yapisinda tekrar etmeyen ama tutarli icerik sistemi",
          description: "Her dilde ayni mesaji korurken dogal okuma deneyimi saglama yontemi.",
          meta: "Multilingual SEO",
        },
        {
          title: "Kis aylarinda nem bariyerini korumak icin sade rutin onerileri",
          description: "Kuru hava ve isitma ile bozulan bariyeri destekleyen, abartisiz bakim basliklari.",
          meta: "Cilt bakimi",
        },
        {
          title: "Manikur sonrasi ojenin dayanikliligini artiran kucuk aliskanliklar",
          description: "Gunluk rutinde nelere dikkat edilir, blogda nasil kisa ve net anlatilir?",
          meta: "El bakimi",
        },
        {
          title: "Head spa sonrasi evde uygulanabilecek hafif bakim adimlari",
          description: "Salon deneyimini uzatan, musteriye guven veren yonlendirici icerik fikirleri.",
          meta: "Head spa",
        },
        {
          title: "Cilt tonunu esitlemek isteyenler icin icerik plani onerisi",
          description: "Vaatleri abartmadan, beklentiyi yoneten editorial takvim satirlari.",
          meta: "Icerik plani",
        },
        {
          title: "Sac derisi kasintisinda nelere dikkat edilmeli, ne yazilmali?",
          description: "Tibbi iddia yerine bilgilendirici ve guvenli dil icin kontrol listesi.",
          meta: "Sac derisi",
        },
        {
          title: "Premium salon deneyimini metinde hissettiren fotograf secimi",
          description: "Isik, kadraj ve detaylarla marka tonunu destekleyen gorsel anlatim.",
          meta: "Gorsel dil",
        },
        {
          title: "Sezonluk kampanya metinlerinde abartidan kacinma rehberi",
          description: "Indirim ve kampanya cumlelerinde premium hissi koruyan cumle yapilari.",
          meta: "Kampanya",
        },
        {
          title: "Blog yazilarinda H1–H2 hiyerarsisini SEO ile uyumlu kullanma",
          description: "Okunabilirligi bozmadan anahtar kelime ve baslik hizasi icin pratik sablon.",
          meta: "SEO",
        },
        {
          title: "Musteri yorumlarini editoral icerige donusturme fikirleri",
          description: "Sosyal kanit ile hikaye anlatimini birlestiren guvenli ornekler.",
          meta: "Guven",
        },
        {
          title: "Nis parfum ve bakim urunleri icin urun hikayesi sablonu",
          description: "Notalar, dokusu ve kullanim anini tek paragrafta toplayan yazi kalibi.",
          meta: "Urun hikayesi",
        },
        {
          title: "Randevu sonrasi e-posta icerikleri icin kisa mesaj kaliplari",
          description: "Bakim onerisi, hatirlatma ve tesekkur tonunu ayni ritimde tutma.",
          meta: "E-posta",
        },
        {
          title: "Sosyal medya icin blog yazisindan carousel uretme checklist'i",
          description: "Tek yazidan bes alt baslik cikaran, tasarimla uyumlu icerik bolme rehberi.",
          meta: "Sosyal medya",
        },
      ],
      topics: ["Bakim ritulleri", "Marka dili", "Servis deneyimi", "Urun rehberi", "Sezon trendleri"],
      readMoreLabel: "Devamını Oku",
      loadMoreCta: "Daha fazla yazi — asagida devamina bak",
      continueLabel: "Devamı",
    },
    contactPage: {
      hero: {
        eyebrow: "Temas noktasi",
        title: "Randevu, is birligi ya da marka gorusmesi icin ayni sayfadan iletisime gecilebilir.",
        description:
          "Iletisim alani; hizli temas kartlariyla birlikte daha sonra form entegrasyonuna hazir bir yapi sunuyor.",
      },
      cards: [
        {
          title: "Randevu talepleri",
          description: "Bakim seansi ve on gorusme rezervasyonlari icin baslangic noktasi.",
          detail: "Hafta ici 09:00 - 18:00 arasinda donus planlanir.",
        },
        {
          title: "Marka is birlikleri",
          description: "Editoryal cekim, etkinlik ve premium ortaklik gorusmeleri.",
          detail: "Kurumsal ekipler icin ayrik akis tasarlanabilir.",
        },
        {
          title: "Icerik ve basin",
          description: "Blog, lansman ve basin taleplerine yonelik iletisim basligi.",
          detail: "Tek merkezden koordine edilen iletisim modeli.",
        },
      ],
      office: {
        title: "Iletisim notlari",
        description: "Asagidaki bilgiler starter icerik olarak yerlestirildi; canliya gecmeden once kolayca guncellenebilir.",
        items: [
          { label: "Konum", value: "Istanbul / randevulu studio modeli" },
          { label: "Telefon", value: "+90 (5xx) xxx xx xx" },
          { label: "E-posta", value: "hello@emselbeauty.com" },
          { label: "Calisma saatleri", value: "Pazartesi - Cumartesi / 09:00 - 18:00" },
        ],
      },
      form: {
        title: "Hizli mesaj birak",
        description: "Form alanlari simdilik statik iskelet olarak eklendi; sonraki adimda action ya da backend'e baglanabilir.",
        nameLabel: "Ad Soyad",
        namePlaceholder: "Isminizi girin",
        emailLabel: "E-posta",
        emailPlaceholder: "eposta@ornek.com",
        messageLabel: "Mesajiniz",
        messagePlaceholder: "Ne icin iletisime gecmek istediginizi kisaca yazin",
        button: "Mesaj Gonder",
        note: "Canli form entegrasyonu sonraki fazda baglanacak.",
      },
    },
    corporatePage: {
      hero: {
        eyebrow: "Kurumsal kimlik",
        title: "Markanin sesi, vaadi ve buyume rotasi tek bir kurumsal cizgide toplaniyor.",
        description:
          "Kurumsal sayfa; marka tanimi, degerler ve yol haritasini yalnizca tanitim degil guven olusturan bir yapida sunuyor.",
      },
      intro: {
        title: "Emsel Beauty'yi yapisal olarak uzun omurlu kilmak icin bu sayfayi sade ama genislemeye acik kurduk.",
        description:
          "Ileride ekip, basin kit'i, sertifikalar ya da franchise benzeri alt sayfalar eklense bile mevcut mimari bozulmadan buyuyebilir.",
      },
      values: [
        {
          title: "Sadelik",
          description: "Karisik anlatim yerine rafine ve net bir marka dili.",
        },
        {
          title: "Guven",
          description: "Her temas noktasinda profesyonel, olculu ve tutarli deneyim.",
        },
        {
          title: "Sureklilik",
          description: "Kampanyaya degil kalici bakim iliskisine odaklanan yaklasim.",
        },
      ],
      milestones: [
        {
          year: "01",
          title: "Marka anlatimi",
          description: "Hikaye, urun dili ve servis tonunun dijital zemine tasinmasi.",
        },
        {
          year: "02",
          title: "Icerik genislemesi",
          description: "Blog, kampanya ve urun detaylarinin sistemli olarak buyutulmesi.",
        },
        {
          year: "03",
          title: "Operasyon baglantisi",
          description: "Admin paneli, formlar ve veri modelleri ile gunluk yonetimin baglanmasi.",
        },
      ],
      promise: {
        title: "Marka vaadimiz",
        description: "Her dokunusta ayni sakin guveni hissettiren, dijitalde de fiziksel deneyimde de rafine kalan bir guzellik markasi olmak.",
        items: [
          "Tum dillerde ayni kalite algisini korumak",
          "Icerik yonetimini ekip icin kolaylastirmak",
          "Yeni modulleri mevcut duzeni bozmadan ekleyebilmek",
        ],
      },
    },
  },
  en: {
    brand: {
      name: "Emsel Beauty",
      tagline: "A calm beauty experience shaped with a sense of quiet luxury",
      description:
        "A multilingual beauty platform that brings skincare, haircare and brand storytelling into one editorial rhythm.",
    },
    navigation: {
      home: "Home",
      products: "Products",
      services: "Services",
      blog: "Blog",
      contact: "Contact",
      corporate: "Corporate",
    },
    languageLabels: {
      tr: "Turkish",
      en: "English",
      ar: "Arabic",
    },
    header: {
      consultation: "Online Reservation",
    },
    footer: {
      note: "Starter copy is included as a placeholder and can be replaced with final brand content.",
      rights: "All rights reserved.",
      addressLabel: "Base",
      address: "Istanbul central office and appointment-only experience space",
      phoneLabel: "Phone",
      phone: "+90 (5xx) xxx xx xx",
      mailLabel: "Email",
      mail: "hello@emselbeauty.com",
    },
    seo: {
      default: {
        title: "Emsel Beauty",
        description:
          "A multilingual Next.js architecture for Emsel Beauty with a premium site experience and a dedicated admin area.",
      },
      home: {
        title: "Home",
        description:
          "Discover the Emsel Beauty homepage with brand story, product selection, services and editorial content in one experience.",
      },
      products: {
        title: "Products",
        description:
          "Explore Emsel Beauty product categories, formulation principles and premium product storytelling.",
      },
      services: {
        title: "Services",
        description:
          "Review beauty rituals, service packages and booking-friendly experience flows.",
      },
      blog: {
        title: "Blog",
        description:
          "Read editorial notes, care routines and beauty trend content on the Emsel Beauty blog.",
      },
      contact: {
        title: "Contact",
        description:
          "Reach Emsel Beauty for appointments, collaborations and brand conversations.",
      },
      corporate: {
        title: "Corporate",
        description:
          "Review the brand promise, values and growth roadmap on the corporate page.",
      },
    },
    home: {
      hero: {
        eyebrow: "Editorial beauty platform",
        title: "We bring care, aesthetics and brand storytelling into one calm rhythm.",
        description:
          "This structure for Emsel Beauty combines a multilingual site experience with a premium visual language, while keeping the admin side focused and Turkish-only.",
        primary: "Explore Services",
        secondary: "Meet the Brand",
        badges: ["Ready for TR / EN / AR", "Separate admin structure", "Premium landing flow"],
      },
      stats: [
        { value: "3", label: "Languages sharing one content system" },
        { value: "6", label: "Core website routes ready to grow" },
        { value: "1", label: "Turkish-only admin center" },
        { value: "∞", label: "Space for future modules" },
      ],
      products: {
        eyebrow: "Selected collections",
        title: "The product architecture is split into clear categories while the brand voice stays unified.",
        description:
          "Each category serves a distinct need, yet every locale keeps the same premium browsing rhythm.",
        items: [
          {
            title: "Skin Rituals",
            description: "A foundational collection for skin prep, balance and glow.",
          },
          {
            title: "Hair Signature",
            description: "Focused on shine, repair and a refined finish for haircare.",
          },
          {
            title: "Studio Essentials",
            description: "An editorial structure that also suits professional applications.",
          },
        ],
      },
      services: {
        eyebrow: "Experience design",
        title: "Service pages are designed as reusable blocks, not one-off layouts.",
        description:
          "That gives us room to expand with new treatments, campaigns and seasonal offers without rebuilding the structure.",
        items: [
          {
            title: "Skin analysis and routine planning",
            description: "A clear and premium starting point for the first interaction.",
          },
          {
            title: "Care sessions",
            description: "Service cards explain timing, focus area and tone in one place.",
          },
          {
            title: "VIP brand consultations",
            description: "A separate conversation flow for partnerships and private guests.",
          },
        ],
      },
      journal: {
        eyebrow: "Editorial space",
        title: "The blog layer is not just a list of articles, it carries the voice of the brand.",
        description:
          "Trend notes, care education and campaign storytelling can all live inside the same modular system.",
        entries: [
          {
            title: "How to keep a seasonal skincare routine minimal",
            description: "Editorial notes on creating a more balanced look with fewer products.",
            meta: "Care routine",
          },
          {
            title: "What creates a premium salon feeling from the first minute?",
            description: "A closer look at welcome flow, tone of voice and spatial rhythm.",
            meta: "Brand experience",
          },
          {
            title: "How to group beauty content for a strong publishing calendar",
            description: "A framework for aligning blog and social media pillars.",
            meta: "Content strategy",
          },
        ],
      },
      cta: {
        title: "We now have a foundation that is ready to scale.",
        description:
          "Next, we can add CMS integration, forms, dynamic blog details and admin modules on top of the same architecture.",
        primary: "Get in Touch",
        secondary: "Admin Panel",
      },
    },
    productsPage: {
      hero: {
        eyebrow: "Product structure",
        title: "We position collections as experience families, not just product lists.",
        description:
          "This page is built with modular blocks so future product data, benefits and usage stories can be added without changing the layout logic.",
      },
      categories: [
        {
          title: "Core Skin",
          description: "A clean everyday layer focused on clarity, balance and fast decision making.",
          detail: "Suitable for cleanser, toner, serum and protection sub-sections.",
        },
        {
          title: "Repair Focus",
          description: "A recovery-focused range for sensitivity, barrier support and visible comfort.",
          detail: "Leaves room for expert notes and guided routine storytelling.",
        },
        {
          title: "Finish Touch",
          description: "Complementary products that support instant polish and end-of-day glow.",
          detail: "A separate yet aligned showcase area for campaigns and seasonal items.",
        },
      ],
      pillars: [
        {
          title: "Clear formulation language",
          description: "Messaging that removes friction and helps visitors choose confidently.",
        },
        {
          title: "Premium shelf presentation",
          description: "Card structure and concise copy create a more editorial catalogue feeling.",
        },
        {
          title: "Multilingual consistency",
          description: "Every locale keeps the same information architecture and browsing logic.",
        },
      ],
      roadmap: [
        {
          title: "Category strategy",
          description: "Main product families and sub-segments are defined clearly.",
        },
        {
          title: "Content enrichment",
          description: "Benefits, usage guidance and editorial notes are layered in.",
        },
        {
          title: "Admin connection",
          description: "In the next phase, the structure can connect to manageable data models.",
        },
      ],
    },
    servicesPage: {
      hero: {
        eyebrow: "Service experience",
        title: "Services are placed to support operations, booking and premium perception at once.",
        description:
          "Every treatment or private consultation can be presented with timing, focus area and follow-up guidance in one clean system.",
      },
      packages: [
        {
          title: "Signature Skin Session",
          description: "A first-visit experience combining skin analysis, goal setting and routine planning.",
          meta: "60 min / new guest focus",
        },
        {
          title: "Glow Maintenance",
          description: "A lighter repeat session for returning guests who want continuity without friction.",
          meta: "45 min / monthly cadence",
        },
        {
          title: "Private Beauty Edit",
          description: "A tailored flow for VIP guests, partners and brand-facing appointments.",
          meta: "Custom planning / team coordination",
        },
      ],
      flow: [
        {
          title: "Pre-consultation",
          description: "The request is reviewed, the expectation is framed and the right service is matched.",
        },
        {
          title: "Experience session",
          description: "Standardized service steps keep delivery aligned across the team.",
        },
        {
          title: "Follow-up and guidance",
          description: "Aftercare notes and the next appointment action become easy to manage.",
        },
      ],
      cta: {
        title: "This structure is already suitable for future admin management.",
        description:
          "Durations, pricing, booking states and team assignments can be attached in the next phase.",
        action: "Design the Booking Flow",
      },
    },
    blogPage: {
      hero: {
        eyebrow: "Brand editorial",
        title: "The blog becomes a place where the brand leads the conversation, not just fills space.",
        description:
          "Because content is grouped by editorial themes, SEO, social media and product launches can align from one center.",
      },
      featured: {
        tag: "Featured story",
        title: "Why beauty content calendars should be built alongside product calendars",
        description:
          "When articles, launches and service stories are planned within one editorial system, the brand rhythm feels stronger and more coherent.",
      },
      posts: [
        {
          title: "Head spa and scalp massage: an editorial ritual for tension release",
          description:
            "How to describe slow tempo, scalp-to-shoulder relief and a premium care promise in one story.",
          meta: "Head spa",
        },
        {
          title: "Should a salon blog lead with the experience or the result?",
          description: "A look at the patterns that earn trust fastest on beauty websites.",
          meta: "Experience strategy",
        },
        {
          title: "A multilingual blog system that stays consistent without feeling repetitive",
          description: "How to preserve the same message across locales with a natural reading flow.",
          meta: "Multilingual SEO",
        },
        {
          title: "A simple winter routine idea to protect the skin barrier",
          description: "Editorial angles that support the barrier without overpromising in dry air.",
          meta: "Skin care",
        },
        {
          title: "Small habits that help nail polish last after a manicure",
          description: "What to mention in a blog post so guidance feels practical, not preachy.",
          meta: "Hands",
        },
        {
          title: "Gentle aftercare steps guests can do at home after a head spa",
          description: "How to extend the salon story with calm, trustworthy instructions.",
          meta: "Head spa",
        },
        {
          title: "A content-plan sketch for readers focused on even skin tone",
          description: "Calendar lines that manage expectations while staying premium.",
          meta: "Editorial plan",
        },
        {
          title: "What to say (and avoid) when writing about scalp itch",
          description: "A checklist for informative language without medical claims.",
          meta: "Scalp",
        },
        {
          title: "Choosing photos that make a premium salon feel tangible in copy",
          description: "Light, framing and detail choices that reinforce brand tone.",
          meta: "Visual language",
        },
        {
          title: "Keeping seasonal campaign copy confident without sounding loud",
          description: "Sentence shapes that preserve luxury while mentioning offers.",
          meta: "Campaigns",
        },
        {
          title: "Using H1–H2 hierarchy in blog posts with SEO in mind",
          description: "A practical template for headings that stay readable.",
          meta: "SEO",
        },
        {
          title: "Turning client feedback into editorial stories safely",
          description: "Examples that blend social proof with narrative restraint.",
          meta: "Trust",
        },
        {
          title: "A short product-story template for niche fragrance and care",
          description: "One-paragraph rhythm for notes, texture and the moment of use.",
          meta: "Product story",
        },
        {
          title: "Email snippets after appointments: care, reminder and thanks",
          description: "Keeping tone consistent across follow-up messages.",
          meta: "Email",
        },
        {
          title: "A checklist to turn one blog post into a social carousel",
          description: "Splitting a long article into five slides designers can reuse.",
          meta: "Social",
        },
      ],
      topics: ["Care rituals", "Brand voice", "Service design", "Product guides", "Seasonal trends"],
      readMoreLabel: "Read more",
      loadMoreCta: "More articles — continue below",
      continueLabel: "Continue",
    },
    contactPage: {
      hero: {
        eyebrow: "Touchpoint",
        title: "Appointments, collaborations and brand conversations can all begin from one page.",
        description:
          "The contact page pairs quick access cards with a static form shell that is ready for future integration.",
      },
      cards: [
        {
          title: "Appointment requests",
          description: "A clear starting point for treatment bookings and first consultations.",
          detail: "Responses can be planned during business hours.",
        },
        {
          title: "Brand partnerships",
          description: "For editorial shoots, events and premium collaboration requests.",
          detail: "A separate workflow can later be defined for corporate teams.",
        },
        {
          title: "Press and content",
          description: "A contact lane for blog, launch and press-related communication.",
          detail: "Built for centralized communication management.",
        },
      ],
      office: {
        title: "Contact notes",
        description:
          "The items below are starter placeholders and can be updated before launch without affecting the design.",
        items: [
          { label: "Location", value: "Istanbul / appointment-only studio model" },
          { label: "Phone", value: "+90 (5xx) xxx xx xx" },
          { label: "Email", value: "hello@emselbeauty.com" },
          { label: "Hours", value: "Monday - Saturday / 09:00 - 18:00" },
        ],
      },
      form: {
        title: "Leave a quick message",
        description:
          "The form is currently a visual shell; in the next step it can connect to a server action or backend endpoint.",
        nameLabel: "Full name",
        namePlaceholder: "Enter your name",
        emailLabel: "Email",
        emailPlaceholder: "name@example.com",
        messageLabel: "Message",
        messagePlaceholder: "Tell us briefly why you want to get in touch",
        button: "Send Message",
        note: "Live form integration can be added in the next phase.",
      },
    },
    corporatePage: {
      hero: {
        eyebrow: "Corporate identity",
        title: "The voice, promise and growth direction of the brand are gathered into one corporate layer.",
        description:
          "This page presents the brand definition, values and roadmap as a trust-building system rather than a plain introduction.",
      },
      intro: {
        title: "We built the corporate layer to stay simple today and expandable tomorrow.",
        description:
          "Future team pages, press kits, certifications or partner sections can be added without changing the existing architecture.",
      },
      values: [
        {
          title: "Clarity",
          description: "A refined brand language instead of noisy or crowded storytelling.",
        },
        {
          title: "Trust",
          description: "Professional, measured and consistent experiences across every touchpoint.",
        },
        {
          title: "Continuity",
          description: "A beauty relationship built around long-term care rather than short-term campaigns.",
        },
      ],
      milestones: [
        {
          year: "01",
          title: "Brand narrative",
          description: "The story, product voice and service tone are translated into the digital layer.",
        },
        {
          year: "02",
          title: "Content expansion",
          description: "Blog, campaign and product details grow inside a structured editorial system.",
        },
        {
          year: "03",
          title: "Operational connection",
          description: "Admin, forms and data models connect daily workflows to the experience layer.",
        },
      ],
      promise: {
        title: "Our promise",
        description:
          "To be a beauty brand that delivers the same calm confidence in every touchpoint, digitally and physically.",
        items: [
          "Keep the same quality perception across every language",
          "Make content operations easier for the internal team",
          "Add new modules without disturbing the current structure",
        ],
      },
    },
  },
  ar: {
    brand: {
      name: "Emsel Beauty",
      tagline: "تجربة جمالية هادئة مصممة بروح فاخرة",
      description:
        "منصة جمالية متعددة اللغات تجمع بين العناية بالبشرة والشعر وسرد العلامة ضمن ايقاع تحريري واحد.",
    },
    navigation: {
      home: "الرئيسية",
      products: "منتجاتنا",
      services: "خدماتنا",
      blog: "المدونة",
      contact: "التواصل",
      corporate: "المؤسسية",
    },
    languageLabels: {
      tr: "التركية",
      en: "الانجليزية",
      ar: "العربية",
    },
    header: {
      consultation: "الحجز اونلاين",
    },
    footer: {
      note: "تمت اضافة النصوص الحالية كنقطة بداية ويمكن استبدالها لاحقا بمحتوى العلامة النهائي.",
      rights: "جميع الحقوق محفوظة.",
      addressLabel: "المقر",
      address: "مكتب اسطنبول المركزي ومساحة تجربة بالمواعيد",
      phoneLabel: "الهاتف",
      phone: "+90 (5xx) xxx xx xx",
      mailLabel: "البريد",
      mail: "hello@emselbeauty.com",
    },
    seo: {
      default: {
        title: "Emsel Beauty",
        description:
          "بنية Next.js متعددة اللغات لعلامة Emsel Beauty مع موقع فاخر ولوحة ادارة منفصلة.",
      },
      home: {
        title: "الرئيسية",
        description:
          "الصفحة الرئيسية لـ Emsel Beauty تجمع قصة العلامة والمنتجات والخدمات والمحتوى التحريري في تجربة واحدة.",
      },
      products: {
        title: "منتجاتنا",
        description:
          "اكتشف فئات منتجات Emsel Beauty ومنطق الصياغة وطريقة عرض المنتج بصورة فاخرة.",
      },
      services: {
        title: "خدماتنا",
        description:
          "راجع الطقوس الجمالية وباقات الخدمة وتدفق الحجز ضمن تجربة واضحة.",
      },
      blog: {
        title: "المدونة",
        description:
          "اقرأ الملاحظات التحريرية وروتين العناية ومحتوى اتجاهات الجمال في مدونة Emsel Beauty.",
      },
      contact: {
        title: "التواصل",
        description:
          "تواصل مع Emsel Beauty للمواعيد والشراكات والمحادثات الخاصة بالعلامة.",
      },
      corporate: {
        title: "المؤسسية",
        description:
          "راجع وعد العلامة وقيمها وخريطة النمو في الصفحة المؤسسية.",
      },
    },
    home: {
      hero: {
        eyebrow: "منصة جمالية تحريرية",
        title: "نجمع العناية والجمال وسرد العلامة في ايقاع هادئ واحد.",
        description:
          "هذه البنية الخاصة بـ Emsel Beauty توحد تجربة موقع متعددة اللغات مع لغة بصرية فاخرة، وتبقي لوحة الادارة مركزة وباللغة التركية فقط.",
        primary: "استكشف الخدمات",
        secondary: "تعرف على العلامة",
        badges: ["جاهز للتركية والانجليزية والعربية", "لوحة ادارة منفصلة", "تدفق رئيسي فاخر"],
      },
      stats: [
        { value: "3", label: "لغات ضمن نظام محتوى واحد" },
        { value: "6", label: "مسارات رئيسية جاهزة للنمو" },
        { value: "1", label: "مركز اداري باللغة التركية" },
        { value: "∞", label: "مساحة لوحدات مستقبلية" },
      ],
      products: {
        eyebrow: "مجموعات مختارة",
        title: "تم تقسيم بنية المنتجات الى فئات واضحة مع الحفاظ على صوت العلامة الموحد.",
        description:
          "كل فئة تخدم حاجة مختلفة، لكن جميع اللغات تحافظ على نفس ايقاع التصفح الراقي.",
        items: [
          {
            title: "Skin Rituals",
            description: "مجموعة اساسية لتحضير البشرة والتوازن والاشراقة.",
          },
          {
            title: "Hair Signature",
            description: "تركز على اللمعان والاصلاح واللمسة النهائية الراقية للشعر.",
          },
          {
            title: "Studio Essentials",
            description: "بنية تحريرية مناسبة ايضا للتطبيقات الاحترافية.",
          },
        ],
      },
      services: {
        eyebrow: "تصميم التجربة",
        title: "صفحات الخدمات مبنية ككتل قابلة لاعادة الاستخدام وليست تخطيطات مؤقتة.",
        description:
          "وهذا يتيح لنا التوسع بعلاجات جديدة وعروض موسمية دون اعادة بناء الهيكل من البداية.",
        items: [
          {
            title: "تحليل البشرة وتخطيط الروتين",
            description: "نقطة بداية واضحة وراقية للتفاعل الاول.",
          },
          {
            title: "جلسات العناية",
            description: "بطاقات الخدمة تشرح المدة ومحور الجلسة ونبرة التجربة معا.",
          },
          {
            title: "استشارات العلامة الخاصة",
            description: "مسار منفصل للشراكات والضيوف الخاصين.",
          },
        ],
      },
      journal: {
        eyebrow: "المساحة التحريرية",
        title: "طبقة المدونة لا تكتفي بسرد المقالات بل تحمل صوت العلامة.",
        description:
          "ملاحظات الاتجاهات وتعليمات العناية ورواية الحملات يمكن ان تعيش ضمن نفس النظام المرن.",
        entries: [
          {
            title: "كيف نحافظ على روتين عناية موسمي بسيط وفعال؟",
            description: "ملاحظات تحريرية لبناء مظهر متوازن بعدد اقل من المنتجات.",
            meta: "روتين العناية",
          },
          {
            title: "ما الذي يصنع احساس الصالون الفاخر من الدقيقة الاولى؟",
            description: "نظرة على الاستقبال ونبرة التواصل وايقاع المكان.",
            meta: "تجربة العلامة",
          },
          {
            title: "كيف نجمع محتوى الجمال ضمن تقويم نشر قوي؟",
            description: "اطار عمل لربط محاور المدونة مع وسائل التواصل.",
            meta: "استراتيجية المحتوى",
          },
        ],
      },
      cta: {
        title: "اصبح لدينا اساس جاهز للتوسع.",
        description:
          "في الخطوة التالية يمكن اضافة نظام ادارة محتوى ونماذج وصفحات مقالات ديناميكية ووحدات للادمن فوق نفس المعمارية.",
        primary: "تواصل معنا",
        secondary: "لوحة الادارة",
      },
    },
    productsPage: {
      hero: {
        eyebrow: "بنية المنتجات",
        title: "نقدم المجموعات كعائلات خبرة متكاملة لا كقائمة منتجات فقط.",
        description:
          "تم اعداد الصفحة بكتل مرنة لتسمح لاحقا باضافة بيانات المنتجات والفوائد وطريقة الاستخدام دون تغيير المنطق العام.",
      },
      categories: [
        {
          title: "Core Skin",
          description: "طبقة يومية اساسية تركز على الوضوح والتوازن وسهولة الاختيار.",
          detail: "مناسبة لاقسام الغسول والتونر والسيروم والحماية.",
        },
        {
          title: "Repair Focus",
          description: "سلسلة تعافي للبشرة الحساسة ودعم الحاجز وراحة المظهر.",
          detail: "تترك مساحة لملاحظات الخبراء وتوجيه الروتين.",
        },
        {
          title: "Finish Touch",
          description: "منتجات مكملة تمنح لمسة نهائية ولمعانا سريعا.",
          detail: "منطقة عرض مستقلة لكن منسجمة للعروض والمواسم.",
        },
      ],
      pillars: [
        {
          title: "لغة صياغة واضحة",
          description: "رسائل تقلل التردد وتساعد الزائر على الاختيار بثقة.",
        },
        {
          title: "عرض فاخر على الرف",
          description: "بنية البطاقات والنص المختصر تمنح احساسا تحريريا اكثر.",
        },
        {
          title: "ثبات متعدد اللغات",
          description: "كل لغة تحافظ على نفس هندسة المعلومات ومنطق التصفح.",
        },
      ],
      roadmap: [
        {
          title: "استراتيجية الفئات",
          description: "يتم تعريف العائلات الرئيسية والتقسيمات الفرعية بوضوح.",
        },
        {
          title: "تعزيز المحتوى",
          description: "تضاف الفوائد وطريقة الاستخدام والملاحظات التحريرية.",
        },
        {
          title: "ربط الادارة",
          description: "في المرحلة التالية يمكن وصلها بنماذج بيانات سهلة الادارة.",
        },
      ],
    },
    servicesPage: {
      hero: {
        eyebrow: "تجربة الخدمة",
        title: "تموضع الخدمات يدعم التشغيل والحجز والانطباع الفاخر في الوقت نفسه.",
        description:
          "كل جلسة او استشارة خاصة يمكن عرضها مع المدة ومحور العناية وتوصيات المتابعة ضمن نظام واحد واضح.",
      },
      packages: [
        {
          title: "Signature Skin Session",
          description: "جلسة اولى تجمع تحليل البشرة وتحديد الاهداف وتخطيط الروتين.",
          meta: "60 دقيقة / للزائر الجديد",
        },
        {
          title: "Glow Maintenance",
          description: "جلسة متابعة اخف للضيوف العائدين الذين يبحثون عن الاستمرارية.",
          meta: "45 دقيقة / ايقاع شهري",
        },
        {
          title: "Private Beauty Edit",
          description: "مسار مخصص للضيوف الخاصين والشركاء ومواعيد العلامة.",
          meta: "تخطيط خاص / تنسيق فريق",
        },
      ],
      flow: [
        {
          title: "استشارة اولية",
          description: "تتم مراجعة الطلب وتحديد التوقعات وربطها بالخدمة المناسبة.",
        },
        {
          title: "جلسة التجربة",
          description: "الخطوات المعيارية تحفظ انسجام تقديم الخدمة بين افراد الفريق.",
        },
        {
          title: "المتابعة والتوجيه",
          description: "ملاحظات ما بعد الجلسة والخطوة التالية تصبح اسهل في الادارة.",
        },
      ],
      cta: {
        title: "هذا الهيكل مناسب بالفعل للادارة المستقبلية من لوحة التحكم.",
        description:
          "يمكن لاحقا ربط المدد والاسعار وحالات الحجز وتوزيع الفريق بسهولة.",
        action: "صمم تدفق الحجز",
      },
    },
    blogPage: {
      hero: {
        eyebrow: "التحرير الخاص بالعلامة",
        title: "تتحول المدونة الى مساحة تقود فيها العلامة الحوار لا مجرد ملء الفراغ.",
        description:
          "وبفضل تجميع المحتوى ضمن محاور تحريرية، يمكن توحيد السيو ووسائل التواصل واطلاقات المنتجات من مركز واحد.",
      },
      featured: {
        tag: "مقالة مميزة",
        title: "لماذا يجب بناء تقويم محتوى الجمال بالتوازي مع تقويم المنتجات؟",
        description:
          "عندما تخطط المقالات والاطلاقات وقصص الخدمات ضمن نظام تحريري واحد يصبح ايقاع العلامة اقوى واوضح.",
      },
      posts: [
        {
          title: "هيد سبا وتدليك فروة الراس: طقوس تحريرية لتهدئة التوتر",
          description: "كيف تصف ايقاعا بطيئا وارتياحا من فروة الراس الى الاكتاف مع وعد عناية فاخر في قصة واحدة؟",
          meta: "هيد سبا",
        },
        {
          title: "هل يجب ان يبدأ مدون الصالون بالتجربة ام بالنتيجة؟",
          description: "نظرة على الانماط التي تكسب الثقة بشكل اسرع في مواقع الجمال.",
          meta: "استراتيجية التجربة",
        },
        {
          title: "نظام مدونة متعدد اللغات يحافظ على الثبات دون تكرار ممل",
          description: "كيف نحافظ على الرسالة نفسها بين اللغات مع تجربة قراءة طبيعية.",
          meta: "سيو متعدد اللغات",
        },
        {
          title: "فكرة روتين شتوي بسيط لدعم حاجز البشرة",
          description: "زوايا تحريرية تدعم الحاجز دون مبالغة في الجو الجاف.",
          meta: "العناية بالبشرة",
        },
        {
          title: "عادات صغيرة تطيل عمر طلاء الاظافر بعد المانيكير",
          description: "كيف تبدو النصائح عملية لا خطابية في المدونة.",
          meta: "العناية باليدين",
        },
        {
          title: "خطوات لطيفة للعناية المنزلية بعد جلسة هيد سبا",
          description: "تمديد قصة الصالون بتعليمات هادئة وموثوقة.",
          meta: "هيد سبا",
        },
        {
          title: "مسودة خطة محتوى لمن يهتمون بتجانس لون البشرة",
          description: "اسطر تقويم تدير التوقعات مع الحفاظ على فخامة النبرة.",
          meta: "التحرير",
        },
        {
          title: "ماذا نقول وما نتجنب عند الكتابة عن حكة فروة الراس؟",
          description: "قائمة تحقق للغة معلوماتية دون ادعاءات طبية.",
          meta: "فروة الراس",
        },
        {
          title: "اختيار صور تجعل تجربة الصالون الفاخرة محسوسة في النص",
          description: "الضوء والتكوين والتفاصيل التي تعزز نبرة العلامة.",
          meta: "الصورة",
        },
        {
          title: "الحفاظ على ثقة النص في عروض الموسم دون صخب",
          description: "اشكال جمل تحافظ على الفخامة مع ذكر العروض.",
          meta: "الحملات",
        },
        {
          title: "استخدام تسلسل العناوين H1–H2 في المدونة مع مراعاة السيو",
          description: "قالب عملي لعناوين مقروءة ومنظمة.",
          meta: "السيو",
        },
        {
          title: "تحويل آراء العملاء الى قصص تحريرية بأمان",
          description: "امثلة تمزج بين الاثبات الاجتماعي والحكاية باعتدال.",
          meta: "الثقة",
        },
        {
          title: "قالب قصة قصيرة لعطور ومنتجات عناية متخصصة",
          description: "إيقاع فقرة واحدة للروائح والملمس ولحظة الاستخدام.",
          meta: "المنتج",
        },
        {
          title: "مقتطفات بريد بعد المواعيد: عناية وتذكير وشكر",
          description: "توحيد النبرة في رسائل المتابعة.",
          meta: "البريد",
        },
        {
          title: "قائمة تحقق لتحويل مقال الى كاروسيل لوسائل التواصل",
          description: "تقسيم المقال الطويل الى شرائح يعيدها المصمم.",
          meta: "التواصل",
        },
      ],
      topics: ["طقوس العناية", "لغة العلامة", "تصميم الخدمة", "ادلة المنتجات", "اتجاهات موسمية"],
      readMoreLabel: "اقرأ المزيد",
      loadMoreCta: "المزيد من المقالات — تابع الاسفل",
      continueLabel: "متابعة",
    },
    contactPage: {
      hero: {
        eyebrow: "نقطة التواصل",
        title: "المواعيد والشراكات والمحادثات الخاصة بالعلامة يمكن ان تبدأ من صفحة واحدة.",
        description:
          "تجمع هذه الصفحة بين بطاقات الوصول السريع وهيكل نموذج جاهز للربط لاحقا.",
      },
      cards: [
        {
          title: "طلبات المواعيد",
          description: "بداية واضحة لحجوزات الجلسات والاستشارات الاولية.",
          detail: "يمكن تنظيم الردود ضمن ساعات العمل.",
        },
        {
          title: "شراكات العلامة",
          description: "لجلسات التصوير والفعاليات وطلبات التعاون المميزة.",
          detail: "يمكن لاحقا تعريف تدفق منفصل للفرق المؤسسية.",
        },
        {
          title: "الصحافة والمحتوى",
          description: "قناة مخصصة للتواصل المرتبط بالمدونة والاطلاقات والاعلام.",
          detail: "مهيأة لادارة مركزية للتواصل.",
        },
      ],
      office: {
        title: "ملاحظات التواصل",
        description:
          "العناصر التالية عبارة عن محتوى ابتدائي ويمكن تحديثها قبل الاطلاق دون تغيير التصميم.",
        items: [
          { label: "الموقع", value: "اسطنبول / نموذج استوديو بالمواعيد" },
          { label: "الهاتف", value: "+90 (5xx) xxx xx xx" },
          { label: "البريد", value: "hello@emselbeauty.com" },
          { label: "الساعات", value: "الاثنين - السبت / 09:00 - 18:00" },
        ],
      },
      form: {
        title: "اترك رسالة سريعة",
        description:
          "النموذج حاليا هيكل بصري؛ وفي الخطوة التالية يمكن ربطه باكشن سيرفر او نقطة خلفية.",
        nameLabel: "الاسم الكامل",
        namePlaceholder: "اكتب اسمك",
        emailLabel: "البريد الالكتروني",
        emailPlaceholder: "name@example.com",
        messageLabel: "رسالتك",
        messagePlaceholder: "اكتب باختصار سبب تواصلك معنا",
        button: "ارسال الرسالة",
        note: "يمكن اضافة الربط الفعلي للنموذج في المرحلة التالية.",
      },
    },
    corporatePage: {
      hero: {
        eyebrow: "الهوية المؤسسية",
        title: "يتم جمع صوت العلامة ووعدها واتجاه نموها في طبقة مؤسسية واحدة.",
        description:
          "تعرض هذه الصفحة تعريف العلامة وقيمها وخارطة طريقها كنظام يبني الثقة لا كمقدمة عابرة فقط.",
      },
      intro: {
        title: "قمنا ببناء هذه الطبقة لتبقى بسيطة اليوم وقابلة للتوسع غدا.",
        description:
          "يمكن اضافة صفحات الفريق وملف الصحافة والشهادات واقسام الشركاء لاحقا دون كسر المعمارية الحالية.",
      },
      values: [
        {
          title: "الوضوح",
          description: "لغة علامة مصقولة بدلا من السرد المزدحم او المشتت.",
        },
        {
          title: "الثقة",
          description: "تجربة مهنية ومتزنة ومتسقة في كل نقطة تواصل.",
        },
        {
          title: "الاستمرارية",
          description: "علاقة جمالية مبنية على العناية طويلة المدى لا الحملات القصيرة.",
        },
      ],
      milestones: [
        {
          year: "01",
          title: "سرد العلامة",
          description: "تنتقل القصة وصوت المنتج ونبرة الخدمة الى الطبقة الرقمية.",
        },
        {
          year: "02",
          title: "توسع المحتوى",
          description: "تنمو تفاصيل المدونة والحملات والمنتجات داخل نظام تحريري منظم.",
        },
        {
          year: "03",
          title: "الربط التشغيلي",
          description: "ترتبط لوحة الادارة والنماذج ونماذج البيانات بسير العمل اليومي.",
        },
      ],
      promise: {
        title: "وعدنا",
        description:
          "أن نكون علامة جمالية تقدم الشعور نفسه من الثقة الهادئة في كل تواصل، رقميا وفعليا.",
        items: [
          "الحفاظ على نفس ادراك الجودة في كل لغة",
          "تسهيل تشغيل المحتوى للفريق الداخلي",
          "اضافة وحدات جديدة دون ارباك الهيكل الحالي",
        ],
      },
    },
  },
};

export function getDictionary(locale: Locale): SiteDictionary {
  return dictionaries[locale];
}
