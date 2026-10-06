import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Location() {
  return (
    <section id="contato" className="scroll-mt-20 bg-cream-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Visite-nos"
          title="Localização & horários"
          align="center"
          className="mx-auto max-w-[480px]"
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal variant="scale">
            <div className="flex h-full flex-col rounded-[24px] bg-espresso-900 p-7 text-cream-50 shadow-lume-md sm:p-9">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold-300/15 text-gold-200 ring-1 ring-gold-300/30">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-[15px] font-bold">Onde estamos</h3>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-cream-50/75">
                    {site.address.street}
                    <br />
                    {site.address.city}
                  </p>
                  <a
                    href={site.address.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-[13px] font-bold text-gold-200 underline-offset-4 hover:underline"
                  >
                    Ver no mapa →
                  </a>
                </div>
              </div>

              <div className="my-6 h-px bg-white/10" />

              <div className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold-300/15 text-gold-200 ring-1 ring-gold-300/30">
                  <Clock className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <h3 className="text-[15px] font-bold">Horários</h3>
                  <ul className="mt-2 space-y-1.5">
                    {site.hours.map((h) => (
                      <li
                        key={h.days}
                        className="flex items-center justify-between text-[13.5px] text-cream-50/75"
                      >
                        <span>{h.days}</span>
                        <span className="font-bold text-cream-50">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="my-6 h-px bg-white/10" />

              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href={`tel:+55${site.phone.replace(/\D/g, "")}`}
                  className="flex items-center gap-3 rounded-2xl bg-white/[0.06] px-4 py-3.5 ring-1 ring-white/10 transition-colors hover:bg-white/[0.1]"
                >
                  <Phone className="h-[18px] w-[18px] text-gold-200" />
                  <span className="text-[13px] font-bold">{site.phone}</span>
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 rounded-2xl bg-white/[0.06] px-4 py-3.5 ring-1 ring-white/10 transition-colors hover:bg-white/[0.1]"
                >
                  <Mail className="h-[18px] w-[18px] text-gold-200" />
                  <span className="truncate text-[13px] font-bold">{site.email}</span>
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal variant="scale" delay={120}>
            <div className="relative h-full min-h-[380px] overflow-hidden rounded-[24px] shadow-lume-md ring-1 ring-espresso-900/10">
              <iframe
                title="Mapa — Lume Estética, Jardins, São Paulo"
                src="https://maps.google.com/maps?q=Rua%20Oscar%20Freire%20Jardins%20S%C3%A3o%20Paulo&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="pointer-events-none absolute bottom-5 left-5 rounded-2xl bg-cream-50/95 px-5 py-3.5 shadow-lume-md backdrop-blur">
                <p className="font-serif text-[1.1rem] text-espresso-900">Lume Estética</p>
                <p className="text-[12px] font-semibold text-espresso-600">
                  {site.address.street} · {site.address.city}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
