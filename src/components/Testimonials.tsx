import { Quote, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Testimonials() {
  return (
    <section id="depoimentos" className="scroll-mt-20 bg-cream-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Depoimentos"
            title="Quem vive a Lume, recomenda"
            className="max-w-[480px]"
          />
          <Reveal delay={120}>
            <div className="flex items-center gap-4 rounded-2xl bg-cream-100 px-6 py-4 shadow-lume-card ring-1 ring-espresso-900/5">
              <p className="font-serif text-[2.6rem] leading-none text-espresso-900">4.9</p>
              <div>
                <div className="flex gap-0.5" aria-label="4.9 de 5 estrelas">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="mt-1 text-[12px] font-semibold text-espresso-600">
                  480+ avaliações verificadas
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 90} variant="scale">
              <figure className="flex h-full flex-col rounded-[22px] bg-cream-100 p-6 shadow-lume-card ring-1 ring-espresso-900/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-lume-md">
                <Quote className="h-7 w-7 text-rose-400/70" aria-hidden="true" />
                <blockquote className="mt-3 flex-1 text-[13.5px] leading-relaxed text-espresso-700">
                  “{t.text}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-espresso-900/8 pt-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-gold-400 text-[13px] font-extrabold text-white">
                    {t.initials}
                  </span>
                  <span className="flex-1">
                    <span className="block text-[13.5px] font-bold text-espresso-900">{t.name}</span>
                    <span className="block text-[12px] text-espresso-500">{t.treatment}</span>
                  </span>
                  <span className="flex gap-0.5" aria-label={`${t.rating} de 5`}>
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                    ))}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
