"use client";

import { useState } from "react";

const services = [
  {
    id: 1,
    category: "Cilt Bakımı",
    title: "Derinlemesine Cilt Bakımı",
    desc: "Cilt tipinize özel hazırlanan temizleme, peeling ve nemlendirme protokolleri ile cildinizi yenileyin. Tek seansta görünür parlaklık ve sıkılaşma.",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
    items: ["Derin Temizlik Protokolü", "Peeling & Nemlendirme", "Cilt Tonu Eşitleme", "Parlaklık Serumu"],
  },
  {
    id: 2,
    category: "Kalıcı Makyaj",
    title: "Microblading & Kaş Tasarımı",
    desc: "Yüz hatlarınıza uygun, doğal görünümlü kaş tasarımı. Pigment uygulaması ile uzun süreli ve bakımlı bir görünüm.",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
    items: ["Kaş Analizi & Tasarım", "Microblading Uygulaması", "Renk Pigmentasyonu", "Şekil Düzeltme"],
  },
  {
    id: 3,
    category: "Lazer & Epilasyon",
    title: "Lazer Epilasyon",
    desc: "En yeni teknoloji ile güvenli ve etkili kalıcı tüy azaltma. Tüm cilt tonları için uygun, ağrısız protokoller.",
    img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80",
    items: ["Diode Lazer Teknolojisi", "Tüm Cilt Tonları", "Ağrısız Uygulama", "Kalıcı Sonuçlar"],
  },
  {
    id: 4,
    category: "Vücut Bakımı",
    title: "Aromaterapi Masajı",
    desc: "Özel yağlar ile kas gerginliğini gideren, lenf dolaşımını uyaran ve zihni dinlendiren bütüncül terapi.",
    img: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80",
    items: ["İsveç Masajı", "Aromaterapi Yağları", "Lenf Drenajı", "Sırt & Boyun Odaklı"],
  },
];

