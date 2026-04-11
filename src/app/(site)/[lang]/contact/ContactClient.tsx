//ContactClient.tsx sayfası
"use client";
// src/app/(site)/[lang]/contact/ContactClient.tsx
// Bağımlılık yok — yalnızca React useState kullanır.
// CSS: ./contact.css dosyasından import edilir.

import { useState } from "react";
import "./contact.css";
import type { Locale } from "@/i18n/config";

// ─── SABİTLER ────────────────────────────────────────────────────────────────
// Hizmet listesini buradan yönet — select kutusunu bu array besler.
const SERVICES = [
  "Kafa Masajı",
  "Tırnak Sanatı",
  "Vuket Seçenekleri",
  "Yüz Bakımı",
  "Aromaterapi",
  "Saç Bakımı",
];

// ─── İLETİŞİM BİLGİLERİ ──────────────────────────────────────────────────────
// Gerçek adres/telefon/mail bilgilerini buradan değiştir.
const CONTACT_INFO = {
  address: ["Aliben Mah. Güzellik Cad. No:12", "Beşiktaş / İstanbul", "Türkiye"],
  phone: "+90 555 123 45 67",
  email: "iletisim@emselbeauty.com",
  // Google Maps embed URL'ini kendi konumunla değiştir.
  mapSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010!2d28.97!3d41.01!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzM2LjAiTiAyOMKwNTgnMTIuMCJF!5e0!3m2!1str!2str!4v1",
  whatsapp: "905551234567",
};

// ─── FORM STATE TİPİ ─────────────────────────────────────────────────────────
type FormState = {
  name: string;
  phone: string;
  service: string;
};

