"use client";

import Image from "next/image";
import { ArrowUpRight, Clock } from "lucide-react";
import { spotlights } from "@/data/services";
import { formatBRL } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { openBooking } from "./Header";

export function Spotlights() {
  return (
    <section aria-label="Tratamentos em destaque" className="bg-cream-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Os queridinhos"
            title="Tratamentos em destaque"
            className="max-w-[480px]"
          />
          <Reveal delay={120}>
            <p className="max-w-[360px] text-[13.5px] leading-relaxed text-espresso-600">
              Os rituais mais amados pelas nossas clientes — combinação perfeita de resultado e
              experiência.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {spotlights.map((item, i) => (
            <Reveal key={item.slug} delay={i * 80} variant="scale">
              <article className="group flex h-full flex-col overflow-hidden rounded-[22px] bg-cream-100 shadow-lume-card ring-1 ring-espresso-900/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lume-md">
                <div className="relative aspect-[5/4] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/35 to-transparent" />
                  {item.tag && (
                    <span className="absolute left-4 top-4 rounded-full bg-gold-300/95 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-espresso-950 shadow-lume-sm">
                      {item.tag}
                    </span>
                  )}
                  <span className="absolute bottom-4 left-4 rounded-full bg-cream-50/95 px-4 py-1.5 text-[14px] font-extrabold text-espresso-900 shadow-lume-sm backdrop-blur">
                    {formatBRL(item.price)}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-serif text-[1.25rem] font-semibold leading-snug text-espresso-900">
                    {item.name}
                  </h3>
                  <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-espresso-600">
                    {item.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-espresso-500">
                      <Clock className="h-4 w-4" /> {item.durationMin} min
                    </span>
                    <button
                      onClick={() => openBooking(item.slug)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-espresso-800 px-5 py-2.5 text-[12.5px] font-bold text-cream-50 transition-all duration-300 hover:gap-2.5 hover:bg-espresso-950"
                      aria-label={`Agendar ${item.name}`}
                    >
                      Agendar <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
