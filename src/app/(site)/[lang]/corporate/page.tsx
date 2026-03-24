"use client";

export default function KurumsalPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --brown-dark: #3b2a1a;
          --brown-mid:  #6b4c32;
          --gold:       #c9a84c;
          --gold-light: #e2c47a;
          --cream:      #faf6f0;
          --text-mid:   #6b4c32;
          --border:     rgba(180,140,90,0.25);
          --green-dark: #2a3320;
          --green-mid:  #3d4a2e;
        }

        .kp {
          background-image: url('/background/back-1.jpeg');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          font-family: 'EB Garamond', Georgia, serif;
          color: var(--brown-dark);
          width: 100%;
        }

        /* BAŞLIK */
        .kp-header {
          background: rgba(250,246,240,0.82);
          backdrop-filter: blur(8px);
          text-align: center;
          padding: 56px 32px 48px;
          border-bottom: 1px solid var(--border);
        }
        .kp-header h1 {
          font-family: 'Cinzel', serif;
          font-size: 24px; font-weight: 600;
          letter-spacing: 0.24em; text-transform: uppercase;
          color: var(--brown-dark);
        }
        .kp-rule {
          display: flex; align-items: center; justify-content: center;
          gap: 14px; margin-top: 18px;
        }
        .kp-rule span { width: 72px; height: 0.5px; background: var(--gold); display: block; }
        .kp-rule i { width: 6px; height: 6px; background: var(--gold); transform: rotate(45deg); display: block; flex-shrink: 0; }

        /* HAKKIMIZDA — krem */
        .kp-about {
          background: rgba(250,246,240,0.82);
          backdrop-filter: blur(6px);
          padding: 64px 72px;
          border-bottom: 1px solid var(--border);
        }
        .kp-about-grid {
          display: grid; grid-template-columns: 1.1fr 0.9fr;
          gap: 56px; align-items: start;
          max-width: 1080px; margin: 0 auto;
        }

        /* MİSYON — koyu yeşil */
        .kp-misyon {
          background: var(--green-mid);
          padding: 64px 72px;
          border-bottom: 1px solid rgba(226,196,122,0.1);
        }
        .kp-misyon-grid {
          display: grid; grid-template-columns: 0.9fr 1.1fr;
          gap: 56px; align-items: center;
          max-width: 1080px; margin: 0 auto;
        }
        .kp-misyon-img {
          width: 100%; height: 420px; object-fit: cover; display: block;
        }

        /* VİZYON — krem */
        .kp-vizyon {
          background: rgba(250,246,240,0.82);
          backdrop-filter: blur(6px);
          padding: 64px 72px;
          border-bottom: 1px solid var(--border);
        }
        .kp-vizyon-grid {
          display: grid; grid-template-columns: 1.1fr 0.9fr;
          gap: 56px; align-items: center;
          max-width: 1080px; margin: 0 auto;
        }
        .kp-vizyon-img {
          width: 100%; height: 380px; object-fit: cover; display: block;
        }

        /* SAYILAR — krem, kutular */
        .kp-stats {
          background: rgba(250,246,240,0.82);
          backdrop-filter: blur(6px);
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          padding: 56px 72px;
          border-bottom: 1px solid var(--border);
        }
        .kp-stat {
          padding: 36px 24px; text-align: center;
          background: rgba(255,255,255,0.65);
          border: 1px solid var(--border);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .kp-stat:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(59,42,26,0.1); }
        .kp-stat-n {
          font-family: 'Cinzel', serif; font-size: 36px; font-weight: 700;
          color: var(--gold); display: block; margin-bottom: 8px;
        }
        .kp-stat-l {
          font-family: 'EB Garamond', serif; font-size: 13px;
          font-style: italic; color: var(--text-mid);
        }

        /* PAYLAŞILAN STİLLER */
        .kp-section-title {
          font-family: 'Cinzel', serif; font-size: 17px; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--brown-dark);
          margin-bottom: 24px; padding-bottom: 14px;
          border-bottom: 1px solid var(--border);
          display: inline-block;
        }
        .kp-section-title-light {
          font-family: 'Cinzel', serif; font-size: 17px; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #f0e8d0;
          margin-bottom: 24px; padding-bottom: 14px;
          border-bottom: 1px solid rgba(226,196,122,0.25);
          display: inline-block;
        }
        .kp-text p {
          font-family: 'EB Garamond', serif; font-size: 16px;
          color: var(--text-mid); line-height: 1.95; margin-bottom: 14px;
        }
        .kp-text p:last-child { margin-bottom: 0; }
        .kp-text-light p {
          font-family: 'EB Garamond', serif; font-size: 16px; font-style: italic;
          color: rgba(220,200,160,0.82); line-height: 1.95; margin-bottom: 14px;
        }
        .kp-text-light p:last-child { margin-bottom: 0; }

        /* GÖRSELLER */
        .kp-imgs {
          display: flex; flex-direction: column; gap: 10px;
        }
        .kp-imgs img:first-child {
          width: 100%; height: 200px; object-fit: cover; display: block;
        }
        .kp-imgs-row {
          display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
        }
        .kp-imgs-row img {
          width: 100%; height: 150px; object-fit: cover; display: block;
        }

        /* CTA */
        .kp-cta {
          background: var(--green-mid); padding: 56px 72px;
          display: flex; justify-content: space-between; align-items: center; gap: 32px;
        }
        .kp-cta h2 {
          font-family: 'Cinzel', serif; font-size: 18px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase; color: #f0e8d0; margin-bottom: 10px;
        }
        .kp-cta p {
          font-family: 'EB Garamond', serif; font-size: 15px; font-style: italic;
          color: rgba(220,200,160,0.8); max-width: 380px; line-height: 1.8;
        }
        .kp-cta-btns { display: flex; gap: 12px; flex-shrink: 0; }
        .btn-gold {
          font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--brown-dark); background: var(--gold-light);
          padding: 13px 28px; text-decoration: none; transition: background 0.2s;
        }
        .btn-gold:hover { background: var(--gold); }
        .btn-outline {
          font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: 0.2em;
          text-transform: uppercase; color: #f0e8d0; padding: 13px 28px;
          border: 1px solid rgba(226,196,122,0.35); text-decoration: none; transition: all 0.2s;
        }
        .btn-outline:hover { border-color: var(--gold-light); }

        /* INFO BAND */
        .kp-info {
          background: var(--green-dark); padding: 44px 72px 32px;
          border-top: 1px solid rgba(90,107,63,0.2);
        }
        .kp-info-row { display: flex; justify-content: center; gap: 72px; flex-wrap: wrap; padding-bottom: 28px; }
        .kp-info-item { display: flex; align-items: flex-start; gap: 14px; }
        .kp-info-icon { width: 18px; height: 18px; flex-shrink: 0; margin-top: 3px; }
        .kp-info-lbl { font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold-light); margin-bottom: 7px; display: block; }
        .kp-info-txt { font-family: 'EB Garamond', serif; font-size: 13.5px; color: rgba(220,200,160,0.75); line-height: 1.75; }
        .kp-info-social { border-top: 0.5px solid rgba(90,107,63,0.25); padding-top: 20px; display: flex; justify-content: center; gap: 36px; }
        .kp-info-social a { font-family: 'EB Garamond', serif; font-size: 13px; color: rgba(180,160,110,0.65); text-decoration: none; transition: color 0.2s; }
        .kp-info-social a:hover { color: var(--gold-light); }

        @media (max-width: 860px) {
          .kp-about, .kp-misyon, .kp-vizyon, .kp-cta { padding: 48px 24px; }
          .kp-about-grid, .kp-misyon-grid, .kp-vizyon-grid { grid-template-columns: 1fr; gap: 32px; }
          .kp-misyon-img, .kp-vizyon-img { height: 280px; }
          .kp-stats { grid-template-columns: 1fr 1fr; padding: 40px 24px; }
          .kp-cta { flex-direction: column; text-align: center; }
          .kp-info { padding: 36px 24px 24px; }
          .kp-info-row { gap: 32px; }
        }
      `}</style>

      <div className="kp">

        {/* BAŞLIK */}
        <div className="kp-header">
          <h1>Hakkımızda &amp; Misyonumuz</h1>
          <div className="kp-rule"><span/><i/><span/></div>
        </div>

        {/* HAKKIMIZDA — krem */}
        <section className="kp-about">
          <div className="kp-about-grid">
            <div className="kp-text">
              <div className="kp-section-title">Hakkımızda</div>
              <p>Emsel Beauty & Care Studio, 2018 yılından bu yana İstanbul'un kalbinde profesyonel güzellik hizmetleri sunmaktadır. Uzman ekibimiz ve en son teknolojik ekipmanlarımızla her müşterimize özel, kişiselleştirilmiş bir deneyim sunuyoruz.</p>
              <p>Güzelliğin sadece dışsal değil, içsel bir yolculuk olduğuna inanıyoruz. Her seansımızda müşterilerimizin kendilerini en iyi hissetmelerini sağlamayı amaçlıyoruz.</p>
              <p>Yüksek kalite standartları, güven ve şeffaflık ilkeleriyle hareket eden ekibimiz, sizin için en iyi deneyimi yaratmak adına sürekli kendini geliştirmektedir.</p>
            </div>
            <div className="kp-imgs">
              <img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80" alt="Cilt Bakımı"/>
              <div className="kp-imgs-row">
                <img src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=300&q=80" alt="Masaj"/>
                <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&q=80" alt="Makyaj"/>
              </div>
            </div>
          </div>
        </section>

        {/* MİSYON — koyu yeşil */}
        <section className="kp-misyon">
          <div className="kp-misyon-grid">
            <img className="kp-misyon-img" src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80" alt="Misyonumuz"/>
            <div className="kp-text-light">
              <div className="kp-section-title-light">Misyonumuz</div>
              <p>En yüksek kalite standartlarında, uzman ekibimizle her müşterimizin doğal güzelliğini ön plana çıkarmak; güven, şeffaflık ve mükemmellik ilkeleriyle hizmet vermek temel misyonumuzdur.</p>
              <p>Her müşterimizin benzersiz olduğuna inanıyor, kişiye özel çözümler sunuyoruz. Kullandığımız ürünler ve uygulanan teknikler, uluslararası standartlara uygun olarak özenle seçilmektedir.</p>
            </div>
          </div>
        </section>

        {/* VİZYON — krem */}
        <section className="kp-vizyon">
          <div className="kp-vizyon-grid">
            <div className="kp-text">
              <div className="kp-section-title">Vizyonumuz</div>
              <p>Türkiye'nin en güvenilir ve yenilikçi güzellik merkezi olmak; her kadının kendini en iyi hissedeceği, kişiselleştirilmiş deneyimler sunan bir marka haline gelmek vizyonumuzdur.</p>
              <p>Sektördeki gelişmeleri yakından takip ederek hizmetlerimizi sürekli yeniliyor, müşterilerimize her zaman en güncel ve etkili çözümleri sunuyoruz.</p>
            </div>
            <img className="kp-vizyon-img" src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=600&q=80" alt="Vizyonumuz"/>
          </div>
        </section>

        {/* SAYILAR — krem, kutular */}
        <section className="kp-stats">
          <div className="kp-stat">
            <span className="kp-stat-n">6+</span>
            <span className="kp-stat-l">Yıllık Deneyim</span>
          </div>
          <div className="kp-stat">
            <span className="kp-stat-n">2.500+</span>
            <span className="kp-stat-l">Mutlu Müşteri</span>
          </div>
          <div className="kp-stat">
            <span className="kp-stat-n">15+</span>
            <span className="kp-stat-l">Uzman Kadro</span>
          </div>
          <div className="kp-stat">
            <span className="kp-stat-n">20+</span>
            <span className="kp-stat-l">Hizmet Çeşidi</span>
          </div>
        </section>

        {/* CTA */}
        <section className="kp-cta">
          <div>
            <h2>Sizinle Tanışmak İsteriz</h2>
            <p>Profesyonel ekibimizle ilk görüşmenizi planlayın, size özel deneyimi keşfedin.</p>
          </div>
          <div className="kp-cta-btns">
            <a href="https://wa.me/905551234567" className="btn-gold">Randevu Al</a>
            <a href="tel:+905551234567" className="btn-outline">Bizi Arayın</a>
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
          </div>
          <div className="kp-info-social">
            <a href="#">📷 Instagram: @emsel_beauty</a>
            <a href="#">Facebook: @emselbeauty</a>
          </div>
        </div>

      </div>
    </>
  );
}