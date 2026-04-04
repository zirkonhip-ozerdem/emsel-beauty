import type { Metadata } from "next";
import { Cormorant_Garamond, Lora, Manrope } from "next/font/google";
import "./globals.css";
import "@/styles/site-components.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Emsel Beauty",
    template: "%s | Emsel Beauty",
  },
  description:
    "Emsel Beauty icin Next.js tabanli, cok dilli site ve ayri admin panel mimarisi.",
  icons: {
    icon: "/favicon-emsel.png",
    shortcut: "/favicon-emsel.png",
    apple: "/favicon-emsel.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${manrope.variable} ${cormorant.variable} ${lora.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
