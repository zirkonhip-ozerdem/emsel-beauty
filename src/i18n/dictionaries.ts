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
    campaigns: string;
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
    linksTitle: string;
    contactTitle: string;
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
    campaigns: SeoEntry;
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

const dictionaries = {
  tr: {
    brand: {
      name: "Emsel Beauty",
      tagline: "Sakin bir lüks duygusuyla tasarlanan güzellik deneyimi",
      description:
        "Cilt, saç ve marka deneyimini tek bir editoryal çizgide birleştiren çok dilli güzellik platformu.",
    },
    navigation: {
      home: "Anasayfa",
      products: "Ürünlerimiz",
      services: "Hizmetlerimiz",
      blog: "Blog",
      campaigns: "Kampanyalar",
      contact: "İletişim",
      corporate: "Kurumsal",
    },
    languageLabels: {
      tr: "Türkçe",
      en: "English",
      de: "Deutsch",
    },
    header: {
      consultation: "Online Rezervasyon",
    },
    footer: {
      note: "Starter içerikler örnek olarak hazırlandı; marka detayları kolayca güncellenebilir.",
      rights: "Tüm hakları saklıdır.",
      linksTitle: "Hızlı Linkler",
      contactTitle: "İletişim",
      addressLabel: "Merkez",
      address: "Örnek Mahallesi, Güzellik Cad. No:12 İstanbul",
      phoneLabel: "Telefon",
      phone: "+90 (5xx) xxx xx xx",
      mailLabel: "E-posta",
      mail: "hello@emselbeauty.com",
    },
    seo: {
      default: {
        title: "Emsel Beauty",
        description:
          "Emsel Beauty için hazırlanan çok dilli site mimarisi ve premium güzellik markası deneyimi.",
      },
      home: {
        title: "Anasayfa",
        description:
          "Emsel Beauty anasayfası; marka hikayesi, ürün seçkisi, hizmetler ve editoryal içerikler tek deneyimde.",
      },
      products: {
        title: "Ürünlerimiz",
        description:
          "Emsel Beauty ürün gamını kategori, formülasyon yaklaşımı ve deneyim başlıklarıyla keşfedin.",
      },
      services: {
        title: "Hizmetlerimiz",
        description:
          "Güzellik ritüellerini, salon deneyimini ve randevu akışlarını hizmet sayfasında inceleyin.",
      },
      blog: {
        title: "Blog",
        description:
          "Bakım ritüelleri, trend yorumları ve marka editoryalini blog sayfasında okuyun.",
      },
      campaigns: {
        title: "Kampanyalar",
        description:
          "Dönemsel bakım fırsatları, özel paketler ve sınırlı süreli teklifleri kampanyalar sayfasında inceleyin.",
      },
      contact: {
        title: "İletişim",
        description:
          "Emsel Beauty ile iletişime geçmek, randevu planlamak ve marka görüşmesi istemek için iletişim sayfası.",
      },
      corporate: {
        title: "Kurumsal",
        description:
          "Marka vaadi, değerler ve gelişim yol haritasını kurumsal sayfada inceleyin.",
      },
    },
    home: {
      hero: {
        eyebrow: "Editoryal güzellik platformu",
        title: "Bakım, estetik ve marka hikayesini tek bir sakin ritimde buluşturuyoruz.",
        description:
          "Emsel Beauty için kurduğumuz bu altyapı; çok dilli site deneyimini premium bir görünümle, tek dilli yönetim panelini ise operasyon odaklı bir yapıyla bir araya getiriyor.",
        primary: "Hizmetleri İncele",
        secondary: "Markayı Tanı",
        badges: ["TR / EN / DE hazır", "Admin yapısı ayrık", "Premium landing kurgusu"],
      },
      stats: [
        { value: "3", label: "Dil ile aynı içerik mimarisi" },
        { value: "6", label: "Ana sayfa ve temel site rotası" },
        { value: "1", label: "Tek dilli admin merkezi" },
        { value: "∞", label: "İçerik ve modül genişletme alanı" },
      ],
      products: {
        eyebrow: "Seçili koleksiyonlar",
        title: "Ürün mimarisi kategorilere ayrıldı, marka dili ise tek çizgide tutuldu.",
        description:
          "Her kategori farklı bir ihtiyaca hitap ederken, sayfa akışı tüm dillerde aynı deneyim ritmini koruyor.",
        items: [
          {
            title: "Skin Rituals",
            description: "Cilt hazırlığı, dengeleme ve ışıltı odaklı temel koleksiyon.",
          },
          {
            title: "Hair Signature",
            description: "Saç bakımında parlaklık, onarım ve bitiş etkisini öne çıkarır.",
          },
          {
            title: "Studio Essentials",
            description: "Profesyonel uygulamalara uyumlu, rafine içerik kurgusu.",
          },
        ],
      },
      services: {
        eyebrow: "Deneyim tasarımı",
        title: "Hizmet sayfaları tek seferlik değil, tekrar kullanılabilir bloklarla kurgulandı.",
        description:
          "Böylece randevu, kampanya ve sezonluk servisleri yeni layout kurmadan genişletebiliriz.",
        items: [
          {
            title: "Cilt analiz ve rutin planlama",
            description: "İlk temas için net, yönlendirici ve premium başlangıç noktası.",
          },
          {
            title: "Bakım seansları",
            description: "Servis kartlarıyla süre, odak alan ve deneyim tonu birlikte anlatılır.",
          },
          {
            title: "VIP marka görüşmeleri",
            description: "Kurumsal iş birlikleri için farklı bir temas akışı sunar.",
          },
        ],
      },
      journal: {
        eyebrow: "Editoryal alan",
        title: "Blog tarafı sadece yazı listesi değil, markanın sesini taşıyan bir katman.",
        description:
          "Trend yazıları, bakım notları ve ürün eğitimi içerikleri için aynı modüler düzeni kullanıyoruz.",
        entries: [
          {
            title: "Mevsim geçişlerinde cilt rutini nasıl sade tutulur?",
            description: "Daha az ürünle daha dengeli bir görünüm kurmak için editoryal notlar.",
            meta: "Bakım rutini",
          },
          {
            title: "Salon deneyiminde premium hissi oluşturan detaylar",
            description: "Karşılama, dil tonu ve mekan akışını bir arada düşünen servis tasarımı.",
            meta: "Marka deneyimi",
          },
          {
            title: "Yayın takvimi için güzellik içerikleri nasıl gruplanır?",
            description: "Blog ve sosyal medya arasında uyumlu içerik kolonları kurmak için.",
            meta: "İçerik stratejisi",
          },
        ],
      },
      cta: {
        title: "Site altyapısını büyütmeye hazır bir iskelet kurduk.",
        description:
          "Sonraki adımda CMS, form entegrasyonu, çoklu blog detay sayfaları ve admin modüllerini aynı mimari üstüne ekleyebiliriz.",
        primary: "İletişime Geç",
        secondary: "Admin Paneli",
      },
    },
    productsPage: {
      hero: {
        eyebrow: "Ürün kurgusu",
        title: "Koleksiyonları sadece ürün listesi olarak değil, deneyim aileleri olarak konumluyoruz.",
        description:
          "Bu sayfa; kategori sunumu, formülasyon ilkeleri ve ürün geliştirme akışlarını ileride rahatça besleyebileceğin modüler bloklarla hazırlandı.",
      },
      categories: [
        {
          title: "Core Skin",
          description: "Günlük rutinin temel katmanı için temiz, dengeli ve hızlı karar verdiren seri.",
          detail: "Temizleme, tonik, serum ve koruyucu başlıkları için uygun iskelet.",
        },
        {
          title: "Repair Focus",
          description: "Bariyer desteği, hassasiyet yönetimi ve toparlama odaklı alt seri.",
          detail: "Uzman önerileri ve kullanım rutinleri için açık içerik alanı sunar.",
        },
        {
          title: "Finish Touch",
          description: "Anlık görünüm etkisi ve gün sonu ışıltısını destekleyen tamamlayıcı ürünler.",
          detail: "Kampanya ve sezon ürünleri için ayrık ama uyumlu vitrin alanı.",
        },
      ],
      pillars: [
        {
          title: "Net formül dili",
          description: "İçerik karmaşasını azaltan, kullanıcıya karar kolaylığı sağlayan anlatım.",
        },
        {
          title: "Premium raf düzeni",
          description: "Kart yapısı, görsel yerleşim ve kısa açıklamalarla daha editoryal sunum.",
        },
        {
          title: "Çok dilli tutarlılık",
          description: "Tüm locale'lerde aynı bilgi mimarisi ve aynı kullanıcı akışı korunur.",
        },
      ],
      roadmap: [
        {
          title: "Kategori stratejisi",
          description: "Ana ürün aileleri ve alt segmentler tanımlanır.",
        },
        {
          title: "İçerik zenginleştirme",
          description: "Faydalar, kullanım şekilleri ve editör notları eklenir.",
        },
        {
          title: "Admin bağlantısı",
          description: "Son aşamada panellerden kolayca yönetilecek veri modeli bağlanır.",
        },
      ],
    },
    servicesPage: {
      hero: {
        eyebrow: "Servis deneyimi",
        title: "Hizmetler; operasyon, randevu ve premium algıyı aynı anda taşıyacak şekilde yerleşiyor.",
        description:
          "Salon ya da stüdyo tarafındaki servislerin her biri; süre, odak alan ve sonrasındaki bakım önerileriyle birlikte anlaşılır hale geliyor.",
      },
      packages: [
        {
          title: "Signature Skin Session",
          description: "Cilt analizi, hedef belirleme ve ilk rutin planlamasını tek seans içinde toplar.",
          meta: "60 dakika / yeni müşteri odaklı",
        },
        {
          title: "Glow Maintenance",
          description: "Düzenli bakım alan misafirler için daha kısa ama ritmi koruyan tekrar seansı.",
          meta: "45 dakika / aylık devam paketi",
        },
        {
          title: "Private Beauty Edit",
          description: "Marka iş birlikleri veya VIP misafirler için özelleştirilmiş deneyim akışı.",
          meta: "Özel planlama / ekip koordinasyonu",
        },
      ],
      flow: [
        {
          title: "Ön görüşme",
          description: "Talep alınır, beklenti çerçevelenir ve uygun servis belirlenir.",
        },
        {
          title: "Deneyim oturumu",
          description: "Servis kartındaki adımlar standardize edilerek ekip içi uyum korunur.",
        },
        {
          title: "Takip ve öneriler",
          description: "Seans sonrası rutin notları ve sonraki randevu aksiyonu netleştirilir.",
        },
      ],
      cta: {
        title: "Bu servisler admin panelinden rahatça yönetilmeye uygun bir yapıya sahip.",
        description:
          "Bir sonraki adımda paket süreleri, fiyatlar, rezervasyon durumları ve ekip atamaları bağlanabilir.",
        action: "Randevu Akışını Tasarla",
      },
    },
    blogPage: {
      hero: {
        eyebrow: "Marka editörü",
        title: "Blog, markanın sadece anlattığı değil yön verdiği bir alana dönüşüyor.",
        description:
          "Kategori bazlı yazı yapısı sayesinde SEO, sosyal medya ve marka tonu tek merkezden hizalanabilir.",
      },
      featured: {
        tag: "Öne çıkan yazı",
        title: "Güzellik markasında içerik takvimi neden ürün takvimiyle aynı anda düşünülmeli?",
        description:
          "Yazılar, kampanyalar ve hizmet tanıtımları tek bir editoryal sistem içinde planlandığında daha güçlü bir marka ritmi oluşur.",
      },
      posts: [
        {
          title: "Kafa masajı ve head spa: gerginliği azaltan ritüel rehberi",
          description:
            "Saç derisi, baş bölgesi ve omuz hattı için sakin tempolu, premium bir deneyim vaadiyle nasıl anlatılır?",
          meta: "Kafa masajı",
        },
        {
          title: "Salon blog'unda önce deneyim mi, önce sonuç mu gösterilmeli?",
          description: "Dijital vitrinde kullanıcının güvenini en hızlı toplayan kurgular.",
          meta: "Deneyim stratejisi",
        },
        {
          title: "Çok dilli blog yapısında tekrar etmeyen ama tutarlı içerik sistemi",
          description: "Her dilde aynı mesajı korurken doğal okuma deneyimi sağlama yöntemi.",
          meta: "Multilingual SEO",
        },
        {
          title: "Kış aylarında nem bariyerini korumak için sade rutin önerileri",
          description: "Kuru hava ve ısıtma ile bozulan bariyeri destekleyen, abartısız bakım başlıkları.",
          meta: "Cilt bakımı",
        },
        {
          title: "Manikür sonrası ojenin dayanıklılığını artıran küçük alışkanlıklar",
          description: "Günlük rutinde nelere dikkat edilir, blogda nasıl kısa ve net anlatılır?",
          meta: "El bakımı",
        },
        {
          title: "Head spa sonrası evde uygulanabilecek hafif bakım adımları",
          description: "Salon deneyimini uzatan, müşteriye güven veren yönlendirici içerik fikirleri.",
          meta: "Head spa",
        },
        {
          title: "Cilt tonunu eşitlemek isteyenler için içerik planı önerisi",
          description: "Vaatleri abartmadan, beklentiyi yöneten editoryal takvim satırları.",
          meta: "İçerik planı",
        },
        {
          title: "Saç derisi kaşıntısında nelere dikkat edilmeli, ne yazılmalı?",
          description: "Tıbbi iddia yerine bilgilendirici ve güvenli dil için kontrol listesi.",
          meta: "Saç derisi",
        },
        {
          title: "Premium salon deneyimini metinde hissettiren fotoğraf seçimi",
          description: "Işık, kadraj ve detaylarla marka tonunu destekleyen görsel anlatım.",
          meta: "Görsel dil",
        },
        {
          title: "Sezonluk kampanya metinlerinde abartıdan kaçınma rehberi",
          description: "İndirim ve kampanya cümlelerinde premium hissi koruyan cümle yapıları.",
          meta: "Kampanya",
        },
        {
          title: "Blog yazılarında H1-H2 hiyerarşisini SEO ile uyumlu kullanma",
          description: "Okunabilirliği bozmadan anahtar kelime ve başlık hizası için pratik şablon.",
          meta: "SEO",
        },
        {
          title: "Müşteri yorumlarını editoryal içeriğe dönüştürme fikirleri",
          description: "Sosyal kanıt ile hikaye anlatımını birleştiren güvenli örnekler.",
          meta: "Güven",
        },
        {
          title: "Niş parfüm ve bakım ürünleri için ürün hikayesi şablonu",
          description: "Notalar, dokusu ve kullanım anını tek paragrafta toplayan yazı kalıbı.",
          meta: "Ürün hikayesi",
        },
        {
          title: "Randevu sonrası e-posta içerikleri için kısa mesaj kalıpları",
          description: "Bakım önerisi, hatırlatma ve teşekkür tonunu aynı ritimde tutma.",
          meta: "E-posta",
        },
        {
          title: "Sosyal medya için blog yazısından carousel üretme checklist'i",
          description: "Tek yazıdan beş alt başlık çıkaran, tasarımla uyumlu içerik bölme rehberi.",
          meta: "Sosyal medya",
        },
      ],
      topics: ["Bakım ritüelleri", "Marka dili", "Servis deneyimi", "Ürün rehberi", "Sezon trendleri"],
      readMoreLabel: "Devamını Oku",
      loadMoreCta: "Daha fazla yazı - aşağıda devamına bak",
      continueLabel: "Devamı",
    },
    contactPage: {
      hero: {
        eyebrow: "Temas noktası",
        title: "Randevu, iş birliği ya da marka görüşmesi için aynı sayfadan iletişime geçilebilir.",
        description:
          "İletişim alanı; hızlı temas kartlarıyla birlikte daha sonra form entegrasyonuna hazır bir yapı sunuyor.",
      },
      cards: [
        {
          title: "Randevu talepleri",
          description: "Bakım seansı ve ön görüşme rezervasyonları için başlangıç noktası.",
          detail: "Hafta içi 09:00 - 18:00 arasında dönüş planlanır.",
        },
        {
          title: "Marka iş birlikleri",
          description: "Editoryal çekim, etkinlik ve premium ortaklık görüşmeleri.",
          detail: "Kurumsal ekipler için ayrık akış tasarlanabilir.",
        },
        {
          title: "İçerik ve basın",
          description: "Blog, lansman ve basın taleplerine yönelik iletişim başlığı.",
          detail: "Tek merkezden koordine edilen iletişim modeli.",
        },
      ],
      office: {
        title: "İletişim notları",
        description: "Aşağıdaki bilgiler starter içerik olarak yerleştirildi; canlıya geçmeden önce kolayca güncellenebilir.",
        items: [
          { label: "Konum", value: "İstanbul / randevulu stüdyo modeli" },
          { label: "Telefon", value: "+90 (5xx) xxx xx xx" },
          { label: "E-posta", value: "hello@emselbeauty.com" },
          { label: "Çalışma saatleri", value: "Pazartesi - Cumartesi / 09:00 - 18:00" },
        ],
      },
      form: {
        title: "Hızlı mesaj bırak",
        description: "Form alanları şimdilik statik iskelet olarak eklendi; sonraki adımda action ya da backend'e bağlanabilir.",
        nameLabel: "Ad Soyad",
        namePlaceholder: "İsminizi girin",
        emailLabel: "E-posta",
        emailPlaceholder: "eposta@ornek.com",
        messageLabel: "Mesajınız",
        messagePlaceholder: "Ne için iletişime geçmek istediğinizi kısaca yazın",
        button: "Mesaj Gönder",
        note: "Canlı form entegrasyonu sonraki fazda bağlanacak.",
      },
    },
    corporatePage: {
      hero: {
        eyebrow: "Kurumsal kimlik",
        title: "Markanın sesi, vaadi ve büyüme rotası tek bir kurumsal çizgide toplanıyor.",
        description:
          "Kurumsal sayfa; marka tanımı, değerler ve yol haritasını yalnızca tanıtım değil güven oluşturan bir yapıda sunuyor.",
      },
      intro: {
        title: "Emsel Beauty'yi yapısal olarak uzun ömürlü kılmak için bu sayfayı sade ama genişlemeye açık kurduk.",
        description:
          "İleride ekip, basın kit'i, sertifikalar ya da franchise benzeri alt sayfalar eklense bile mevcut mimari bozulmadan büyüyebilir.",
      },
      values: [
        {
          title: "Sadelik",
          description: "Karışık anlatım yerine rafine ve net bir marka dili.",
        },
        {
          title: "Güven",
          description: "Her temas noktasında profesyonel, ölçülü ve tutarlı deneyim.",
        },
        {
          title: "Süreklilik",
          description: "Kampanyaya değil kalıcı bakım ilişkisine odaklanan yaklaşım.",
        },
      ],
      milestones: [
        {
          year: "01",
          title: "Marka anlatımı",
          description: "Hikaye, ürün dili ve servis tonunun dijital zemine taşınması.",
        },
        {
          year: "02",
          title: "İçerik genişlemesi",
          description: "Blog, kampanya ve ürün detaylarının sistemli olarak büyütülmesi.",
        },
        {
          year: "03",
          title: "Operasyon bağlantısı",
          description: "Admin paneli, formlar ve veri modelleri ile günlük yönetimin bağlanması.",
        },
      ],
      promise: {
        title: "Marka vaadimiz",
        description: "Her dokunuşta aynı sakin güveni hissettiren, dijitalde de fiziksel deneyimde de rafine kalan bir güzellik markası olmak.",
        items: [
          "Tüm dillerde aynı kalite algısını korumak",
          "İçerik yönetimini ekip için kolaylaştırmak",
          "Yeni modülleri mevcut düzeni bozmadan ekleyebilmek",
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
      campaigns: "Campaigns",
      contact: "Contact",
      corporate: "Corporate",
    },
    languageLabels: {
      tr: "Turkish",
      en: "English",
      de: "German",
    },
    header: {
      consultation: "Online Reservation",
    },
    footer: {
      note: "Starter copy is included as a placeholder and can be replaced with final brand content.",
      rights: "All rights reserved.",
      linksTitle: "Quick Links",
      contactTitle: "Contact",
      addressLabel: "Base",
      address: "Örnek Mahallesi, Güzellik Cad. No:12 İstanbul",
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
      campaigns: {
        title: "Campaigns",
        description:
          "Review seasonal beauty offers, curated bundles and limited-time packages on the campaigns page.",
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
        badges: ["Ready for TR / EN / DE", "Separate admin structure", "Premium landing flow"],
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
          "Durations, priçing, booking states and team assignments can be attached in the next phase.",
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
          { label: "Location", value: "İstanbul / appointment-only studio model" },
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
      campaigns: "الحملات",
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
      linksTitle: "روابط سريعة",
      contactTitle: "التواصل",
      addressLabel: "المقر",
      address: "Örnek Mahallesi, Güzellik Cad. No:12 İstanbul",
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
      campaigns: {
        title: "الحملات",
        description:
          "راجع العروض الموسمية والباقات الخاصة والفرص محدودة المدة في صفحة الحملات.",
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

const germanDictionary: SiteDictionary = {
  ...(dictionaries.en as SiteDictionary),
  navigation: {
    home: "Startseite",
    products: "Produkte",
    services: "Services",
    blog: "Blog",
    campaigns: "Kampagnen",
    contact: "Kontakt",
    corporate: "Unternehmen",
  },
  languageLabels: {
    tr: "Türkisch",
    en: "Englisch",
    de: "Deutsch",
  },
  header: {
    consultation: "Online-Reservierung",
  },
  footer: {
    ...(dictionaries.en as SiteDictionary).footer,
    note: "Die aktuellen Texte dienen als Platzhalter und konnen spater durch finale Markeninhalte ersetzt werden.",
    rights: "Alle Rechte vorbehalten.",
    linksTitle: "Schnellzugriff",
    contactTitle: "Kontakt",
    addressLabel: "Adresse",
    phoneLabel: "Telefon",
    mailLabel: "E-Mail",
  },
  seo: {
    ...(dictionaries.en as SiteDictionary).seo,
    home: {
      title: "Startseite",
      description:
        "Entdecken Sie die Startseite von Emsel Beauty mit Markenwelt, Produkten, Services und editorialen Inhalten in einem ruhigen Erlebnis.",
    },
    products: {
      title: "Produkte",
      description:
        "Entdecken Sie Produktkategorien, Formulierungsansatze und die Premium-Produktwelt von Emsel Beauty.",
    },
    services: {
      title: "Services",
      description:
        "Prufen Sie Beauty-Rituale, Servicepakete und buchungsfreundliche Ablaufe.",
    },
    blog: {
      title: "Blog",
      description:
        "Lesen Sie editoriale Notizen, Pflegeroutinen und Beauty-Trends im Emsel Beauty Blog.",
    },
    campaigns: {
      title: "Kampagnen",
      description:
        "Entdecken Sie saisonale Angebote, kuratierte Pakete und zeitlich begrenzte Specials auf der Kampagnenseite.",
    },
    contact: {
      title: "Kontakt",
      description:
        "Kontaktieren Sie Emsel Beauty fur Termine, Kooperationen und Markenanfragen.",
    },
    corporate: {
      title: "Unternehmen",
      description:
        "Lernen Sie Markenversprechen, Werte und Wachstumsplan auf der Unternehmensseite kennen.",
    },
  },
};

export function getDictionary(locale: Locale): SiteDictionary {
  if (locale === "de") {
    return germanDictionary;
  }

  return dictionaries[locale] as SiteDictionary;
}
