import type { Metadata, Viewport } from "next";
import { Manrope, Pinyon_Script, Playfair_Display } from "next/font/google";
import "./globals.css";

/** Fontes via Google Fonts (mesmas famílias do DESIGN.md, sem binários locais). */
const serif = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const script = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
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
    images: [{ url: "https://images.pexels.com/photos/7195803/pexels-photo-7195803.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200", width: 1200, height: 630, alt: "Lume Estética" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lume Estética — Beleza, bem-estar e confiança",
    description: "Agende seu horário com a Luna, nossa assistente virtual.",
    images: ["https://images.pexels.com/photos/7195803/pexels-photo-7195803.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200"],
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
