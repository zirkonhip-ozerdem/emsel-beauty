"use client";
import "./global.css";

type FooterProps = {
  locale: "tr" | "en" | "ar";
  dictionary: any;
};

export default function SiteFooter({ locale, dictionary }: FooterProps) {
  return (
    <>
      {/* CTA */}
      <section className="cta">
        <div className="cta-logo">
         <img src="/logo/emsel-logo.png" alt="Emsel Beauty" className="cta-logo-img" />
         <p className="cta-brand-text">
    Uzun yıllardır güzellik sektöründe arkamızda binlerce memnun müşteri bırakarak hizmetlerimize hız kesmeden devam ediyoruz.
  </p>
        </div>
     <nav className="cta-links">
  <div className="cta-links-col">
    <span className="cta-links-title">Hızlı Linkler</span>
    <a href="/tr">Anasayfa</a>
    <a href="/tr/services">Hizmetlerimiz</a>
    <a href="/tr/blog">Blog</a>
    <a href="/tr/corporate">Kurumsal</a>
    <a href="/tr/products">Ürünlerimiz</a>
    <a href="/tr/reservation">Online Rezervasyon</a>
  </div>

  <div className="cta-links-col">
    <span className="cta-links-title">Hizmetlerimiz</span>
    <a href="#">Hizmet 1</a>
    <a href="#">Hizmet 2</a>
    <a href="#">Hizmet 3</a>
    <a href="#">Hizmet 4</a>
    <a href="#">Hizmet 5</a>
  </div>

  <div className="cta-links-col">
    <span className="cta-links-title">Sözleşmeler</span>
    <a href="/tr/hizmet-sozlesmesi">Hizmet Sözleşmesi</a>
    <a href="/tr/gizlilik">Gizlilik Sözleşmesi</a>
    <a href="/tr/kvkk">KVKK Metinleri</a>
    <a href="/tr/sartlar">Şartlar</a>
  </div>
</nav>
       {/* SAĞ — Harita */}
  <div className="cta-map-col">
    <span className="cta-col-title">Bizi Bulun</span>
    <div className="cta-map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.!2d28.97!3d41.01!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzM2LjAiTiAyOMKwNTgnMTIuMCJF!5e0!3m2!1str!2str!4v1"
        width="100%"
        height="160"
        style={{ border: 0, display: "block" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
    <a href="..." target="_blank" rel="noreferrer" className="cta-map-link">
  → Yol Tarifi Al
</a>
  </div>
      </section>

      {/* INFO BAND */}
      <div className="kp-info">
        <div className="kp-info-row">
          <div className="kp-info-item">
            <svg className="kp-info-icon" viewBox="0 0 24 24" fill="none" stroke="#e2c47a" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
            </svg>
            <div>
              <span className="kp-info-lbl">Adres</span>
              <p className="kp-info-txt">Örnek Mahallesi, Güzellik Cad. No:12<br/>İstanbul</p>
            </div>
          </div>
          <div className="kp-info-item">
            <svg className="kp-info-icon" viewBox="0 0 24 24" fill="none" stroke="#e2c47a" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
            </svg>
            <div>
              <span className="kp-info-lbl">Telefon</span>
              <p className="kp-info-txt">+90 555 123 45 67<br/>info@emselbeauty.com</p>
            </div>
          </div>
          <div className="kp-info-item">
            <svg className="kp-info-icon" viewBox="0 0 24 24" fill="none" stroke="#e2c47a" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <div>
              <span className="kp-info-lbl">Çalışma Saatleri</span>
              <p className="kp-info-txt">Pzt–Cmt: 09:00 – 20:00<br/>Pazar: 10:00 – 18:00</p>
            </div>
          </div>
          <div className="kp-info-item">
  <svg className="kp-info-icon" viewBox="0 0 24 24" fill="none" stroke="#e2c47a" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 2.25h3.75v3.75M21.75 2.25l-7.5 7.5"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 14.25v4.5a2.25 2.25 0 01-2.25 2.25h-13.5A2.25 2.25 0 013 18.75v-13.5A2.25 2.25 0 015.25 3h4.5"/>
  </svg>

  <div>
    <span className="kp-info-lbl">Sosyal Medya</span>

    <div className="kp-social-links">
      <a href="#">Instagram</a>
      <a href="#">TikTok</a>
      
    </div>
  </div>
</div>
        </div>
        <div className="kp-info-social">
          <p>© 2025 Emsel Beauty - Tüm Hakları Saklıdır.</p>
        </div>
      </div>
    </>
  );
}