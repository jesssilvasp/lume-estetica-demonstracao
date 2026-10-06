import { About } from "@/components/About";
import { BeforeAfter } from "@/components/BeforeAfter";
import { BookingCta } from "@/components/BookingCta";
import { BookingModal } from "@/components/BookingModal";
import { Differentials } from "@/components/Differentials";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { HeroCinematic } from "@/components/HeroCinematic";
import { Location } from "@/components/Location";
import { Services } from "@/components/Services";
import { Spotlights } from "@/components/Spotlights";
import { Testimonials } from "@/components/Testimonials";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { LunaChat } from "@/components/luna/LunaChat";
import { services } from "@/data/services";
import { site } from "@/data/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: "Lume Estética",
  description: site.description,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
  },
  openingHours: ["Mo-Fr 09:00-20:00", "Sa 08:00-18:00"],
  priceRange: "$$",
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "480" },
  makesOffer: services.slice(0, 8).map((s) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: s.name, description: s.tagline },
    price: (s.priceFrom / 100).toFixed(0),
    priceCurrency: "BRL",
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main id="inicio">
        <HeroCinematic />
        <Services />
        <About />
        <Differentials />
        <Spotlights />
        <BeforeAfter />
        <Testimonials />
        <Gallery />
        <Faq />
        <BookingCta />
        <Location />
      </main>
      <Footer />
      <LunaChat />
      <WhatsAppFloat />
      <BookingModal />
    </>
  );
}
