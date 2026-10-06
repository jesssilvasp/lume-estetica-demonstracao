"use client";

import { ArrowRight, CalendarCheck, Check } from "lucide-react";
import { WHATSAPP_LINK } from "@/data/services";
import { Reveal } from "./Reveal";
import { openBooking } from "./Header";
import { WhatsAppIcon } from "./icons";

const STEPS = ["Serviço", "Profissional", "Data", "Horário", "Confirmação"];

export function BookingCta() {
  return (
    <section aria-label="Agende seu horário" className="relative overflow-hidden bg-espresso-900 py-16 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 left-1/2 h-[440px] w-[820px] -translate-x-1/2 rounded-full bg-rose-400/15 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-[-120px] h-[360px] w-[360px] rounded-full bg-gold-400/10 blur-[110px]"
      />
      <div className="relative mx-auto max-w-[900px] px-5 text-center sm:px-8">
        <Reveal>
          <p className="font-script text-[2rem] text-gold-200 sm:text-[2.4rem]">
            seu momento chegou
          </p>
          <h2 className="mx-auto mt-2 max-w-[640px] font-serif text-[clamp(2rem,4.5vw,3.2rem)] font-medium leading-[1.08] text-cream-50">
            Agende seu horário em menos de 1 minuto
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] text-[14.5px] leading-relaxed text-cream-50/70">
            Escolha o ritual ideal, selecione o melhor dia e receba a confirmação no WhatsApp.
            Simples assim. ✨
          </p>
        </Reveal>

        <Reveal delay={140}>
          <ol className="mx-auto mt-8 flex max-w-[620px] flex-wrap items-center justify-center gap-2">
            {STEPS.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-[12px] font-bold text-cream-50/85">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-300/90 text-[10px] font-extrabold text-espresso-950">
                    {i + 1}
                  </span>
                  {step}
                </span>
                {i < STEPS.length - 1 && (
                  <ArrowRight className="h-3.5 w-3.5 text-cream-50/30" aria-hidden="true" />
                )}
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={() => openBooking()}
              className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-nude-200 px-9 py-4 text-[15px] font-bold text-espresso-900 shadow-lume-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-nude-100 sm:w-auto"
            >
              <CalendarCheck className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              Agende seu horário
            </button>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-cream-50/30 px-9 py-4 text-[15px] font-bold text-cream-50 transition-all duration-300 hover:-translate-y-0.5 hover:border-cream-50 hover:bg-white/10 sm:w-auto"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Chamar no WhatsApp
            </a>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <p className="mt-6 inline-flex items-center gap-2 text-[12.5px] font-semibold text-cream-50/55">
            <Check className="h-4 w-4 text-gold-300" />
            Confirmação imediata · Remarcação gratuita · Sem sinal para a maioria dos serviços
          </p>
        </Reveal>
      </div>
    </section>
  );
}
