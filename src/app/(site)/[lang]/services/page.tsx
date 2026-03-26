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

        /* CTA + INFO BAND — ikisi aynı koyu yeşil blok */
        .cta {
          background: var(--green-mid);
          padding: 56px 80px;
          display: flex; justify-content: space-between; align-items: center; gap: 32px;
          width: 100%;
        }
        .cta-text h2 {
          font-family: 'Cinzel', serif; font-size: 20px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase; color: #f0e8d0;
          margin-bottom: 10px; line-height: 1.4;
        }
        .cta-text p {
          font-family: 'EB Garamond', serif; font-size: 15px; font-style: italic;
          color: rgba(220,200,160,0.85); max-width: 380px; line-height: 1.8;
        }
        .cta-actions { display: flex; gap: 12px; flex-shrink: 0; }
        .btn-wp {
          display: inline-flex; align-items: center; gap: 9px; background: #25d366; color: #fff;
          font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: 0.16em;
          text-transform: uppercase; padding: 14px 24px; text-decoration: none; transition: background 0.2s;
        }
        .btn-wp:hover { background: #1ebe5d; }
        .btn-call {
          display: inline-flex; align-items: center;
          font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: 0.16em;
          text-transform: uppercase; color: #f0e8d0; padding: 14px 24px;
          border: 1px solid rgba(209,195,158,0.4); text-decoration: none; transition: all 0.2s;
        }
        .btn-call:hover { border-color: #f0e8d0; }

        .info-band {
          background: var(--green-dark);
          padding: 40px 80px 28px;
          border-top: 1px solid rgba(90,107,63,0.25);
          width: 100%;
        }
        .info-band-row {
          display: flex; justify-content: center; align-items: flex-start;
          gap: 64px; flex-wrap: wrap; padding-bottom: 28px;
        }
        .info-item { display: flex; align-items: flex-start; gap: 12px; }
        .info-icon { width: 18px; height: 18px; flex-shrink: 0; margin-top: 3px; }
        .info-label {
          font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--gold-light); margin-bottom: 6px; display: block;
        }
        .info-text { font-family: 'EB Garamond', serif; font-size: 13.5px; color: rgba(220,200,160,0.8); line-height: 1.7; }
        .info-social {
          border-top: 0.5px solid rgba(90,107,63,0.3); padding-top: 18px;
          display: flex; justify-content: center; gap: 32px;
        }
        .info-social a {
          font-family: 'EB Garamond', serif; font-size: 13px;
          color: rgba(180,160,110,0.7); text-decoration: none; transition: color 0.2s;
        }
        .info-social a:hover { color: var(--gold-light); }

        @media (max-width: 860px) {
          .services-grid { grid-template-columns: 1fr; padding: 40px 20px 60px; }
          .cta { flex-direction: column; padding: 40px 24px; text-align: center; }
          .info-band { padding: 32px 24px 24px; }
          .info-band-row { gap: 32px; }
          .page-title { font-size: 26px; }
        }
        @media (max-width: 540px) { .page-title { font-size: 22px; } }
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

        <section className="cta" id="randevu">
          <div className="cta-text">
            <h2>Hemen Randevu Alın</h2>
            <p>Uzman ekibimiz sizi bekliyor. WhatsApp üzerinden kolayca randevu oluşturun, size en uygun saati birlikte belirleyelim.</p>
          </div>
          <div className="cta-actions">
            <a href="https://wa.me/905551234567" className="btn-wp" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" style={{ width: 15, height: 15, fill: "#fff" }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp ile Randevu
            </a>
            <a href="tel:+905551234567" className="btn-call">Bizi Arayın</a>
          </div>
        </section>

        <div className="info-band">
          <div className="info-band-row">
            <div className="info-item">
              <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="#e2c47a" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
              </svg>
              <div>
                <span className="info-label">Adres</span>
                <p className="info-text">Örnek Mahallesi, Güzellik Cad. No:12<br/>İstanbul</p>
              </div>
            </div>
            <div className="info-item">
              <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="#e2c47a" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
              </svg>
              <div>
                <span className="info-label">Telefon</span>
                <p className="info-text">+90 555 123 45 67<br/>info@emselbeauty.com</p>
              </div>
            </div>
            <div className="info-item">
              <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="#e2c47a" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div>
                <span className="info-label">Çalışma Saatleri</span>
                <p className="info-text">Pzt–Cmt: 09:00 – 20:00<br/>Pazar: 10:00 – 18:00</p>
              </div>
            </div>
          </div>
          <div className="info-social">
            <a href="#">📷 Instagram: @emsel_beauty</a>
            <a href="#">Facebook: @emselbeauty</a>
          </div>
        </div>

      </div>
    </>
  );
}