export default function ServicesPage() {
  const [_active, setActive] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --brown-dark:  #3b2a1a;
          --brown-mid:   #6b4c32;
          --brown-light: #9c7a5a;
          --gold:        #c9a84c;
          --gold-light:  #e2c47a;
          --cream:       #faf6f0;
          --bej:         #f2ebe0;
          --text-dark:   #2e1f0f;
          --text-mid:    #6b4c32;
          --border:      rgba(180,140,90,0.25);
          --green-dark:  #2a3320;
          --green-mid:   #3d4a2e;
        }

        .services-page {
          background-image: url('/background/back-1.jpeg');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          font-family: 'EB Garamond', Georgia, serif;
          color: var(--text-dark);
          width: 100%;
        }

        .page-header {
          text-align: center;
          padding: 72px 24px 52px;
          border-bottom: 1px solid var(--border);
          background: rgba(250,246,240,0.55);
          backdrop-filter: blur(4px);
        }
        .page-eyebrow {
          font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: 0.35em;
          text-transform: uppercase; color: var(--brown-light); margin-bottom: 18px;
          display: flex; align-items: center; justify-content: center; gap: 14px;
        }
        .page-eyebrow::before, .page-eyebrow::after {
          content: ''; width: 48px; height: 0.5px; background: var(--gold); display: block;
        }
        .page-title {
          font-family: 'Cinzel', serif; font-size: 34px; font-weight: 600;
          letter-spacing: 0.16em; text-transform: uppercase; color: var(--brown-dark);
          margin-bottom: 18px; line-height: 1.3;
        }
        .page-sub {
          font-family: 'EB Garamond', serif; font-size: 16px; font-style: italic;
          color: var(--text-mid); max-width: 480px; margin: 0 auto; line-height: 1.8;
        }

        .services-grid {
          max-width: 1040px; margin: 0 auto; padding: 64px 32px 80px;
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 28px;
        }

        .scard {
          border: 1px solid var(--border);
          background: rgba(250,246,240,0.82);
          backdrop-filter: blur(6px);
          display: flex; flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer; overflow: hidden;
        }
        .scard:hover { transform: translateY(-3px); box-shadow: 0 20px 48px rgba(60,30,10,0.14); }
        .scard-img-wrap { position: relative; overflow: hidden; height: 220px; }
        .scard-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.6s ease; }
        .scard:hover .scard-img { transform: scale(1.05); }
        .scard-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(45,25,10,0.78) 0%, transparent 55%); }
        .scard-cat-pill {
          position: absolute; top: 14px; left: 14px;
          background: rgba(250,246,240,0.92);
          font-family: 'Cinzel', serif; font-size: 8px; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--brown-dark);
          padding: 5px 11px; border: 1px solid var(--border);
        }
        .scard-title-bar { position: absolute; bottom: 0; left: 0; right: 0; padding: 14px 20px; }
        .scard-title-bar h2 {
          font-family: 'Cinzel', serif; font-size: 13px; font-weight: 600;
          letter-spacing: 0.16em; text-transform: uppercase; color: #f5ede0; line-height: 1.3;
        }
        .scard-body { padding: 20px 22px 22px; flex: 1; display: flex; flex-direction: column; gap: 16px; }
        .scard-desc { font-family: 'EB Garamond', serif; font-size: 14.5px; line-height: 1.75; color: var(--text-mid); font-style: italic; }
        .scard-items { display: flex; flex-direction: column; gap: 0; padding-top: 4px; border-top: 0.5px solid var(--border); }
        .scard-item {
          display: flex; justify-content: space-between; align-items: center;
          font-family: 'EB Garamond', serif; font-size: 13.5px; color: var(--text-dark);
          padding: 8px 0; border-bottom: 0.5px solid rgba(180,140,90,0.1);
        }
        .scard-item-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--gold); flex-shrink: 0; }
        .scard-footer { padding: 0 22px 20px; }
        .btn-reserve {
          display: block; width: 100%; text-align: center;
          font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--cream); background: var(--brown-dark);
          border: none; padding: 13px; cursor: pointer; text-decoration: none; transition: background 0.2s;
        }
        .btn-reserve:hover { background: var(--brown-mid); }

        .divider { display: flex; align-items: center; justify-content: center; gap: 16px; padding: 0 32px; margin: 0 auto 64px; max-width: 400px; }
        .divider-line { flex: 1; height: 0.5px; background: var(--gold); opacity: 0.5; }
        .divider-diamond { width: 7px; height: 7px; background: var(--gold); transform: rotate(45deg); flex-shrink: 0; }

        
      `}</style>

      <div className="services-page">

        <header className="page-header">
          <p className="page-eyebrow">Emsel Beauty &amp; Care Studio</p>
          <h1 className="page-title">Profesyonel Güzellik<br/>Hizmetleri</h1>
          <p className="page-sub">Uzman ekibimiz ile cildinizin ve güzelliğinizin en iyi halini keşfedin. Her hizmet, sizin için özel olarak tasarlandı.</p>
        </header>

        <section className="services-grid">
          {services.map((s) => (
            <div className="scard" key={s.id} onClick={() => setActive(s.id)}>
              <div className="scard-img-wrap">
                <img className="scard-img" src={s.img} alt={s.title} />
                <div className="scard-img-overlay" />
                <span className="scard-cat-pill">{s.category}</span>
                <div className="scard-title-bar"><h2>{s.title}</h2></div>
              </div>
              <div className="scard-body">
                <p className="scard-desc">{s.desc}</p>
                <div className="scard-items">
                  {s.items.map((item) => (
                    <div className="scard-item" key={item}>
                      <span>{item}</span>
                      <span className="scard-item-dot" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="scard-footer">
                <a href="#randevu" className="btn-reserve">Rezervasyon Yap</a>
              </div>
            </div>
          ))}
        </section>

        <div className="divider">
          <div className="divider-line" />
          <div className="divider-diamond" />
          <div className="divider-line" />
        </div>

     </div> 
    </>
  );
}