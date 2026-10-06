import Image from "next/image";
import { CalendarCheck, Flower2, Heart, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Reveal } from "./Reveal";

const CHECKLIST = [
  { icon: Heart, text: "Atendimento personalizado" },
  { icon: Sparkles, text: "Tecnologias e produtos de ponta" },
  { icon: Flower2, text: "Espaço moderno e confortável" },
  { icon: ShieldCheck, text: "Equipe altamente qualificada" },
  { icon: CalendarCheck, text: "Agendamento rápido e fácil com nossa assistente de IA" },
];

const AVATARS = [
  { initials: "CR", bg: "bg-rose-400" },
  { initials: "JM", bg: "bg-gold-400" },
  { initials: "PA", bg: "bg-espresso-500" },
  { initials: "FC", bg: "bg-nude-400" },
];

export function About() {
  return (
    <section id="sobre" className="scroll-mt-20 bg-espresso-950">
      <div className="grid lg:grid-cols-[1fr_1.05fr_0.95fr]">
        {/* esquerda — salão */}
        <div className="relative min-h-[380px] overflow-hidden lg:min-h-[620px]">
          <Image
            src="https://images.pexels.com/photos/35844834/pexels-photo-35844834.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Salão Lume com iluminação acolhedora à noite"
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            loading="lazy"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/85 via-espresso-950/20 to-espresso-950/30" />
          {/* marca na parede */}
          <div className="absolute right-6 top-6 text-right">
            <p className="font-serif text-2xl text-gold-200">Lume</p>
            <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-gold-200/70">
              Beleza que realça você
            </p>
          </div>
          <Reveal className="absolute bottom-6 left-5 right-5 sm:left-6 sm:right-auto" variant="scale">
            <div className="rounded-2xl border border-white/15 bg-espresso-950/70 px-6 py-5 shadow-lume-lg backdrop-blur-md sm:w-[220px]">
              <p className="text-[11px] font-semibold text-cream-50/70">Mais de</p>
              <p className="font-serif text-[2rem] leading-none text-cream-50">2.000</p>
              <p className="mt-1 text-[11.5px] font-semibold text-cream-50/80">clientes satisfeitas</p>
              <div className="mt-3 flex -space-x-2.5">
                {AVATARS.map((a) => (
                  <span
                    key={a.initials}
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${a.bg} text-[10px] font-bold text-white ring-2 ring-espresso-950`}
                  >
                    {a.initials}
                  </span>
                ))}
              </div>
              <div className="mt-2.5 flex gap-0.5" aria-label="Avaliação 5 de 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold-300 text-gold-300" />
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* centro — texto */}
        <div className="flex flex-col justify-center bg-cream-100 px-6 py-14 sm:px-10 lg:px-12 lg:py-16">
          <Reveal>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-rose-500">
              Por que escolher a Lume?
            </p>
            <h2 className="mt-3 font-serif text-[clamp(1.9rem,3.2vw,2.7rem)] font-medium leading-[1.1] text-espresso-900">
              Mais do que estética,
              <br />
              é sobre você
            </h2>
          </Reveal>
          <ul className="mt-8 space-y-4">
            {CHECKLIST.map(({ icon: Icon, text }, i) => (
              <Reveal as="li" key={text} delay={i * 80} className="flex items-center gap-3.5">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-400/90 text-cream-50 shadow-lume-sm">
                  <Icon className="h-[17px] w-[17px]" strokeWidth={1.8} />
                </span>
                <span className="text-[14px] font-semibold leading-snug text-espresso-800">{text}</span>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* direita — cliente */}
        <div className="relative min-h-[440px] overflow-hidden lg:min-h-[620px]">
          <Image
            src="https://images.pexels.com/photos/34775447/pexels-photo-34775447.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
            alt="Cliente sorrindo com a pele radiante após tratamento na Lume"
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            loading="lazy"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/45 via-transparent to-nude-200/25" />
          <p className="absolute right-6 top-6 rotate-[6deg] text-right font-script text-[1.7rem] leading-tight text-espresso-800 [text-shadow:0_1px_8px_rgba(255,253,249,0.8)]">
            Aqui é o
            <br />
            seu momento ♡
          </p>
          <Reveal className="absolute bottom-6 left-5 right-5" variant="scale" delay={150}>
            <div className="rounded-2xl bg-nude-200/90 p-5 shadow-lume-md backdrop-blur-md">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream-50/70 text-rose-500">
                  <Flower2 className="h-[18px] w-[18px]" strokeWidth={1.7} />
                </span>
                <div>
                  <p className="text-[13.5px] font-bold text-espresso-900">Beleza com propósito</p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-espresso-700">
                    Acreditamos que cuidar de si mesma é um ato de amor e que toda mulher merece se
                    sentir bem, todos os dias.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
