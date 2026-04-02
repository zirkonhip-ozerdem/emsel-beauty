"use client";

import { useState } from "react";
import "./style.css";
 
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
  const [, setActive] = useState<number | null>(null);

  return (
    <>
      <div className="services-page">
        <header className="page-header">
          <p className="page-eyebrow">Emsel Beauty &amp; Care Studio</p>
          <h1 className="page-title">Profesyonel Güzellik<br />Hizmetleri</h1>
          <p className="page-sub">
            Uzman ekibimiz ile cildinizin ve güzelliğinizin en iyi halini keşfedin. Her hizmet,
            sizin için özel olarak tasarlandı.
          </p>
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

        
      </div>
    </>
  );
}
