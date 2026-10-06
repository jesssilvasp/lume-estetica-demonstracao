import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

/** Fontes auto-hospedadas (build funciona 100% offline). */
const serif = localFont({
  src: [
    { path: "./fonts/playfair-latin.woff2", weight: "400 700" },
    { path: "./fonts/playfair-latin-ext.woff2", weight: "400 700" },
  ],
  variable: "--font-serif",
  display: "swap",
});

const sans = localFont({
  src: [
    { path: "./fonts/manrope-latin.woff2", weight: "400 800" },
    { path: "./fonts/manrope-latin-ext.woff2", weight: "400 800" },
  ],
  variable: "--font-sans",
  display: "swap",
});

const script = localFont({
  src: [
    { path: "./fonts/pinyon-latin.woff2", weight: "400" },
    { path: "./fonts/pinyon-latin-ext.woff2", weight: "400" },
  ],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Lume Estética — Beleza, bem-estar e confiança",
    template: "%s · Lume Estética",
  },
  description:
    "Serviços de estética e beleza com profissionais especializadas, ambiente acolhedor e tecnologia para oferecer a melhor experiência para você. Agende com a Luna, nossa assistente virtual.",
  keywords: [
    "estética",
    "salão de beleza",
    "limpeza de pele",
    "tratamentos faciais",
    "depilação",
    "cabelos",
    "manicure",
    "pedicure",
    "sobrancelhas",
    "massagem",
    "agendamento online",
  ],
  authors: [{ name: "Lume Estética" }],
  creator: "Lume Estética",
  metadataBase: new URL("https://lume-estetica.vercel.app"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Lume Estética",
    title: "Lume Estética — Beleza, bem-estar e confiança",
    description:
      "Profissionais especializadas, ambiente acolhedor e tecnologia para a melhor experiência de beleza.",
    images: [{ url: "/images/hero.jpg", width: 1200, height: 630, alt: "Lume Estética" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lume Estética — Beleza, bem-estar e confiança",
    description: "Agende seu horário com a Luna, nossa assistente virtual.",
    images: ["/images/hero.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1e1410",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${serif.variable} ${sans.variable} ${script.variable}`}>
      <body className="bg-cream-100 font-sans text-espresso-900 antialiased">
        {children}
      </body>
    </html>
  );
}
