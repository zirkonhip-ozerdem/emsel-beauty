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
  campaign: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  phone: "",
  service: "",
  campaign: "",
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

                {content.campaigns.length > 0 ? (
                  <div className="cp-select-wrap">
                    <select
                      id="cp-campaign"
                      name="campaign"
                      className="cp-select"
                      value={form.campaign}
                      onChange={handleChange}
                    >
                      <option value="">{content.labels.campaignPlaceholder}</option>
                      {content.campaigns.map((campaign) => (
                        <option key={campaign} value={campaign}>{campaign}</option>
                      ))}
                    </select>
                  </div>
                ) : null}
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

    </div>
  );
}
