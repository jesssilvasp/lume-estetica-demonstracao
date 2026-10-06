"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronsLeftRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function BeforeAfter() {
  const [pos, setPos] = useState(50);

  return (
    <section aria-label="Antes e depois" className="bg-cream-200/50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">
        <div>
          <SectionHeading
            eyebrow="Resultados reais"
            title="Antes e depois que falam por si"
          />
          <Reveal delay={100}>
            <p className="mt-4 max-w-[440px] text-[14.5px] leading-relaxed text-espresso-600">
              Protocolos personalizados, tecnologia de ponta e constância. Arraste o controle e
              veja a transformação que uma sequência de rituais faciais pode entregar.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <ul className="mt-6 space-y-3">
              {[
                "Pele mais viçosa e uniforme",
                "Poros visivelmente reduzidos",
                "Hidratação profunda e duradoura",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-[14px] font-semibold text-espresso-800">
                  <span className="h-2 w-2 rounded-full bg-gold-400" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 text-[11.5px] leading-relaxed text-espresso-500/80">
              * Imagens ilustrativas para demonstração do recurso. Resultados variam de pessoa para
              pessoa — agende uma avaliação gratuita.
            </p>
          </Reveal>
        </div>

        <Reveal variant="scale" delay={120}>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[440px] select-none overflow-hidden rounded-[26px] shadow-lume-lg ring-1 ring-espresso-900/10 sm:aspect-square lg:aspect-[4/5]">
            {/* depois (fundo) */}
            <Image
              src="https://images.pexels.com/photos/6417968/pexels-photo-6417968.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
              alt="Depois do tratamento: pele radiante"
              fill
              sizes="(max-width: 1024px) 100vw, 440px"
              loading="lazy"
              className="object-cover"
              draggable={false}
            />
            {/* antes (clip) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
              aria-hidden="true"
            >
              <Image
                src="https://images.pexels.com/photos/6417968/pexels-photo-6417968.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 440px"
                loading="lazy"
                className="object-cover [filter:saturate(0.55)_brightness(0.88)_contrast(0.94)]"
                draggable={false}
              />
            </div>
            {/* linha divisória */}
            <div
              className="absolute inset-y-0 w-[2px] bg-cream-50 shadow-[0_0_12px_rgba(0,0,0,0.4)]"
              style={{ left: `calc(${pos}% - 1px)` }}
              aria-hidden="true"
            />
            <span
              className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-gold-300 bg-cream-50 text-espresso-800 shadow-lume-md"
              style={{ left: `${pos}%` }}
              aria-hidden="true"
            >
              <ChevronsLeftRight className="h-5 w-5" />
            </span>
            <span className="absolute left-4 top-4 rounded-full bg-espresso-950/70 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-cream-50 backdrop-blur">
              Antes
            </span>
            <span className="absolute right-4 top-4 rounded-full bg-gold-300/95 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-espresso-950">
              Depois
            </span>
            <input
              type="range"
              min={4}
              max={96}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              className="ba-range absolute inset-0 h-full w-full opacity-0"
              aria-label="Comparar antes e depois"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
