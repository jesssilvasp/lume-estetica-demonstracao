import Image from "next/image";
import { InstagramIcon } from "./icons";
import { galleryImages } from "@/data/services";
import { site } from "@/data/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Gallery() {
  return (
    <section aria-label="Galeria" className="bg-espresso-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Nosso universo"
            title="Um espaço feito para você"
            dark
            className="max-w-[440px]"
          />
          <Reveal delay={120}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-2.5 text-[13px] font-bold text-cream-50 transition-all duration-300 hover:border-gold-300 hover:text-gold-200"
            >
              <InstagramIcon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              {site.instagram}
            </a>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {galleryImages.map((img, i) => (
            <Reveal
              key={img.src}
              delay={(i % 3) * 90}
              variant="scale"
              className={i === 0 ? "row-span-2" : undefined}
            >
              <div className="group relative h-full min-h-[190px] overflow-hidden rounded-[18px] sm:min-h-[240px] lg:min-h-[260px]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