const EMPTY_FORM: FormState = {
  name: "", phone: "", service: ""
};

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function ContactClient({ locale }: { locale: Locale }) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  // Tüm input/select/textarea için tek handler
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // Form gönderimi — buraya EmailJS, fetch("/api/contact") vs. bağlanabilir
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Form verisi:", form); // → gerçek API çağrısıyla değiştir
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm(EMPTY_FORM);
    }, 4500);
  }

  return (
    <div className="cp-root">

      {/* ════════════════════════════════════════════════════
          SAYFA BAŞLIĞI
          .cp-header — arka plan mermer görseli üstünde
          krem overlay, Cinzel serif başlık, altın divider
      ════════════════════════════════════════════════════ */}
      <div className="cp-header">
        <div className="cp-divider" />
        <h1 className="cp-title">İletişim &mdash; Bize Ulaşın</h1>
        <p className="cp-subtitle">
          Randevu almak veya bilgi edinmek için
        </p>
        <div className="cp-divider" />
      </div>

      {/* ════════════════════════════════════════════════════
          İÇERİK ALANI — max-width + yatay padding
      ════════════════════════════════════════════════════ */}
      <div className="cp-content">

        {/* ────────────────────────────────────────────────
            ÜST SATIR: Harita (sol) + İletişim Bilgileri (sağ)
            .cp-top — 2 sütunlu CSS grid
            Mobilde tek sütuna döner (media query contact.css)
        ──────────────────────────────────────────────── */}
        <div className="cp-top">

          {/* HARİTA
              iframe üzerinde CSS filter: sepia(20%) uygulandı
              → mermer tonu ile uyumlu görünür.
              4 köşede altın L-şekli dekoratif çerçeve elemanları (.cp-corner) var.
              Google Maps embed src'ini CONTACT_INFO.mapSrc'ten alır. */}
          <div className="cp-map-wrap">
            <span className="cp-corner tl" />
            <span className="cp-corner tr" />
            <span className="cp-corner bl" />
            <span className="cp-corner br" />
            <iframe
              src={CONTACT_INFO.mapSrc}
              title="Emsel Beauty Konum"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="cp-map-iframe"
            />
          </div>

          {/* İLETİŞİM BİLGİLERİ KARTI
              backdrop-filter: blur(12px) → frosted-glass efekti
              Her bilgi grubu: küçük uppercase LABEL + Cinzel serif VALUE
              Label'ın sağında uzayan altın gradient çizgi (::after) var. */}
          <div className="cp-info-card">

            {/* ADRES */}
            <div className="cp-info-item">
              <span className="cp-info-label">Adres</span>
              <p className="cp-info-value">
                {CONTACT_INFO.address.map((line, i) => (
                  <span key={i}>{line}<br /></span>
                ))}
              </p>
            </div>

            {/* TELEFON */}
            <div className="cp-info-item">
              <span className="cp-info-label">Telefon</span>
              <p className="cp-info-value">
                <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}>
                  {CONTACT_INFO.phone}
                </a>
              </p>
            </div>

            {/* E-POSTA */}
            <div className="cp-info-item">
              <span className="cp-info-label">E-Posta</span>
              <p className="cp-info-value">
                <a href={`mailto:${CONTACT_INFO.email}`}>
                  {CONTACT_INFO.email}
                </a>
              </p>
            </div>

            {/* ÇALIŞMA SAATLERİ */}
            <div className="cp-info-item">
              <span className="cp-info-label">Çalışma Saatleri</span>
              <p className="cp-info-value">
                Pzt–Cmt: 09:00 – 20:00<br />
                Pazar: 10:00 – 18:00
              </p>
            </div>

          </div>
        </div>
        {/* ── ÜST SATIR SONU ── */}

        {/* ────────────────────────────────────────────────
            ONLINE RANDEVU FORMU
            .cp-appointment — frosted-glass kart
            İçinde iki sütunlu form grid:
              Sol sütun (.cp-form-col-left): Ad, E-posta, Telefon
              Sağ sütun (.cp-form-col-right): Hizmet+Tarih+Saat + Mesaj
        ──────────────────────────────────────────────── */}
        <div className="cp-appointment">

          {/* Bölüm başlığı + dekoratif ornament */}
          <h2 className="cp-section-title">Online Randevu</h2>
          <div className="cp-ornament">✦ &nbsp;·&nbsp; ✦</div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="cp-form-grid">

              {/* ── SOL SÜTUN: Kişisel Bilgiler ──
                  3 adet .cp-field dikey sıralı
                  Her field: label (.cp-label) + input (.cp-input) */}
              <div className="cp-form-col-left">

                <div className="cp-field">
                  <label className="cp-label" htmlFor="cp-name">
                    Adınız Soyadınız
                  </label>
                  <input
                    id="cp-name"
                    name="name"
                    type="text"
                    className="cp-input"
                    placeholder="Adınız ve soyadınız"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="cp-field">
                  <label className="cp-label" htmlFor="cp-phone">
                    Telefon Numaranız
                  </label>
                  <input
                    id="cp-phone"
                    name="phone"
                    type="tel"
                    className="cp-input"
                    placeholder="+90 5xx xxx xx xx"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                    <div className="cp-select-wrap">
                      <select
                        id="cp-service"
                        name="service"
                        className="cp-select"
                        value={form.service}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>Seçiniz</option>
                        {SERVICES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
              </div>
              {/* ── SOL SÜTUN SONU ── */}
            </div>
            {/* ── Form grid sonu ── */}

            {/* GÖNDER BUTONU
                Köşesiz, border-only başlangıç stili.
                Hover'da ::before pseudo-element ile soldan sağa altın dolum animasyonu.
                max-width: 300px, margin: 0 auto → ortalanmış. */}
            <button type="submit" className="cp-submit-btn">
              <span>Randevu Talebini Gönder</span>
            </button>

            {/* Başarılı gönderim mesajı — fadeIn animasyonuyla görünür */}
            {submitted && (
              <div className="cp-success">
                ✦ &nbsp; Randevu talebiniz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.
              </div>
            )}

          </form>
        </div>
        {/* ── ALT BÖLÜM SONU ── */}

      </div>
      {/* ── cp-content sonu ── */}

      {/* ════════════════════════════════════════════════════
          SABİT WHATSAPP BUTONU
          position: fixed; bottom/right: 28px; z-index: 999
          Tasarımdaki sağ alt köşedeki yeşil daireye karşılık gelir.
          href'te CONTACT_INFO.whatsapp kullanılır.
      ════════════════════════════════════════════════════ */}
      <a
        href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="cp-whatsapp"
        aria-label="WhatsApp ile iletişim"
      >
        {/* WhatsApp SVG — harici kütüphane gerekmez */}
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

    </div>
  );
}
