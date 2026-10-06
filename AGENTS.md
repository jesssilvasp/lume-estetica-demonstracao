# AGENTS.md — Lume Estética

Fonte de verdade para agentes de IA que atuam neste repositório.

## 1. Idioma
- Todo conteúdo da UI, commits e docs em **pt-BR**.

## 2. Leitura obrigatória
Antes de qualquer implementação, ler todos os `.md` da raiz:
`AGENTS.md`, `PROJECT.md`, `DESIGN.md`, `AI-AGENT.md`, `SERVICES.md`,
`DATABASE.md`, `ROADMAP.md`, `TASKS.md`, `SECURITY.md`.

## 3. Regras de implementação
1. Verifique `ROADMAP.md` + `TASKS.md` e identifique a fase atual.
2. Implemente **somente** o escopo da fase.
3. Não altere componentes funcionais sem necessidade.
4. Componentes reutilizáveis em `src/components/`.
5. Dados mockados em `src/data/` — nunca hardcode de conteúdo importante dentro de componentes.
6. API de IA desacoplada: frontend chama `/api/luna/chat`; cérebro em `src/lib/luna/`.
7. Mobile-first, SEO, acessibilidade e Core Web Vitals são requisitos.
8. Validação final obrigatória: `next typegen` + `tsc --noEmit` + `npm run build` + `build_and_start`.

## 4. Padrões de código
- Next.js App Router + TypeScript estrito + Tailwind CSS v4.
- `import { db } from "@/db"` para banco. Drizzle ORM + PostgreSQL.
- Imagens: `next/image` quando local; lazy loading; `alt` sempre.
- Animações: GSAP ScrollTrigger só no hero; resto com IntersectionObserver/CSS.
- Respeitar `prefers-reduced-motion`.

## 5. Proibições
- Nunca inventar disponibilidade de horários.
- Nunca expor segredos no cliente (só `NEXT_PUBLIC_*`).
- Nunca editar `package.json` diretamente.
