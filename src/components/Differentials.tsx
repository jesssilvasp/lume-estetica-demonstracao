import { Bot, Gem, HeartHandshake, Microscope } from "lucide-react";
import { Reveal } from "./Reveal";

const ITEMS = [
  {
    icon: HeartHandshake,
    title: "Atendimento personalizado",
    text: "Cada protocolo é desenhado para o seu tipo de pele, cabelo e momento.",
  },
  {
    icon: Microscope,
    title: "Tecnologia de ponta",
    text: "Equipamentos modernos e técnicas atualizadas com segurança comprovada.",
  },
  {
    icon: Gem,
    title: "Produtos premium",
    text: "Linhas profissionais dermatologicamente testadas em todos os rituais.",
  },
  {
    icon: Bot,
    title: "Agendamento com IA",
    text: "A Luna ajuda você a escolher, agendar e remarcar em segundos.",
  },
];

const STATS = [
  { value: "2.000+", label: "clientes felizes" },
  { value: "4.9★", label: "avaliação média" },
  { value: "8 anos", label: "de experiência" },
  { value: "15+", label: "especialistas" },
];

export function Differentials() {
  return (
    <section aria-label="Diferenciais da Lume" className="relative overflow-hidden bg-espresso-900 py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-gold-400/10 blur-[120px]"
      />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <Reveal className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-300">
            Diferenciais
          </p>
          <h2 className="mx-auto mt-3 max-w-[560px] font-serif text-[clamp(1.9rem,3.4vw,2.7rem)] font-medium leading-tight text-cream-50">
            O cuidado que você merece, em cada detalhe
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 90} variant="scale">
              <div className="group h-full rounded-[20px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-300/40 hover:bg-white/[0.07]">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-300/25 to-rose-400/25 text-gold-200 ring-1 ring-gold-300/30 transition-transform duration-500 group-hover:scale-110">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <h3 className="mt-4 text-[15px] font-bold text-cream-50">{title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-cream-50/65">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <dl className="mx-auto mt-10 grid max-w-[760px] grid-cols-2 gap-y-6 rounded-[20px] border border-gold-300/20 bg-espresso-950/50 px-6 py-7 text-center sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="order-2 mt-1 block text-[12px] font-semibold text-cream-50/60">{s.label}</dt>
                <dd className="font-serif text-[1.9rem] text-gold-200">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
