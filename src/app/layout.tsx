import type { Metadata } from "next";
import { Cinzel, Manrope, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoArabic = Noto_Naskh_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Emsel Beauty",
    template: "%s | Emsel Beauty",
  },
  description:
    "Emsel Beauty icin Next.js tabanli, cok dilli site ve ayri admin panel mimarisi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${manrope.variable} ${cinzel.variable} ${notoArabic.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
