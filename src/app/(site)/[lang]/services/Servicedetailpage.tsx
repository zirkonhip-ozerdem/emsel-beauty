"use client";
import { useState } from "react";

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
  color: string;
}

/* ─── DATA ───────────────────────────────── */
const services: Service[] = [
  {
    id: 1,
    category: "Cilt Bakımı",
    title: "Derinlemesine Cilt Bakımı",
    shortDesc: "Cilt tipinize özel hazırlanan temizleme, peeling ve nemlendirme protokolleri.",
    heroDesc:
      "Cildinizin ihtiyaçlarına özel olarak formüle edilen derin temizlik, peeling ve yoğun nemlendirme protokolleri ile tek seansta görünür parlaklık ve sıkılaşma elde edin. Uzman estetisyenlerimiz cilt analizinizi yaparak size en uygun tedaviyi belirler.",
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
    color: "#7a6452",
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
    heroDesc:
      "Yüz hatlarınıza ve kemik yapınıza özel olarak tasarlanan kaşlar, doğal ve bakımlı bir görünüm kazandırır. Microblading tekniği ile her kıl ayrı ayrı işlenerek tamamen doğal bir görünüm elde edilir. 1-3 yıl kalıcılık sunan bu uygulama, sabah makyaj rutininizi ortadan kaldırır.",
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
    color: "#8a6a7a",
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
    heroDesc:
      "Diode lazer teknolojisi ile tüm cilt tonlarına uygun, ağrısız ve etkili kalıcı tüy azaltma işlemi uyguluyoruz. FDA onaylı cihazlarımız ile her bölge için özel protokoller belirlenerek maksimum verim ve güvenlik sağlanır. Ortalama 6-8 seansta kalıcı sonuçlar elde edebilirsiniz.",
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
    color: "#526070",
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
    heroDesc:
      "Organik esansiyel yağlar ve özel formüle edilmiş masaj karışımları ile hem bedeninizi hem de zihninizi yenileyin. Uzman terapistlerimizin uyguladığı İsveç ve aromaterapi masajı kombinasyonu, kas gerginliğini giderir, lenf drenajını destekler ve derin bir rahatlama sağlar.",
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
    color: "#5a6e58",
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

/* ─── STYLES ─────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --gold: #b8975a;
    --gold-light: #d4b07a;
    --dark: #1a1410;
    --text: #3a3028;
    --muted: #7a6e62;
    --cream: #faf8f5;
    --cream-mid: #f2ede6;
    --cream-dark: #e8e0d5;
    --white: #ffffff;
    --serif: 'Cormorant Garamond', Georgia, serif;
    --sans: 'Jost', sans-serif;
    --radius: 2px;
    --shadow: 0 4px 30px rgba(90, 70, 50, 0.08);
    --shadow-lg: 0 12px 50px rgba(90, 70, 50, 0.14);
  }

  body { font-family: var(--sans); background: var(--cream); color: var(--text); }

  /* BREADCRUMB */
  .breadcrumb { padding: 16px 80px; display: flex; align-items: center; gap: 8px; font-size: 12px; letter-spacing: 0.06em; color: var(--muted); }
  .breadcrumb button { background: none; border: none; cursor: pointer; color: var(--muted); font-size: 12px; letter-spacing: 0.06em; font-family: var(--sans); transition: color 0.2s; }
  .breadcrumb button:hover { color: var(--gold); }
  .breadcrumb-sep { color: var(--cream-dark); }

  /* HERO */
  .detail-hero { display: grid; grid-template-columns: 1fr 1fr; min-height: 540px; }
  .detail-hero-img { position: relative; overflow: hidden; }
  .detail-hero-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .detail-hero-img::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to right, transparent 60%, var(--cream) 100%); }
  .detail-hero-content { padding: 60px 80px 60px 60px; display: flex; flex-direction: column; justify-content: center; background: var(--cream); }
  .detail-hero-eyebrow { font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); font-family: var(--sans); margin-bottom: 16px; }
  .detail-hero-title { font-family: var(--serif); font-size: 52px; font-weight: 300; line-height: 1.1; color: var(--dark); margin-bottom: 24px; }
  .detail-hero-desc { font-family: var(--serif); font-size: 17px; font-style: italic; line-height: 1.8; color: var(--muted); margin-bottom: 36px; max-width: 480px; }
  .detail-meta { display: flex; gap: 32px; margin-bottom: 40px; }
  .meta-item { display: flex; flex-direction: column; gap: 4px; }
  .meta-label { font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--muted); }
  .meta-value { font-family: var(--serif); font-size: 20px; font-weight: 500; color: var(--dark); }
  .meta-divider { width: 1px; background: var(--cream-dark); }
  .btn-primary { display: inline-block; background: var(--dark); color: var(--white); font-family: var(--sans); font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; padding: 16px 40px; border: none; cursor: pointer; transition: background 0.25s; text-decoration: none; }
  .btn-primary:hover { background: var(--gold); }
  .btn-outline { display: inline-block; border: 1px solid var(--dark); color: var(--dark); font-family: var(--sans); font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; padding: 15px 32px; cursor: pointer; background: none; transition: all 0.25s; }
  .btn-outline:hover { background: var(--dark); color: var(--white); }
  .hero-btns { display: flex; gap: 16px; align-items: center; }

  /* BADGE */
  .badge { display: inline-block; border: 1px solid var(--gold); color: var(--gold); font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; padding: 5px 14px; margin-bottom: 20px; font-family: var(--sans); }

  /* FEATURES */
  .features-strip { background: var(--dark); padding: 36px 80px; display: flex; gap: 0; }
  .feature-item { flex: 1; display: flex; align-items: center; gap: 14px; color: rgba(255,255,255,0.85); padding: 0 32px; border-left: 1px solid rgba(255,255,255,0.1); }
  .feature-item:first-child { padding-left: 0; border-left: none; }
  .feature-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--gold); flex-shrink: 0; }
  .feature-text { font-size: 12px; letter-spacing: 0.08em; font-family: var(--sans); font-weight: 300; }

  /* PROCESS */
  .section { padding: 90px 80px; }
  .section-alt { background: var(--cream-mid); }
  .section-eyebrow { font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); margin-bottom: 14px; font-family: var(--sans); }
  .section-title { font-family: var(--serif); font-size: 40px; font-weight: 300; color: var(--dark); margin-bottom: 54px; }
  .process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--cream-dark); }
  .process-card { background: var(--white); padding: 40px 32px; }
  .process-step { font-family: var(--serif); font-size: 56px; font-weight: 300; color: var(--cream-dark); line-height: 1; margin-bottom: 20px; }
  .process-title { font-family: var(--serif); font-size: 20px; font-weight: 500; color: var(--dark); margin-bottom: 10px; }
  .process-desc { font-size: 13px; line-height: 1.75; color: var(--muted); font-family: var(--sans); font-weight: 300; }

  /* GALLERY */
  .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .gallery-img { width: 100%; aspect-ratio: 4/3; object-fit: cover; display: block; }

  /* ITEMS LIST */
  .items-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
  .items-title-col { }
  .items-list { list-style: none; display: flex; flex-direction: column; gap: 0; }
  .items-list li { display: flex; align-items: center; justify-content: space-between; padding: 18px 0; border-bottom: 1px solid var(--cream-dark); font-family: var(--serif); font-size: 18px; color: var(--dark); }
  .items-list li:first-child { border-top: 1px solid var(--cream-dark); }
  .items-list .item-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--gold); flex-shrink: 0; }

  /* FAQ */
  .faq-list { display: flex; flex-direction: column; gap: 0; max-width: 720px; }
  .faq-item { border-bottom: 1px solid var(--cream-dark); }
  .faq-q { width: 100%; background: none; border: none; text-align: left; padding: 22px 0; font-family: var(--serif); font-size: 20px; color: var(--dark); cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 16px; }
  .faq-q:hover { color: var(--gold); }
  .faq-icon { font-size: 20px; color: var(--gold); flex-shrink: 0; transition: transform 0.3s; font-family: var(--sans); }
  .faq-icon.open { transform: rotate(45deg); }
  .faq-a { font-family: var(--sans); font-size: 14px; line-height: 1.8; color: var(--muted); font-weight: 300; padding-bottom: 22px; max-width: 600px; }

  /* CTA */
  .cta-section { background: var(--dark); padding: 90px 80px; text-align: center; }
  .cta-eyebrow { font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); margin-bottom: 20px; font-family: var(--sans); }
  .cta-title { font-family: var(--serif); font-size: 48px; font-weight: 300; color: var(--white); margin-bottom: 16px; }
  .cta-desc { font-family: var(--serif); font-size: 17px; font-style: italic; color: rgba(255,255,255,0.6); margin-bottom: 44px; }
  .cta-btns { display: flex; gap: 16px; justify-content: center; }
  .btn-gold { background: var(--gold); color: var(--white); border: none; font-family: var(--sans); font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; padding: 16px 40px; cursor: pointer; transition: background 0.25s; }
  .btn-gold:hover { background: var(--gold-light); }
  .btn-ghost { border: 1px solid rgba(255,255,255,0.3); color: rgba(255,255,255,0.8); font-family: var(--sans); font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; padding: 15px 32px; cursor: pointer; background: none; transition: all 0.25s; }
  .btn-ghost:hover { border-color: var(--gold); color: var(--gold); }

  /* RELATED */
  .related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .rcard { cursor: pointer; }
  .rcard-img-wrap { position: relative; overflow: hidden; }
  .rcard-img { width: 100%; aspect-ratio: 4/3; object-fit: cover; display: block; transition: transform 0.5s; }
  .rcard:hover .rcard-img { transform: scale(1.05); }
  .rcard-cat { position: absolute; top: 14px; left: 14px; background: var(--white); font-family: var(--sans); font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; padding: 5px 12px; color: var(--dark); }
  .rcard-body { padding: 20px 0 0; }
  .rcard-title { font-family: var(--serif); font-size: 22px; font-weight: 400; color: var(--dark); margin-bottom: 8px; }
  .rcard-desc { font-size: 13px; color: var(--muted); font-family: var(--sans); font-weight: 300; line-height: 1.7; }

  /* SERVICES LIST PAGE */
  .slist-header { padding: 80px 80px 60px; background: var(--cream); text-align: center; }
  .slist-eyebrow { font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); margin-bottom: 16px; font-family: var(--sans); }
  .slist-title { font-family: var(--serif); font-size: 64px; font-weight: 300; line-height: 1.05; color: var(--dark); margin-bottom: 20px; }
  .slist-sub { font-family: var(--serif); font-size: 18px; font-style: italic; color: var(--muted); max-width: 520px; margin: 0 auto; line-height: 1.8; }
  .slist-grid { padding: 0 80px 100px; display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--cream-dark); }
  .scard2 { background: var(--cream); cursor: pointer; transition: background 0.25s; }
  .scard2:hover { background: var(--white); }
  .scard2-img-wrap { position: relative; overflow: hidden; }
  .scard2-img { width: 100%; aspect-ratio: 3/2; object-fit: cover; display: block; transition: transform 0.6s; }
  .scard2:hover .scard2-img { transform: scale(1.04); }
  .scard2-cat-pill { position: absolute; top: 16px; left: 16px; background: var(--white); font-family: var(--sans); font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; padding: 5px 14px; color: var(--dark); }
  .scard2-title-bar { position: absolute; bottom: 0; left: 0; right: 0; padding: 16px 24px; background: linear-gradient(transparent, rgba(20,14,8,0.75)); }
  .scard2-title-bar h2 { font-family: var(--serif); font-size: 24px; font-weight: 400; color: var(--white); letter-spacing: 0.02em; }
  .scard2-body { padding: 28px 32px; }
  .scard2-desc { font-family: var(--serif); font-size: 16px; font-style: italic; color: var(--muted); line-height: 1.75; margin-bottom: 20px; }
  .scard2-items { display: flex; flex-direction: column; gap: 0; margin-bottom: 24px; }
  .scard2-item { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--cream-dark); font-family: var(--sans); font-size: 13px; color: var(--text); font-weight: 300; letter-spacing: 0.03em; }
  .scard2-item-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--gold); }
  .scard2-footer { padding: 0 32px 32px; }
  .btn-reserve { display: block; text-align: center; background: var(--dark); color: var(--white); font-family: var(--sans); font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; padding: 14px; border: none; cursor: pointer; transition: background 0.25s; text-decoration: none; }
  .btn-reserve:hover { background: var(--gold); }

