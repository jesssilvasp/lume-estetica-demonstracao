"use client";

import { useState } from "react";
import { MessageCircleHeart, Plus } from "lucide-react";
import { faqs } from "@/data/faqs";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";

export function openLuna(message?: string) {
  window.dispatchEvent(new CustomEvent("luna:open", { detail: { message } }));
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section aria-label="Perguntas frequentes" className="bg-cream-100 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-12">
        <div>
          <SectionHeading eyebrow="Dúvidas frequentes" title="Perguntas & respostas" />
          <Reveal delay={120}>
            <p className="mt-4 max-w-[380px] text-[14px] leading-relaxed text-espresso-600">
              Não achou o que procurava? A Luna responde na hora — ou nossa equipe te atende no
              WhatsApp.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <button
              onClick={() => openLuna("Tirar outras dúvidas")}
              className="group mt-6 inline-flex items-center gap-2.5 rounded-full bg-espresso-800 px-7 py-3.5 text-[13.5px] font-bold text-cream-50 transition-all duration-300 hover:-translate-y-0.5 hover:bg-espresso-950"
            >
              <MessageCircleHeart className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-110" />
              Perguntar para a Luna
            </button>
          </Reveal>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.question} delay={i * 60}>
                <div
                  className={cn(
                    "overflow-hidden rounded-[18px] bg-cream-50 shadow-lume-card ring-1 transition-all duration-300",
                    isOpen ? "ring-rose-400/50" : "ring-espresso-900/5 hover:ring-espresso-900/15"
                  )}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[14.5px] font-bold text-espresso-900">{faq.question}</span>
                    <span
                      className={cn(
                        "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                        isOpen ? "rotate-45 bg-espresso-800 text-cream-50" : "bg-nude-200 text-espresso-800"
                      )}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-400 ease-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                    style={{ transitionDuration: "400ms" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-[13.5px] leading-relaxed text-espresso-600">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
