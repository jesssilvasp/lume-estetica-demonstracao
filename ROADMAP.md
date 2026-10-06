# ROADMAP.md — Lume Estética

## Fase 1 — Landing page visual ✅ (concluída)
- [x] Docs fonte de verdade (9 arquivos MD)
- [ ] Design system + fontes + tokens (DESIGN.md)
- [ ] 14 seções da landing (pixel-perfect à referência)
- [ ] Hero cinematográfico GSAP ScrollTrigger (pin/scrub, 100svh)
- [ ] Luna modo demonstrativo (arquitetura desacoplada)
- [ ] WhatsApp flutuante + booking UI (fluxo visual, sem backend real)
- [ ] Schema DB + push + seed básico
- [ ] Responsivo + SEO + a11y + validação final

## Fase 2 — Backend real
- APIs: services, professionals, availability, appointments, testimonials, faq.
- Booking funcional: serviço → profissional → data → horário → dados → confirmação.
- Painel admin mínimo + confirmação via WhatsApp.

## Fase 3 — IA real
- Plugar LLM na Luna mantendo contrato `POST /api/luna/chat`.
- RAG sobre serviços/valores/horários + consulta real de disponibilidade.
- Handoff humano + logs de conversa.

## Fase 4 — Conversão & growth
- A/B de CTAs, analytics, avaliações pós-atendimento, programa fidelidade.
