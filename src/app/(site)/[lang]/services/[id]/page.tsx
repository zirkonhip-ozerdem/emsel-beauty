import Link from "next/link";
import { notFound } from "next/navigation";
import { siteLocales } from "@/i18n/config";
import "./detail.css";

/* ─── TYPES ─────────────────────────────── */
interface FAQ { q: string; a: string }
interface Process { step: string; title: string; desc: string }
interface Service {
  id: number;
  category: string;
  title: string;
  shortDesc: string;
  heroDesc: string;
  img: string;
  galleryImgs: string[];
  items: string[];
  duration: string;
  sessions: string;
  badge: string;
  process: Process[];
  faqs: FAQ[];
}

type PageProps = {
  params: Promise<{
    lang: string;
    id: string;
  }>;
};

/* ─── DATA ───────────────────────────────── */
const services: Service[] = [
  {
    id: 1,
    category: "Cilt Bakımı",
    title: "Derinlemesine Cilt Bakımı",
    shortDesc: "Cilt tipinize özel hazırlanan temizleme, peeling ve nemlendirme protokolleri.",
    heroDesc: "Cildinizin ihtiyaçlarına özel olarak formüle edilen derin temizlik, peeling ve yoğun nemlendirme protokolleri ile tek seansta görünür parlaklık ve sıkılaşma elde edin. Uzman estetisyenlerimiz cilt analizinizi yaparak size en uygun tedaviyi belirler.",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    galleryImgs: [
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&q=80",
      "https://images.unsplash.com/photo-1552693673-1bf958298935?w=400&q=80",
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&q=80",
    ],
    items: ["Derin Temizlik Protokolü", "Peeling & Nemlendirme", "Cilt Tonu Eşitleme", "Parlaklık Serumu"],
    duration: "75 dk",
    sessions: "1 Seans",
    badge: "Çok Tercih Edilen",
    process: [
      { step: "01", title: "Cilt Analizi", desc: "Uzman estetisyenimiz cilt tipinizi ve ihtiyaçlarınızı belirler." },
      { step: "02", title: "Derin Temizlik", desc: "Gözenekleri açan özel enzimler ile kapsamlı temizlik uygulanır." },
      { step: "03", title: "Peeling", desc: "Cilt tipine göre kimyasal ya da mekanik peeling seçilir." },
      { step: "04", title: "Yoğun Nemlendirme", desc: "Hiyalüronik asit ve peptit içerikli serumlar uygulanır." },
    ],
    faqs: [
      { q: "Ne sıklıkla yaptırmalıyım?", a: "Cilt tipinize bağlı olarak 3-4 haftada bir önerilir." },
      { q: "İşlem acı verir mi?", a: "Hayır, tamamen ağrısız ve rahatlatıcı bir deneyimdir." },
      { q: "Sonuçlar ne zaman görünür?", a: "İlk seanstan sonra anında parlaklık ve tazelik hissedilir." },
    ],
  },
  {
    id: 2,
    category: "Kalıcı Makyaj",
    title: "Microblading & Kaş Tasarımı",
    shortDesc: "Yüz hatlarınıza uygun, doğal görünümlü kaş tasarımı ve pigment uygulaması.",
    heroDesc: "Yüz hatlarınıza ve kemik yapınıza özel olarak tasarlanan kaşlar, doğal ve bakımlı bir görünüm kazandırır. Microblading tekniği ile her kıl ayrı ayrı işlenerek tamamen doğal bir görünüm elde edilir. 1-3 yıl kalıcılık sunan bu uygulama, sabah makyaj rutininizi ortadan kaldırır.",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    galleryImgs: [
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80",
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80",
      "https://images.unsplash.com/photo-1519415387722-a68073f31f95?w=400&q=80",
    ],
    items: ["Kaş Analizi & Tasarım", "Microblading Uygulaması", "Renk Pigmentasyonu", "Şekil Düzeltme"],
    duration: "2-3 saat",
    sessions: "2 Seans",
    badge: "Kalıcı Sonuç",
    process: [
      { step: "01", title: "Yüz Analizi", desc: "Yüz oranlarınıza ve kemik yapınıza göre ideal kaş şekli belirlenir." },
      { step: "02", title: "Tasarım", desc: "Kaş şekli çizilir ve onayınız alınır." },
      { step: "03", title: "Microblading", desc: "El aleti ile her kıl tek tek işlenerek pigment uygulanır." },
      { step: "04", title: "Kontrol Seansı", desc: "4-6 hafta sonra düzeltme ve retouche seansı yapılır." },
    ],
    faqs: [
      { q: "İşlem acıtır mı?", a: "Öncesinde krem anestezi uygulanır, minimal düzeyde hassasiyet hissedilebilir." },
      { q: "Kaç yıl kalıcı?", a: "Cilt tipine göre 1-3 yıl arasında kalıcılık sunar." },
      { q: "İyileşme süreci nasıl?", a: "İlk 7-10 gün hafif soyulma yaşanır, 4 haftada tam iyileşme tamamlanır." },
    ],
  },
  {
    id: 3,
    category: "Lazer & Epilasyon",
    title: "Lazer Epilasyon",
    shortDesc: "En yeni teknoloji ile güvenli ve etkili kalıcı tüy azaltma. Tüm cilt tonları için.",
    heroDesc: "Diode lazer teknolojisi ile tüm cilt tonlarına uygun, ağrısız ve etkili kalıcı tüy azaltma işlemi uyguluyoruz. FDA onaylı cihazlarımız ile her bölge için özel protokoller belirlenerek maksimum verim ve güvenlik sağlanır. Ortalama 6-8 seansta kalıcı sonuçlar elde edebilirsiniz.",
    img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80",
    galleryImgs: [
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&q=80",
      "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=400&q=80",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80",
    ],
    items: ["Diode Lazer Teknolojisi", "Tüm Cilt Tonları", "Ağrısız Uygulama", "Kalıcı Sonuçlar"],
    duration: "15-60 dk",
    sessions: "6-8 Seans",
    badge: "FDA Onaylı",
    process: [
      { step: "01", title: "Konsültasyon", desc: "Cilt tonu ve tüy yapısına göre lazer parametreleri ayarlanır." },
      { step: "02", title: "Hazırlık", desc: "Bölge temizlenir, soğutucu jel uygulanır." },
      { step: "03", title: "Lazer Uygulaması", desc: "Diode lazer ile kıl folikülleri hedeflenerek işlem yapılır." },
      { step: "04", title: "Seans Takibi", desc: "Her 4-6 haftada bir seans tekrarlanarak kalıcı sonuç elde edilir." },
    ],
    faqs: [
      { q: "Kaç seans gerekir?", a: "Bölgeye ve kıl yapısına göre ortalama 6-8 seans önerilir." },
      { q: "Tüm cilt tonlarına uygun mu?", a: "Diode lazerimiz tüm cilt tonlarında güvenle kullanılabilir." },
      { q: "Seans aralıkları ne kadar?", a: "4-6 haftalık aralıklarla düzenli seanslara devam edilir." },
    ],
  },
  {
    id: 4,
    category: "Vücut Bakımı",
    title: "Aromaterapi Masajı",
    shortDesc: "Özel yağlar ile kas gerginliğini gideren, lenf dolaşımını uyaran bütüncül terapi.",
    heroDesc: "Organik esansiyel yağlar ve özel formüle edilmiş masaj karışımları ile hem bedeninizi hem de zihninizi yenileyin. Uzman terapistlerimizin uyguladığı İsveç ve aromaterapi masajı kombinasyonu, kas gerginliğini giderir, lenf drenajını destekler ve derin bir rahatlama sağlar.",
    img: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80",
    galleryImgs: [
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&q=80",
      "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=400&q=80",
    ],
    items: ["İsveç Masajı", "Aromaterapi Yağları", "Lenf Drenajı", "Sırt & Boyun Odaklı"],
    duration: "60-90 dk",
    sessions: "Tek Seans",
    badge: "En Çok Tercih",
    process: [
      { step: "01", title: "Yağ Seçimi", desc: "İhtiyaçlarınıza göre lavanta, ökaliptüs veya gül yağı seçilir." },
      { step: "02", title: "Hazırlık", desc: "Özel terapi odasında rahatlatıcı ortam hazırlanır." },
      { step: "03", title: "Masaj", desc: "İsveç ve aromaterapi teknikleri kombinasyonu uygulanır." },
      { step: "04", title: "Dinlenme", desc: "Masaj sonrası bitkisel çay ile dinlenme süreci tamamlanır." },
    ],
    faqs: [
      { q: "Hangi yağları kullanıyorsunuz?", a: "Sertifikalı organik esansiyel yağlar tercih edilir; lavanta, bergamot, gül ve ökaliptüs başlıca seçeneklerimizdir." },
      { q: "Ne sıklıkla yaptırmalıyım?", a: "Haftada bir veya ayda iki kez düzenli masaj, kronik gerginliği giderir." },
      { q: "Hamilelikte uygulanır mı?", a: "Hamilelik masajı farklı protokollerle uygulanır; doktorunuza danıştıktan sonra özel randevu alabilirsiniz." },
    ],
  },
];

