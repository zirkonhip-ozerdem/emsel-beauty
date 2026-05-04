"use client";
import Image from "next/image";
import Link from "next/link";

import "./global.css";
import { getLocalizedPath, type Locale } from "@/i18n/config";
import type { SiteDictionary } from "@/i18n/dictionaries";
import type { SiteShellData } from "@/lib/site/site-shell";
import { footerRouteKeys } from "@/components/site/navigation";

type FooterProps = {
  locale: Locale;
  dictionary: SiteDictionary;
  siteShell?: SiteShellData;
};

const footerCopy = {
  tr: {
    brandText:
      "Uzun yillardir guzellik sektorunde arkamizda binlerce memnun musteri birakarak hizmetlerimize hiz kesmeden devam ediyoruz.",
    servicesTitle: "Hizmetlerimiz",
    agreementsTitle: "Sozlesmeler",
    agreements: [
      "Hizmet Sozlesmesi",
      "Gizlilik Sozlesmesi",
      "KVKK Metinleri",
      "Sartlar",
    ],
    mapTitle: "Bizi Bulun",
    mapLink: "Yol Tarifi Al",
    addressTitle: "Adres",
    phoneTitle: "Telefon",
    workingHoursTitle: "Calisma Saatleri",
    workingHours: ["Pzt-Cmt: 09:00 - 20:00", "Pazar: 10:00 - 18:00"],
    socialTitle: "Sosyal Medya",
  },
  en: {
    brandText:
      "For many years, we have continued our beauty services with the trust of thousands of satisfied guests behind us.",
    servicesTitle: "Our Services",
    agreementsTitle: "Policies",
    agreements: [
      "Service Agreement",
      "Privacy Policy",
      "Data Protection Texts",
      "Terms",
    ],
    mapTitle: "Find Us",
    mapLink: "Get Directions",
    addressTitle: "Address",
    phoneTitle: "Phone",
    workingHoursTitle: "Working Hours",
    workingHours: ["Mon-Sat: 09:00 - 20:00", "Sunday: 10:00 - 18:00"],
    socialTitle: "Social Media",
  },
  de: {
    brandText:
      "Seit vielen Jahren setzen wir unsere Beauty-Services mit dem Vertrauen tausender zufriedener Kundinnen und Kunden fort.",
    servicesTitle: "Unsere Services",
    agreementsTitle: "Richtlinien",
    agreements: [
      "Servicevereinbarung",
      "Datenschutzrichtlinie",
      "Datenschutzhinweise",
      "Bedingungen",
    ],
    mapTitle: "Hier finden Sie uns",
    mapLink: "Route anzeigen",
    addressTitle: "Adresse",
    phoneTitle: "Telefon",
    workingHoursTitle: "Offnungszeiten",
    workingHours: ["Mo-Sa: 09:00 - 20:00", "Sonntag: 10:00 - 18:00"],
    socialTitle: "Soziale Medien",
  },
} as const;

