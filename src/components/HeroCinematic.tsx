"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CalendarCheck, Flower2, Heart, ShieldCheck, Sparkles } from "lucide-react";
import { openBooking } from "./Header";

const INDICATORS = [
  { icon: Sparkles, label: "Profissionais especializadas" },
  { icon: Flower2, label: "Ambiente moderno e acolhedor" },
  { icon: ShieldCheck, label: "Produtos de alta qualidade" },
  { icon: Heart, label: "Resultados que elevam sua autoestima" },
];

export function HeroCinematic() {
  const rootRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // hero estático e acessível

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // ---------- FASE 1 — Entrada ----------
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .fromTo("#hero-bg-img", { scale: 1.16 }, { scale: 1.08, duration: 1.6, ease: "power2.out" }, 0)
        .fromTo(
          ".hero-rise",
          { y: 34, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.12 },
          0.25
        );

      // ---------- FASE 2 + 3 — Scroll cinematográfico ----------
      const mm = gsap.matchMedia();

      // Desktop / tablet grande: experiência completa com pin de ~100vh
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#hero-section",
            start: "top top",
            end: () => "+=" + window.innerHeight * 1.0,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        tl.to("#hero-bg-img", { scale: 1.22, yPercent: 10, duration: 3, ease: "none" }, 0)
          .to("#hero-overlay-dim", { opacity: 0.55, duration: 3, ease: "none" }, 0)
          .to("#hero-title", { y: -56, duration: 3, ease: "none" }, 0)
          .to("#hero-sub", { y: -30, opacity: 0, duration: 2, ease: "none" }, 0)
          .to("#hero-ctas", { scale: 0.92, opacity: 0.25, transformOrigin: "left center", duration: 2.4, ease: "none" }, 0)
          .to("#hero-indicators", { opacity: 0, y: 24, duration: 1.6, ease: "none" }, 0.2)
          .to("#hero-content", { yPercent: -12, opacity: 0, duration: 1.4, ease: "power1.in" }, 1.8)
          .to(
            "#hero-bg",
            { borderBottomLeftRadius: 28, borderBottomRightRadius: 28, duration: 1.2, ease: "none" },
            1.8
          );
      });

      // Mobile: movimento reduzido, pin curto
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#hero-section",
            start: "top top",
            end: () => "+=" + window.innerHeight * 0.45,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        tl.to("#hero-bg-img", { scale: 1.14, duration: 2, ease: "none" }, 0)
          .to("#hero-overlay-dim", { opacity: 0.4, duration: 2, ease: "none" }, 0)
          .to("#hero-content", { y: -36, opacity: 0.15, duration: 2, ease: "none" }, 0);
      });

      // Refresh somente quando necessário: fontes + imagem hero
      let refreshed = false;
      const safeRefresh = () => {
        if (refreshed) return;
        refreshed = true;
        ScrollTrigger.refresh();
      };
      if (document.fonts?.ready) document.fonts.ready.then(safeRefresh).catch(() => {});
      window.addEventListener("hero:image-ready", safeRefresh, { once: true });
      return () => window.removeEventListener("hero:image-ready", safeRefresh);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero-section"
      ref={rootRef}
      aria-label="Lume Estética — Beleza, bem-estar e confiança"
      className="relative overflow-hidden bg-espresso-950"
    >
      {/* fundo */}
      <div id="hero-bg" className="absolute inset-0 overflow-hidden">
        <Image
          id="hero-bg-img"
          src="https://images.pexels.com/photos/7195803/pexels-photo-7195803.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1920"
          alt="Cliente radiante em salão de estética luxuoso e acolhedor"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-[68%_center] sm:object-center"
          onLoad={() => window.dispatchEvent(new Event("hero:image-ready"))}
        />
        {/* gradiente editorial: texto legível à esquerda */}
        <div className="absolute inset-0 bg-gradient-to-r from-espresso-950/90 via-espresso-950/55 to-espresso-950/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-transparent to-espresso-950/40" />
        {/* overlay que escurece progressivamente no scroll */}
        <div id="hero-overlay-dim" className="absolute inset-0 bg-espresso-950 opacity-0" />
      </div>

      {/* neon script — desktop */}
      <p
        aria-hidden="true"
        className="neon-script hero-rise absolute right-[392px] top-[15%] hidden w-[230px] rotate-[-5deg] text-center text-[2.6rem] leading-[1.15] 2xl:right-[440px] 2xl:text-[2.9rem] min-[1280px]:block"
      >
        Mais que estética, a sua melhor versão.
      </p>

      {/* conteúdo */}
      <div
        id="hero-content"
        className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-center px-5 pb-10 pt-[110px] sm:px-8 lg:px-12"
      >
        <div className="max-w-[620px]">
          <p className="hero-rise text-[10.5px] font-bold uppercase tracking-[0.3em] text-nude-300 sm:text-[11.5px]">
            Cuidar de você é a nossa especialidade
          </p>
          <h1
            id="hero-title"
            className="hero-rise mt-4 font-serif text-[clamp(2.7rem,7vw,4.9rem)] font-medium leading-[1.03] text-cream-50"
          >
            Beleza, bem-estar
            <br />
            e confiança
          </h1>
          <p
            id="hero-sub"
            className="hero-rise mt-5 max-w-[480px] text-[14.5px] leading-relaxed text-cream-50/85 sm:text-[16px]"
          >
            Serviços de estética e beleza com profissionais especializadas, ambiente acolhedor e
            tecnologia para oferecer a melhor experiência para você.
          </p>
          <div id="hero-ctas" className="hero-rise mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={() => openBooking()}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-nude-200 px-8 py-4 text-[14.5px] font-bold text-espresso-900 shadow-lume-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-nude-100"
            >
              <CalendarCheck className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-110" />
              Agende seu horário
            </button>
            <a
              href="#servicos"
              className="inline-flex items-center justify-center rounded-full border border-cream-50/50 px-8 py-4 text-[14.5px] font-bold text-cream-50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cream-50 hover:bg-white/10"
            >
              Conheça nossos serviços
            </a>
          </div>
        </div>

        {/* indicadores */}
        <div
          id="hero-indicators"
          className="hero-rise mt-10 grid max-w-[640px] grid-cols-2 gap-x-4 gap-y-5 sm:mt-12 sm:grid-cols-4"
        >
          {INDICATORS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-start gap-2.5 sm:items-center sm:text-center">
              <span className="text-nude-200">
                <Icon className="h-7 w-7" strokeWidth={1.4} />
              </span>
              <span className="max-w-[130px] text-[12px] font-semibold leading-snug text-cream-50/90">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