/* ─── PAGE ───────────────────────────────── */
export function generateStaticParams() {
  return siteLocales.flatMap((lang) =>
    services.map((service) => ({
      lang,
      id: String(service.id),
    })),
  );
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { id, lang } = await params;

  const service = services.find((s) => s.id === Number(id));
  if (!service) notFound();

  const related = services.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <>
      {/* BREADCRUMB */}
      <div className="detail-breadcrumb">
        <Link href={`/${lang}`}>Anasayfa</Link>
        <span className="detail-breadcrumb-sep">/</span>
        <Link href={`/${lang}/services`}>Hizmetlerimiz</Link>
        <span className="detail-breadcrumb-sep">/</span>
        <span>{service.title}</span>
      </div>

      {/* HERO */}
      <section className="detail-hero">
        <div className="detail-hero-img">
          <img src={service.img} alt={service.title} />
        </div>
        <div className="detail-hero-content">
          <span className="detail-badge">{service.badge}</span>
          <p className="detail-eyebrow">{service.category}</p>
          <h1 className="detail-title">{service.title}</h1>
          <p className="detail-desc">{service.heroDesc}</p>
          <div className="detail-meta">
            <div className="detail-meta-item">
              <span className="detail-meta-label">Süre</span>
              <span className="detail-meta-value">{service.duration}</span>
            </div>
            <div className="detail-meta-divider" />
            <div className="detail-meta-item">
              <span className="detail-meta-label">Seans</span>
              <span className="detail-meta-value">{service.sessions}</span>
            </div>
          </div>
          <Link href={`/${lang}/contact`} className="detail-btn-primary">
            Online Rezervasyon
          </Link>
        </div>
      </section>

      {/* FEATURES STRIP */}
      <div className="detail-features-strip">
        {service.items.map((item) => (
          <div className="detail-feature-item" key={item}>
            <span className="detail-feature-dot" />
            <span className="detail-feature-text">{item}</span>
          </div>
        ))}
      </div>

      {/* PROCESS */}
      <section className="detail-section">
        <p className="detail-section-eyebrow">Nasıl Çalışır</p>
        <h2 className="detail-section-title">Uygulama Süreci</h2>
        <div className="detail-process-grid">
          {service.process.map((p) => (
            <div className="detail-process-card" key={p.step}>
              <div className="detail-process-step">{p.step}</div>
              <div className="detail-process-title">{p.title}</div>
              <div className="detail-process-desc">{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="detail-section detail-section-alt">
        <p className="detail-section-eyebrow">Galeri</p>
        <h2 className="detail-section-title">Uygulama Görüntüleri</h2>
        <div className="detail-gallery-grid">
          {service.galleryImgs.map((img, i) => (
            <img key={i} src={img} alt={`${service.title} ${i + 1}`} className="detail-gallery-img" />
          ))}
        </div>
      </section>

      {/* ITEMS */}
      <section className="detail-section">
        <div className="detail-items-layout">
          <div>
            <p className="detail-section-eyebrow">Kapsam</p>
            <h2 className="detail-section-title">Bu Hizmete<br />Neler Dahil?</h2>
            <p className="detail-items-sub">{service.shortDesc}</p>
          </div>
          <ul className="detail-items-list">
            {service.items.map((item) => (
              <li key={item}>
                <span>{item}</span>
                <span className="detail-item-dot" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="detail-section detail-section-alt">
        <p className="detail-section-eyebrow">Sorular</p>
        <h2 className="detail-section-title">Sıkça Sorulan Sorular</h2>
        <div className="detail-faq-list">
          {service.faqs.map((faq, i) => (
            <details className="detail-faq-item" key={i}>
              <summary className="detail-faq-q">
                <span>{faq.q}</span>
                <span className="detail-faq-icon">+</span>
              </summary>
              <div className="detail-faq-a">{faq.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* RELATED */}
      <section className="detail-section">
        <p className="detail-section-eyebrow">Diğer Hizmetler</p>
        <h2 className="detail-section-title">İlginizi Çekebilir</h2>
        <div className="detail-related-grid">
          {related.map((s) => (
            <Link key={s.id} href={`/${lang}/services/${s.id}`} className="detail-rcard">
              <div className="detail-rcard-img-wrap">
                <img src={s.img} alt={s.title} className="detail-rcard-img" />
                <span className="detail-rcard-cat">{s.category}</span>
              </div>
              <div className="detail-rcard-body">
                <div className="detail-rcard-title">{s.title}</div>
                <div className="detail-rcard-desc">{s.shortDesc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