export default function SiteFooter({
  locale,
  dictionary,
  siteShell,
}: FooterProps) {
  const currentYear = new Date().getFullYear();
  const ui = footerCopy[locale];
  const logoSrc = siteShell?.logoUrl || "/logo/emsel-logo.png";
  const brandName = siteShell?.siteName || dictionary.brand.name;
  const addressLines = siteShell?.addressLines?.length
    ? siteShell.addressLines
    : [dictionary.footer.address];
  const workingHoursLines = siteShell?.workingHoursLines?.length
    ? siteShell.workingHoursLines
    : ui.workingHours;
  const mapSrc =
    siteShell?.mapEmbedUrl ||
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.!2d28.97!3d41.01!2m3!1f0!2f0!3f0!2m3!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzM2LjAiTiAyOMKwNTgnMTIuMCJF!5e0!3m2!1str!2str!4v1";
  const mapHref = siteShell?.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteShell.address.replace(/\r?\n/g, " "))}`
    : "https://www.google.com/maps";
  const serviceLinks = siteShell?.serviceLinks?.length
    ? siteShell.serviceLinks.map((item) => ({
        href: `${getLocalizedPath(locale, "services")}/${item.id}`,
        label: item.label,
      }))
    : Array.from({ length: 5 }, (_, index) => ({
        href: getLocalizedPath(locale, "services"),
        label: `${ui.servicesTitle} ${index + 1}`,
      }));
  const socialLinks = [
    { href: siteShell?.instagramUrl, label: "Instagram" },
    { href: siteShell?.facebookUrl, label: "Facebook" },
    { href: siteShell?.xUrl, label: "X" },
  ].filter((item): item is { href: string; label: string } => Boolean(item.href));
  const footerLinks = footerRouteKeys.map((routeKey) => ({
    href: getLocalizedPath(locale, routeKey),
    label:
      routeKey === "contact"
        ? dictionary.header.consultation
        : dictionary.navigation[routeKey],
  }));

  return (
    <>
      <section className="cta">
        <div className="cta-logo">
          <Image
            src={logoSrc}
            alt={brandName}
            width={248}
            height={303}
            className="cta-logo-img"
          />
          <p className="cta-brand-text">{ui.brandText}</p>
        </div>
        <nav className="cta-links">
          <div className="cta-links-col">
            <span className="cta-links-title">{dictionary.footer.linksTitle}</span>
            {footerLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="cta-links-col">
            <span className="cta-links-title">{ui.servicesTitle}</span>
            {serviceLinks.map((item) => (
              <Link key={item.href + item.label} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="cta-links-col">
            <span className="cta-links-title">{ui.agreementsTitle}</span>
            {ui.agreements.map((item) => (
              <Link key={item} href={getLocalizedPath(locale, "contact")}>
                {item}
              </Link>
            ))}
          </div>
        </nav>

        <div className="cta-map-col">
          <span className="cta-col-title">{ui.mapTitle}</span>
          <div className="cta-map">
            <iframe
              src={mapSrc}
              width="100%"
              height="160"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a href={mapHref} target="_blank" rel="noreferrer" className="cta-map-link">
            → {ui.mapLink}
          </a>
        </div>
      </section>

      <div className="kp-info">
        <div className="kp-info-row">
          <div className="kp-info-item">
            <svg className="kp-info-icon" viewBox="0 0 24 24" fill="none" stroke="#e2c47a" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <div>
              <span className="kp-info-lbl">{ui.addressTitle}</span>
              <p className="kp-info-txt">
                {addressLines.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          </div>
          <div className="kp-info-item">
            <svg className="kp-info-icon" viewBox="0 0 24 24" fill="none" stroke="#e2c47a" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            <div>
              <span className="kp-info-lbl">{ui.phoneTitle}</span>
              <p className="kp-info-txt">
                {siteShell?.phone || dictionary.footer.phone}
                <br />
                {siteShell?.email || dictionary.footer.mail}
              </p>
            </div>
          </div>
          <div className="kp-info-item">
            <svg className="kp-info-icon" viewBox="0 0 24 24" fill="none" stroke="#e2c47a" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <span className="kp-info-lbl">{ui.workingHoursTitle}</span>
              <p className="kp-info-txt">
                {workingHoursLines.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          </div>
          <div className="kp-info-item">
            <svg className="kp-info-icon" viewBox="0 0 24 24" fill="none" stroke="#e2c47a" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 2.25h3.75v3.75M21.75 2.25l-7.5 7.5" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 14.25v4.5a2.25 2.25 0 01-2.25 2.25h-13.5A2.25 2.25 0 013 18.75v-13.5A2.25 2.25 0 015.25 3h4.5" />
            </svg>

            <div>
              <span className="kp-info-lbl">{ui.socialTitle}</span>

              <div className="kp-social-links">
                {socialLinks.length > 0 ? (
                  socialLinks.map((item) => (
                    <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                      {item.label}
                    </a>
                  ))
                ) : (
                  <a href={getLocalizedPath(locale, "contact")}>
                    {dictionary.header.consultation}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="kp-info-social">
          <p>
            © {currentYear} {dictionary.brand.name} - {dictionary.footer.rights}
          </p>
        </div>
      </div>
    </>
  );
}
