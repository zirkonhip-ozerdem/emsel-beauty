"use client";
// src/app/(site)/[lang]/contact/ContactClient.tsx
import { useState } from "react";
import "./contact.css";
import type { ContactPageContent } from "@/lib/site/contact-page";
import type { Locale } from "@/i18n/config";

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
export default function ContactClient({
  content,
  locale,
}: {
  content: ContactPageContent;
  locale: Locale;
}) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Tüm input/select/textarea için tek handler
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/site/reservations", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          locale,
        }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string }
        | null;

      if (!response.ok || payload?.ok === false) {
        throw new Error(payload?.message ?? content.labels.error);
      }

      setSubmitted(true);
      setForm(EMPTY_FORM);
      setTimeout(() => setSubmitted(false), 4500);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : content.labels.error;
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
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
        <h1 className="cp-title">{content.headerTitle}</h1>
        <p className="cp-subtitle">
          {content.headerSubtitle}
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
              Google Maps embed src'ini server helper'dan alir. */}
          <div className="cp-map-wrap">
            <span className="cp-corner tl" />
            <span className="cp-corner tr" />
            <span className="cp-corner bl" />
            <span className="cp-corner br" />
            <iframe
              src={content.contactInfo.mapSrc}
              title={content.labels.mapTitle}
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
              <span className="cp-info-label">{content.labels.address}</span>
              <p className="cp-info-value">
                {content.contactInfo.address.map((line, i) => (
                  <span key={i}>{line}<br /></span>
                ))}
              </p>
            </div>

            {/* TELEFON */}
            <div className="cp-info-item">
              <span className="cp-info-label">{content.labels.phone}</span>
              <p className="cp-info-value">
                <a href={`tel:${content.contactInfo.phone.replace(/\s/g, "")}`}>
                  {content.contactInfo.phone}
                </a>
              </p>
            </div>

            {/* E-POSTA */}
            <div className="cp-info-item">
              <span className="cp-info-label">{content.labels.email}</span>
              <p className="cp-info-value">
                <a href={`mailto:${content.contactInfo.email}`}>
                  {content.contactInfo.email}
                </a>
              </p>
            </div>

            {/* ÇALIŞMA SAATLERİ */}
            <div className="cp-info-item">
              <span className="cp-info-label">{content.labels.workingHours}</span>
              <p className="cp-info-value">
                {content.contactInfo.workingHours.map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
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
          <h2 className="cp-section-title">{content.labels.appointmentTitle}</h2>
          <div className="cp-ornament">✦ &nbsp;·&nbsp; ✦</div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="cp-form-grid">

              {/* ── SOL SÜTUN: Kişisel Bilgiler ──
                  3 adet .cp-field dikey sıralı
                  Her field: label (.cp-label) + input (.cp-input) */}
              <div className="cp-form-col-left">

                <div className="cp-field">
                  <label className="cp-label" htmlFor="cp-name">
                    {content.labels.fullName}
                  </label>
                  <input
                    id="cp-name"
                    name="name"
                    type="text"
                    className="cp-input"
                    placeholder={content.labels.fullNamePlaceholder}
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="cp-field">
                  <label className="cp-label" htmlFor="cp-phone">
                    {content.labels.phoneField}
                  </label>
                  <input
                    id="cp-phone"
                    name="phone"
                    type="tel"
                    className="cp-input"
                    placeholder={content.labels.phonePlaceholder}
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
                        <option value="" disabled>{content.labels.servicePlaceholder}</option>
                        {content.services.map((s) => (
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
            <button type="submit" className="cp-submit-btn" disabled={submitting}>
              <span>{submitting ? content.labels.submitting : content.labels.submit}</span>
            </button>

            {/* Başarılı gönderim mesajı — fadeIn animasyonuyla görünür */}
            {submitted && (
              <div className="cp-success">
                ✦ &nbsp; {content.labels.success}
              </div>
            )}
            {submitError ? <div className="cp-success">{submitError}</div> : null}

          </form>
        </div>
        {/* ── ALT BÖLÜM SONU ── */}

      </div>
      {/* ── cp-content sonu ── */}

      {/* ════════════════════════════════════════════════════
          SABİT WHATSAPP BUTONU
          position: fixed; bottom/right: 28px; z-index: 999
          Tasarımdaki sağ alt köşedeki yeşil daireye karşılık gelir.
          href'te helper'dan gelen WhatsApp numarasi kullanilir.
      ════════════════════════════════════════════════════ */}
      <a
        href={`https://wa.me/${content.contactInfo.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="cp-whatsapp"
        aria-label={content.labels.whatsappAriaLabel}
      >
        {/* WhatsApp SVG — harici kütüphane gerekmez */}
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

    </div>
  );
}
