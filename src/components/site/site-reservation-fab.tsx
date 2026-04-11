import Link from "next/link";

import { getLocalizedPath, type Locale } from "@/i18n/config";
import type { SiteDictionary } from "@/i18n/dictionaries";

type SiteReservationFabProps = {
  locale: Locale;
  dictionary: SiteDictionary;
};

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

export function SiteReservationFab({
  locale,
  dictionary,
}: SiteReservationFabProps) {
  return (
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
  );
}
