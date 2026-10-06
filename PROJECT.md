# PROJECT.md — Lume Estética

## Visão
Landing page premium + agente de IA (**Luna**) para o salão **Lume Estética**.
Transmite: sofisticação + acolhimento + tecnologia + autocuidado.

## Objetivos
- Conversão: agendamentos via interface tradicional, Luna e WhatsApp.
- Autoridade: serviços, antes/depois, depoimentos, diferenciais.
- Experiência: hero cinematográfico, microinterações suaves, mobile-first.

## Stack
- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4.
- PostgreSQL via Drizzle ORM (local; Supabase-compatível no futuro).
- GSAP + ScrollTrigger (hero), Lucide icons.
- API de IA desacoplada em `src/app/api/luna/` + cérebro em `src/lib/luna/`.
- Deploy alvo: Vercel.

## Estrutura
```
src/
  app/            # rotas, layout, page, api/*
  components/     # Header, Hero, sections, Luna, WhatsApp...
  data/           # services, testimonials, faq, luna-knowledge
  lib/luna/       # cérebro da Luna (intents, replies, booking-flow)
  db/             # schema + client Drizzle
public/images/    # hero.jpg, luna.jpg (geradas)
```

## Seções da landing (ordem)
1 Header · 2 Hero · 3 Serviços · 4 Sobre · 5 Diferenciais · 6 Tratamentos em
destaque · 7 Antes e depois · 8 Depoimentos · 9 Galeria · 10 FAQ ·
11 CTA agendamento · 12 Localização/horários · 13 Footer · 14 Luna flutuante
(+ botão WhatsApp flutuante).

## Fluxo de agendamento (alvo)
Serviço → profissional → data → horário → dados da cliente → confirmação.
Iniciável pela UI ou pela Luna. Sem disponibilidade real na Fase 1:
Luna trabalha em modo demonstrativo e direciona para WhatsApp.
