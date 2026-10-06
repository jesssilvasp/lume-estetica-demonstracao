"use client";

import { WHATSAPP_LINK } from "@/data/services";
import { WhatsAppIcon } from "./icons";

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar com a Lume no WhatsApp"
      className="group fixed bottom-5 left-5 z-40 flex items-center gap-0 rounded-full bg-[#25d366] p-4 text-white shadow-[0_12px_36px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-105 hover:gap-2.5 hover:pl-4 hover:pr-5 sm:bottom-6 sm:left-6"
    >
      <WhatsAppIcon className="h-6 w-6 shrink-0" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-[13px] font-bold opacity-0 transition-all duration-300 group-hover:max-w-[140px] group-hover:opacity-100">
        Fale conosco
      </span>
    </a>
  );
}
