"use client";
import "./style.css";

export default function KurumsalPage() {
  return (
    <>
      <div className="kp">
        <div className="kp-header">
          <h1>Hakkımızda &amp; Misyonumuz</h1>
          <div className="kp-rule"><span /><i /><span /></div>
        </div>

        <section className="kp-about">
          <div className="kp-about-grid">
            <div className="kp-text">
              <div className="kp-section-title">Hakkımızda</div>
              <p>Emsel Beauty &amp; Care Studio, 2018 yılından bu yana İstanbul&apos;un kalbinde profesyonel güzellik hizmetleri sunmaktadır. Uzman ekibimiz ve en son teknolojik ekipmanlarımızla her müşterimize özel, kişiselleştirilmiş bir deneyim sunuyoruz.</p>
              <p>Güzelliğin sadece dışsal değil, içsel bir yolculuk olduğuna inanıyoruz. Her seansımızda müşterilerimizin kendilerini en iyi hissetmelerini sağlamayı amaçlıyoruz.</p>
              <p>Yüksek kalite standartları, güven ve şeffaflık ilkeleriyle hareket eden ekibimiz, sizin için en iyi deneyimi yaratmak adına sürekli kendini geliştirmektedir.</p>
            </div>
            <div className="kp-imgs">
              <img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80" alt="Cilt Bakımı" />
              <div className="kp-imgs-row">
                <img src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=300&q=80" alt="Masaj" />
                <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&q=80" alt="Makyaj" />
              </div>
            </div>
          </div>
        </section>

        <section className="kp-misyon">
          <div className="kp-misyon-grid">
            <img className="kp-misyon-img" src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80" alt="Misyonumuz" />
            <div className="kp-text-light">
              <div className="kp-section-title-light">Misyonumuz</div>
              <p>En yüksek kalite standartlarında, uzman ekibimizle her müşterimizin doğal güzelliğini ön plana çıkarmak; güven, şeffaflık ve mükemmellik ilkeleriyle hizmet vermek temel misyonumuzdur.</p>
              <p>Her müşterimizin benzersiz olduğuna inanıyor, kişiye özel çözümler sunuyoruz. Kullandığımız ürünler ve uygulanan teknikler, uluslararası standartlara uygun olarak özenle seçilmektedir.</p>
            </div>
          </div>
        </section>

        <section className="kp-vizyon">
          <div className="kp-vizyon-grid">
            <div className="kp-text">
              <div className="kp-section-title">Vizyonumuz</div>
              <p>Türkiye&apos;nin en güvenilir ve yenilikçi güzellik merkezi olmak; her kadının kendini en iyi hissedeceği, kişiselleştirilmiş deneyimler sunan bir marka haline gelmek vizyonumuzdur.</p>
              <p>Sektördeki gelişmeleri yakından takip ederek hizmetlerimizi sürekli yeniliyor, müşterilerimize her zaman en güncel ve etkili çözümleri sunuyoruz.</p>
            </div>
            <img className="kp-vizyon-img" src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=600&q=80" alt="Vizyonumuz" />
          </div>
        </section>

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
      </div>
    </>
  );
}