`;

/* ─── STYLE INJECTOR ─────────────────────── */
function StyleProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      {children}
    </>
  );
}

/* ─── SERVICES LIST PAGE ─────────────────── */
function ServicesListPage({ onNavigate }: { onNavigate: (id: number) => void }) {
  return (
    <>
      <div className="slist-header">
        <p className="slist-eyebrow">Emsel Beauty &amp; Care Studio</p>
        <h1 className="slist-title">Profesyonel Güzellik<br />Hizmetleri</h1>
        <p className="slist-sub">Uzman ekibimiz ile cildinizin ve güzelliğinizin en iyi halini keşfedin. Her hizmet, sizin için özel olarak tasarlandı.</p>
      </div>
      <section className="slist-grid">
        {services.map((s) => (
          <div className="scard2" key={s.id}>
            <div className="scard2-img-wrap">
              <img className="scard2-img" src={s.img} alt={s.title} />
              <span className="scard2-cat-pill">{s.category}</span>
              <div className="scard2-title-bar"><h2>{s.title}</h2></div>
            </div>
            <div className="scard2-body">
              <p className="scard2-desc">{s.shortDesc}</p>
              <div className="scard2-items">
                {s.items.map((item) => (
                  <div className="scard2-item" key={item}>
                    <span>{item}</span>
                    <span className="scard2-item-dot" />
                  </div>
                ))}
              </div>
            </div>
            <div className="scard2-footer">
              <button className="btn-reserve" onClick={() => onNavigate(s.id)}>Detayları Gör &amp; Rezervasyon Yap</button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

/* ─── SERVICE DETAIL PAGE ────────────────── */
function ServiceDetailPage({ service, onBack, onNavigate }: { service: Service; onBack: () => void; onNavigate: (id: number) => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const related = services.filter(s => s.id !== service.id).slice(0, 3);

  return (
    <>
      {/* BREADCRUMB */}
      <div className="breadcrumb">
        <button onClick={onBack}>Anasayfa</button>
        <span className="breadcrumb-sep">/</span>
        <button onClick={onBack}>Hizmetlerimiz</button>
        <span className="breadcrumb-sep">/</span>
        <span>{service.title}</span>
      </div>

      {/* HERO */}
      <section className="detail-hero">
        <div className="detail-hero-img">
          <img src={service.img} alt={service.title} />
        </div>
        <div className="detail-hero-content">
          <span className="badge">{service.badge}</span>
          <p className="detail-hero-eyebrow">{service.category}</p>
          <h1 className="detail-hero-title">{service.title}</h1>
          <p className="detail-hero-desc">{service.heroDesc}</p>
          <div className="detail-meta">
            <div className="meta-item">
              <span className="meta-label">Süre</span>
              <span className="meta-value">{service.duration}</span>
            </div>
            <div className="meta-divider" />
            <div className="meta-item">
              <span className="meta-label">Seans</span>
              <span className="meta-value">{service.sessions}</span>
            </div>
          </div>
          <div className="hero-btns">
            <button className="btn-primary">Online Rezervasyon</button>
          </div>
        </div>
      </section>

      {/* FEATURES STRIP */}
      <div className="features-strip">
        {service.items.map((item) => (
          <div className="feature-item" key={item}>
            <span className="feature-dot" />
            <span className="feature-text">{item}</span>
          </div>
        ))}
      </div>

      {/* PROCESS */}
      <section className="section">
        <p className="section-eyebrow">Nasıl Çalışır</p>
        <h2 className="section-title">Uygulama Süreci</h2>
        <div className="process-grid">
          {service.process.map((p) => (
            <div className="process-card" key={p.step}>
              <div className="process-step">{p.step}</div>
              <div className="process-title">{p.title}</div>
              <div className="process-desc">{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="section section-alt">
        <p className="section-eyebrow">Galeri</p>
        <h2 className="section-title">Uygulama Görüntüleri</h2>
        <div className="gallery-grid">
          {service.galleryImgs.map((img, i) => (
            <img key={i} src={img} alt={`${service.title} ${i + 1}`} className="gallery-img" />
          ))}
        </div>
      </section>

      {/* ITEMS */}
      <section className="section">
        <div className="items-layout">
          <div className="items-title-col">
            <p className="section-eyebrow">Kapsam</p>
            <h2 className="section-title">Bu Hizmete<br />Neler Dahil?</h2>
            <p style={{ fontFamily: "var(--serif)", fontSize: 16, fontStyle: "italic", color: "var(--muted)", lineHeight: 1.8, maxWidth: 320 }}>
              {service.shortDesc}
            </p>
          </div>
          <ul className="items-list">
            {service.items.map((item) => (
              <li key={item}>
                <span>{item}</span>
                <span className="item-dot" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-alt">
        <p className="section-eyebrow">Sorular</p>
        <h2 className="section-title">Sıkça Sorulan Sorular</h2>
        <div className="faq-list">
          {service.faqs.map((faq, i) => (
            <div className="faq-item" key={i}>
              <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{faq.q}</span>
                <span className={`faq-icon${openFaq === i ? " open" : ""}`}>+</span>
              </button>
              {openFaq === i && <div className="faq-a">{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* RELATED */}
      <section className="section">
        <p className="section-eyebrow">Diğer Hizmetler</p>
        <h2 className="section-title">İlginizi Çekebilir</h2>
        <div className="related-grid">
          {related.map((s) => (
            <div className="rcard" key={s.id} onClick={() => onNavigate(s.id)}>
              <div className="rcard-img-wrap">
                <img src={s.img} alt={s.title} className="rcard-img" />
                <span className="rcard-cat">{s.category}</span>
              </div>
              <div className="rcard-body">
                <div className="rcard-title">{s.title}</div>
                <div className="rcard-desc">{s.shortDesc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/* ─── ROOT ───────────────────────────────── */
export default function App() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const activeService = services.find((s) => s.id === activeId) ?? null;

  return (
    <StyleProvider>
      {activeService ? (
        <ServiceDetailPage
          service={activeService}
          onBack={() => setActiveId(null)}
          onNavigate={setActiveId}
        />
      ) : (
        <ServicesListPage onNavigate={setActiveId} />
      )}
    </StyleProvider>
  );
}