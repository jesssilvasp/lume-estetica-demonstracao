import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
};

export function SectionHeading({ eyebrow, title, align = "left", dark = false, className }: Props) {
  return (
    <Reveal className={cn(align === "center" && "text-center", className)}>
      <p
        className={cn(
          "text-[11px] font-bold uppercase tracking-[0.28em]",
          dark ? "text-nude-300" : "text-rose-500"
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-3 font-serif text-[clamp(1.9rem,3.6vw,2.9rem)] font-medium leading-[1.08] text-balance",
          dark ? "text-cream-50" : "text-espresso-900"
        )}
      >
        {title}
      </h2>
    </Reveal>
  );
}
