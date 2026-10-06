import { faqs } from "@/data/faqs";
import {
  LUNA_BOOKING_ACK,
  LUNA_FALLBACK,
  LUNA_GREETING,
  LUNA_HUMAN_HANDOFF,
} from "@/data/luna-knowledge";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { formatBRL } from "@/lib/utils";
import type { ChatMessage, LunaIntent, LunaReply } from "./types";

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

function detectIntent(message: string): LunaIntent {
  const m = norm(message);
  if (/^(oi|ola|opa|hey|bom dia|boa tarde|boa noite|tudo bem)/.test(m.trim())) return "greeting";
  if (/(agend|marca|horario|hora |reserva|disponib|sexta|segunda|terca|quarta|quinta|sabado|amanha|hoje)/.test(m))
    return "booking";
  if (/(combina|indic|recomend|sugest|qual.*(tratamento|servico|ideal)|quiz|teste|não sei|nao sei)/.test(m))
    return "recommend";
  if (/(valor|preco|preço|quanto|custa|tabela|orcamento)/.test(m)) return "prices";
  if (/(servico|tratamento|o que voces|oferece|tem .*massagem|limpeza|depila|cabelo|unha|sobrancelha)/.test(m))
    return "services";
  if (/(onde|endereco|local|horario de|funciona|abre|fecha|quando abre|telefone|whatsapp|contato)/.test(m))
    return "hours_location";
  if (/(humano|atendente|equipe|pessoa|falar com|reclam|problema|gerente)/.test(m)) return "human";
  return "fallback";
}

function findService(message: string) {
  const m = norm(message);
  return services.find((s) => {
    const keys = [s.slug, s.name, s.category].map(norm);
    const aliases: Record<string, string[]> = {
      "limpeza-de-pele": ["limpeza", "pele", "rosto", "facial", "cravos"],
      "tratamentos-faciais": ["peeling", "rejuvenesc", "anti-idade", "manchas"],
      depilacao: ["depila", "cera", "virilha", "perna", "axila"],
      cabelos: ["cabelo", "corte", "coloracao", "mechas", "escova", "hidratacao"],
      "manicure-pedicure": ["manicure", "pedicure", "unha", "esmalta", "nail"],
      sobrancelhas: ["sobrancelha", "brow", "design", "lamination"],
      "tratamentos-corporais": ["corporal", "drenagem", "modeladora", "gordura", "flacidez"],
      massagens: ["massagem", "relax", "pedras", "dores", "tensao", "estresse"],
    };
    const extra = aliases[s.slug] ?? [];
    return [...keys, ...extra].some((k) => k.length > 3 && m.includes(k));
  });
}

function servicesList(): string {
  return services
    .map((s) => `• **${s.name}** — ${s.tagline} (a partir de ${formatBRL(s.priceFrom)})`)
    .join("\n");
}

function pricesSummary(serviceSlug?: string): string {
  if (serviceSlug) {
    const s = services.find((x) => x.slug === serviceSlug);
    if (s)
      return `O serviço **${s.name}** custa a partir de **${formatBRL(s.priceFrom)}** (${s.durationMin} min). Quer que eu verifique um horário para você? 💕`;
  }
  const top = services.slice(0, 5);
  return (
    "Aqui vai um resumo dos valores ✨:\n" +
    top.map((s) => `• ${s.name}: a partir de ${formatBRL(s.priceFrom)}`).join("\n") +
    "\n\nQuer o valor detalhado de algum tratamento específico?"
  );
}

export async function think(message: string, history: ChatMessage[]): Promise<LunaReply> {
  const intent = detectIntent(message);
  const svc = findService(message);

  switch (intent) {
    case "greeting":
      return {
        intent,
        reply: `${LUNA_GREETING}\n\nPor onde quer começar?`,
        suggestions: ["Quero agendar um horário", "Conhecer os serviços", "Consultar valores"],
      };

    case "booking": {
      const dayMatch = message.match(/sexta|segunda|terça|terca|quarta|quinta|sábado|sabado|amanhã|amanha|hoje/i);
      const period = /manh[aã]|tarde|noite/i.exec(message)?.[0];
      let reply = LUNA_BOOKING_ACK;
      if (svc) reply += `\n\nAnotei: **${svc.name}**${dayMatch ? ` · ${dayMatch[0]}` : ""}${period ? ` · de ${period}` : ""}.`;
      else if (dayMatch) reply += `\n\nAnotei sua preferência: **${dayMatch[0]}${period ? ` de ${period}` : ""}**.`;
      reply +=
        "\n\nComo nossa agenda é ao vivo, vou abrir o agendamento para você escolher o melhor horário — ou, se preferir, nossa equipe confirma tudo pelo WhatsApp. 💕";
      return {
        intent,
        reply,
        serviceSlug: svc?.slug,
        action: { type: "open_booking", serviceSlug: svc?.slug },
        suggestions: ["Falar com a equipe", "Consultar valores", "Conhecer os serviços"],
      };
    }

    case "recommend":
      return {
        intent,
        reply: "Adoro ajudar nisso! ✨ Vou te fazer 2 perguntinhas rápidas para indicar o tratamento ideal:",
        action: { type: "start_quiz" },
        suggestions: ["Começar agora", "Ver todos os serviços"],
      };

    case "services":
      if (svc) {
        return {
          intent,
          reply: `**${svc.name}** — ${svc.tagline} 💕\n\n${svc.description}\n\nA partir de **${formatBRL(svc.priceFrom)}** · ${svc.durationMin} min. Quer agendar ou ver os horários?`,
          serviceSlug: svc.slug,
          action: { type: "open_booking", serviceSlug: svc.slug },
          suggestions: ["Quero agendar", "Consultar valores", "Qual combina comigo?"],
        };
      }
      return {
        intent,
        reply: `Temos tudo para o seu momento de cuidado ✨:\n${servicesList()}\n\nQuer detalhes de algum deles?`,
        action: { type: "scroll_to", target: "#servicos" },
        suggestions: ["Consultar valores", "Quero agendar", "Qual combina comigo?"],
      };

    case "prices":
      return {
        intent,
        reply: pricesSummary(svc?.slug),
        serviceSlug: svc?.slug,
        suggestions: ["Quero agendar", "Conhecer os serviços", "Falar com a equipe"],
      };

    case "hours_location":
      return {
        intent,
        reply: `Estamos te esperando! 📍\n\n**${site.address.street}** — ${site.address.city}\n${site.hours.map((h) => `• ${h.days}: ${h.time}`).join("\n")}\n\nQuer que eu abra o mapa ou agende sua visita? 💕`,
        action: { type: "scroll_to", target: "#contato" },
        suggestions: ["Quero agendar", "Falar com a equipe"],
      };

    case "human":
      return {
        intent,
        reply: LUNA_HUMAN_HANDOFF,
        action: { type: "open_whatsapp" },
        suggestions: ["Quero agendar", "Consultar valores"],
      };

    default: {
      // tenta responder via FAQ antes do fallback genérico
      const m = norm(message);
      const faqHit = faqs.find((f) =>
        norm(f.question)
          .split(/\s+/)
          .filter((w) => w.length > 4)
          .some((w) => m.includes(w))
      );
      if (faqHit) {
        return {
          intent: "fallback",
          reply: `${faqHit.answer}\n\nPosso ajudar com mais alguma coisa? 💕`,
          suggestions: ["Quero agendar", "Falar com a equipe"],
        };
      }
      void history;
      return {
        intent: "fallback",
        reply: LUNA_FALLBACK,
        suggestions: ["Conhecer os serviços", "Consultar valores", "Falar com a equipe"],
      };
    }
  }
}
