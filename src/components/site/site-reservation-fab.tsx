import Link from "next/link";

import { getLocalizedPath, type Locale } from "@/i18n/config";
import type { SiteDictionary } from "@/i18n/dictionaries";
import type { SiteShellData } from "@/lib/site/site-shell";

type SiteReservationFabProps = {
  locale: Locale;
  dictionary: SiteDictionary;
  siteShell?: SiteShellData;
};

const fallbackWhatsappNumber = "905551234567";

function ReservationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="site-reservation-fab-svg"
    >
      <path
        d="M7 3.75v2.5M17 3.75v2.5M4.75 8.25h14.5M6.25 5.75h11.5a1.5 1.5 0 0 1 1.5 1.5v10.5a2 2 0 0 1-2 2H6.75a2 2 0 0 1-2-2V7.25a1.5 1.5 0 0 1 1.5-1.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m12 10.7.48 1.05 1.14.1-.85.77.24 1.13-1.01-.58-1.01.58.24-1.13-.85-.77 1.14-.1Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="site-whatsapp-fab-svg"
    >
      <path
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SiteReservationFab({
  locale,
  dictionary,
  siteShell,
}: SiteReservationFabProps) {
  const whatsappNumber = (siteShell?.whatsapp || fallbackWhatsappNumber).replace(/\D/g, "");
  const ariaLabel =
    locale === "en"
      ? "Contact us on WhatsApp"
      : locale === "de"
        ? "Kontakt uber WhatsApp"
        : "WhatsApp ile iletişim";

  return (
    <>
      <Link
        href={getLocalizedPath(locale, "contact")}
        className="site-reservation-fab"
        aria-label={dictionary.header.consultation}
      >
        <span className="site-reservation-fab-icon" aria-hidden="true">
          <ReservationIcon />
        </span>
        <span className="site-reservation-fab-copy">
          <span className="site-reservation-fab-label">
            {dictionary.header.consultation}
          </span>
        </span>
      </Link>

      <a
        href={`https://wa.me/${whatsappNumber}`}
        className="site-whatsapp-fab"
        aria-label={`${ariaLabel} - ${dictionary.brand.name}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="site-whatsapp-fab-icon" aria-hidden="true">
          <WhatsAppIcon />
        </span>
      </a>
    </>
  );
}
