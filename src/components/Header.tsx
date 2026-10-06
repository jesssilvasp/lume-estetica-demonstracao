"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Início", href: "#inicio", active: true },
  { label: "Serviços", href: "#servicos" },
  { label: "Sobre nós", href: "#sobre" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
];

export function openBooking(serviceSlug?: string) {
  window.dispatchEvent(new CustomEvent("lume:open-booking", { detail: { serviceSlug } }));
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        scrolled ? "bg-espresso-950/85 shadow-lume-md backdrop-blur-xl" : "bg-gradient-to-b from-espresso-950/70 to-transparent"
      )}
    >
      <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Logo />

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Navegação principal">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "group relative text-[13.5px] font-semibold tracking-wide text-cream-50/90 transition-colors hover:text-cream-50",
                item.active && "text-cream-50"
              )}
            >
              {item.label}
              <span
                className={cn(
                  "absolute -bottom-2 left-0 h-[2px] rounded-full bg-nude-300 transition-all duration-300",
                  item.active ? "w-full" : "w-0 group-hover:w-full"
                )}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => openBooking()}
            className="group hidden items-center gap-2.5 rounded-full bg-nude-200 px-6 py-3 text-[13.5px] font-bold text-espresso-900 shadow-lume-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-nude-100 hover:shadow-lume-lg sm:inline-flex"
          >
            <CalendarCheck className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-110" />
            Agende seu horário
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-cream-50 transition-colors hover:bg-white/10 lg:hidden"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-500 ease-out lg:hidden",
          menuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="space-y-1 border-t border-white/10 bg-espresso-950/95 px-5 py-5 backdrop-blur-xl" aria-label="Menu móvel">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-4 py-3 text-[15px] font-semibold text-cream-50/90 transition-colors hover:bg-white/10 hover:text-cream-50"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false);
              openBooking();
            }}
            className="mt-3 flex w-full items-center justify-center gap-2.5 rounded-full bg-nude-200 px-6 py-3.5 text-[15px] font-bold text-espresso-900"
          >
            <CalendarCheck className="h-[18px] w-[18px]" />
            Agende seu horário
          </button>
        </nav>
      </div>
    </header>
  );
}
