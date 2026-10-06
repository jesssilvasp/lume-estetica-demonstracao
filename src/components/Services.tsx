"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { openBooking } from "./Header";
import { cn } from "@/lib/utils";

/** Ordem da referência visual para os 5 destaques. */
const ORDER = ["limpeza-de-pele", "depilacao", "cabelos", "manicure-pedicure", "tratamentos-corporais"];

export function Services() {
  const [expanded, setExpanded] = useState(false);
  const ordered = [...services].sort(
    (a, b) => ORDER.indexOf(a.slug) - ORDER.indexOf(b.slug)
  );
  const visible = expanded ? [...ordered, ...services.filter((s) => !ORDER.includes(s.slug))] : ordered;

  return (
    <section id="servicos" className="scroll-mt-20 bg-cream-100 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Nossos serviços"
            title="Tudo o que você precisa para se sentir ainda mais você"
            className="max-w-[520px]"
          />
          <Reveal delay={120} className="max-w-[380px] lg:pb-1 lg:text-right">
            <p className="text-[13.5px] leading-relaxed text-espresso-600">
              Tratamentos faciais, corporais, cuidados com cabelos, unhas e muito mais, em um só
              lugar.
            </p>
            <button
              onClick={() => setExpanded((v) => !v)}
              className="group mt-4 inline-flex items-center gap-2 rounded-full border border-espresso-800/25 px-6 py-2.5 text-[13px] font-bold text-espresso-800 transition-all duration-300 hover:border-espresso-800 hover:bg-espresso-800 hover:text-cream-50"
              aria-expanded={expanded}
            >
              {expanded ? "Ver menos" : "Ver todos os serviços"}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 min-[1280px]:grid-cols-5 min-[1280px]:gap-4">
          {visible.map((service, i) => (
            <Reveal key={service.slug} delay={Math.min(i, 7) * 70} variant="scale">
              <button
                onClick={() => openBooking(service.slug)}
                className="group block w-full overflow-hidden rounded-[20px] bg-cream-50 text-left shadow-lume-card ring-1 ring-espresso-900/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lume-md"
                aria-label={`Agendar ${service.name}`}
              >
                <span className="relative block aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-espresso-950/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </span>
                <span className="flex items-start justify-between gap-3 p-4">
                  <span>
                    <span className="block text-[14.5px] font-bold text-espresso-900">
                      {service.name}
                    </span>
                    <span className="mt-0.5 block text-[12.5px] leading-snug text-espresso-600">
                      {service.tagline}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-400/85 text-cream-50 transition-all duration-300",
                      "group-hover:rotate-45 group-hover:bg-espresso-800"
                    )}
                  >
                    <ArrowUpRight className="h-[18px] w-[18px]" />
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
