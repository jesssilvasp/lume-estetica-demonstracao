"use client";

import { CalendarCheck, Clock, MapPin, Phone } from "lucide-react";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { Logo } from "./Logo";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "./icons";

const NAV = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Sobre nós", href: "#sobre" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
];

export function Footer() {
  return (
    <footer className="bg-espresso-950 pb-8 pt-14 text-cream-50/75">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.9fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-[280px] text-[13px] leading-relaxed">
              {site.description}
            </p>
            <div className="mt-5 flex gap-2.5">
              {[
                { icon: InstagramIcon, label: "Instagram da Lume", href: "https://instagram.com" },
                { icon: FacebookIcon, label: "Facebook da Lume", href: "https://facebook.com" },
                { icon: WhatsAppIcon, label: "WhatsApp da Lume", href: "https://wa.me/5511999999999" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-300 hover:text-gold-200"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Mapa do site">
            <h3 className="text-[12px] font-bold uppercase tracking-[0.22em] text-gold-200/80">
              Navegação
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-[13.5px] transition-colors hover:text-cream-50">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Serviços">
            <h3 className="text-[12px] font-bold uppercase tracking-[0.22em] text-gold-200/80">
              Serviços
            </h3>
            <ul className="mt-4 space-y-2.5">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <a href="#servicos" className="text-[13.5px] transition-colors hover:text-cream-50">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-[12px] font-bold uppercase tracking-[0.22em] text-gold-200/80">
              Atendimento
            </h3>
            <ul className="mt-4 space-y-3 text-[13px]">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-300/80" />
                {site.address.street} — {site.address.city}
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-gold-300/80" />
                Seg–Sáb · 9h às 20h
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-gold-300/80" />
                {site.phone}
              </li>
            </ul>
            <a
              href="#inicio"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-nude-200 px-6 py-2.5 text-[13px] font-bold text-espresso-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-nude-100"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent("lume:open-booking", { detail: {} }));
              }}
            >
              <CalendarCheck className="h-4 w-4" />
              Agende seu horário
            </a>
          </div>
        </div>

        <div className="gold-divider mt-10 h-px opacity-40" />
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-[12px] text-cream-50/45 sm:flex-row">
          <p>© {new Date().getFullYear()} Lume Estética. Todos os direitos reservados.</p>
          <p className="font-script text-[1.15rem] text-gold-200/60">beleza que realça você</p>
        </div>
      </div>
    </footer>
  );
}
