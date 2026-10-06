# TASKS.md — Lume Estética

> Atualizado pelo agente a cada fase. Fase atual: **Fase 1**.

## Fase 1 — Backlog
- [x] T0 — Ler/criar docs fonte de verdade
- [x] T1 — Design system (tokens, fontes, globals.css)
- [x] T2 — Dados mockados (services, testimonials, faq, luna-knowledge)
- [x] T3 — Schema DB + push + seed
- [x] T4 — Header + Hero cinematográfico (GSAP)
- [x] T5 — Serviços + Sobre + Diferenciais
- [x] T6 — Destaques + Antes/depois + Depoimentos + Galeria
- [x] T7 — FAQ + CTA agendamento + Localização + Footer
- [x] T8 — Luna (UI + /api/luna/chat + cérebro desacoplado)
- [x] T9 — WhatsApp flutuante + booking modal
- [x] T10 — Responsivo/mobile-first + reduced-motion
- [x] T11 — SEO/a11y/performance
- [x] T12 — Validação: typegen + tsc + build + build_and_start ✅

## Hero cinematográfico — spec técnica
- `#hero-section`: 100svh, pin 100vh de scroll.
- ScrollTrigger: `pin:true, scrub:1, anticipatePin:1, invalidateOnRefresh:true`.
- FASE 1 entrada: bg levemente ampliado (scale 1.08), conteúdo visível.
- FASE 2 scroll: zoom lento bg (→1.18), yPercent bg, título sobe, subtítulo fade,
  CTA scale→0.94, overlay escurece (opacity progressiva).
- FASE 3 transição: conteúdo sai (yPercent −18, fade), próxima seção entra,
  border-radius progressivo da imagem (0→28px), unpin suave.
- Mobile (<768px): movimento reduzido, sem pin prolongado (end `+=40%`).
- `prefers-reduced-motion`: sem pin/scrub, hero estático acessível.
- Alturas dinâmicas (`func`-based values), `refresh()` só quando necessário
  (load de imagens / resize debounced / fonts.ready).

## Notas
- Não iniciar Fase 2 antes de concluir T12 da Fase 1.
