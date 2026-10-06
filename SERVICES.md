# SERVICES.md — Catálogo

## Categorias (8)
1. **Limpeza de pele** — Pele saudável e radiante — a partir de R$ 149
2. **Tratamentos faciais** — Rejuvenescimento e luminosidade — a partir de R$ 189
3. **Depilação** — Conforto e praticidade — a partir de R$ 59
4. **Cabelos** — Corte, coloração e tratamentos — a partir de R$ 89
5. **Manicure e pedicure** — Beleza em cada detalhe — a partir de R$ 65
6. **Sobrancelhas** — Design e definição do olhar — a partir de R$ 55
7. **Tratamentos corporais** — Mais bem-estar para o seu dia a dia — a partir de R$ 179
8. **Massagens** — Relaxamento profundo — a partir de R$ 159

## Tratamentos em destaque (4)
- Ritual Glow Lume (facial + massagem) — R$ 299 · 90 min · ★ best-seller
- Alisamento & Nutrição Silk — R$ 249 · 120 min
- Spa Day Lume Completo — R$ 499 · 240 min
- Design de sobrancelhas + brow lamination — R$ 119 · 45 min

## Contrato de dados
```ts
type Service = {
  slug: string; category: string; name: string; tagline: string;
  description: string; priceFrom: number; durationMin: number;
  image: string; featured?: boolean;
};
```
- Fase 1: `src/data/services.ts` (mock tipado, mesma forma do DB).
- Fase 2: tabelas `services`/`categories` + `GET /api/services`.
- Imagens: Pexels (hotlink otimizado) + locais em `public/images/`.
