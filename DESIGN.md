# DESIGN.md — Lume Estética

Fonte de verdade visual. Fidelidade pixel-perfect à referência é obrigatória.

## Paleta
| Token | Valor | Uso |
|---|---|---|
| `espresso-950` | `#1E1410` | texto escuro, footer, overlay hero |
| `espresso-800` | `#3A2A22` | títulos sobre claro, botões escuros |
| `espresso-600` | `#5C443A` | texto secundário |
| `cream-50` | `#FFFDF9` | branco quente, fundos claros |
| `cream-100` | `#FAF3EC` | fundo serviços/sobre |
| `cream-200` | `#F3E7DA` | cards, chips |
| `nude-200` | `#EFD9C8` | CTA primário (pill) |
| `nude-300` | `#E5C3AC` | hover CTA, detalhes |
| `rose-400` | `#C99B7F` | acentos, ícones circulares, setas |
| `rose-500` | `#B4836A` | hover acentos |
| `gold-300` | `#D9B98A` | neon script, estrelas, detalhes dourados |
| `gold-400` | `#C9A05F` | contornos premium |

Evitar rosa forte. Rosé sempre puxado ao nude/bege.

## Tipografia
- Títulos (serifada sofisticada): **Playfair Display** — `font-serif`.
- Textos/UI/botões (sans moderna): **Manrope** — `font-sans`.
- Manuscrita (detalhes/neon): **Pinyon Script** — `font-script`.
- Eyebrow: sans, `tracking-[0.25em]`, uppercase, `text-[11px]`, cor nude-escuro.
- H1 hero: serif, `clamp(2.6rem, 6vw, 4.8rem)`, leading 1.02, branco.
- H2 seções: serif, `clamp(1.9rem, 3.6vw, 2.9rem)`, espresso-800.

## Componentes
- **Pills CTA**: `rounded-full`, primário `bg-nude-200 text-espresso-900`,
  secundário `border border-white/60 text-white` (hero) ou `border-espresso/20` (claro).
- **Cards serviço**: imagem `rounded-2xl` topo, título sans semibold 15px,
  subtítulo 13px muted, botão seta circular `bg-rose-400/90` canto inferior direito.
- **Cards escuros**: `bg-espresso-950/85 backdrop-blur border-white/15`.
- **Chat Luna**: card `rounded-[22px] bg-cream-50 shadow-2xl`, header com foto,
  atalhos como pills outline, input pill com botão circular rose.
- **Raio padrão**: 16–24px. Sombras suaves e quentes.

## Hero (referência)
- Full-bleed 100svh, overlay gradiente espresso da esquerda.
- Coluna esquerda: eyebrow → H1 → parágrafo → 2 CTAs → 4 indicadores com ícones line.
- Direita (desktop): script neon dourado + card Luna sobreposto.
- Mobile: Luna vira botão flutuante + painel bottom-sheet.

## Motion
- Microinterações: fade/reveal no scroll (IO), hover lift em cards,
  transições 300–500ms `ease-out`.
- Hero cinematográfico via GSAP ScrollTrigger (ver TASKS/ROADMAP fase 1).
- `prefers-reduced-motion`: tudo estático e acessível.
