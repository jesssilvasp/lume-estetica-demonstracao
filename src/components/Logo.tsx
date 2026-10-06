import { cn } from "@/lib/utils";

export function LotusMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 40" fill="none" className={cn("h-9 w-10", className)} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 4c3.5 4.5 3.5 10 0 14.5C20.5 14 20.5 8.5 24 4Z" />
        <path d="M24 18.5C19 16 13 16.5 9.5 20c3 4 9 5.5 14.5 3.5C29.5 25.5 35.5 24 38.5 20c-3.5-3.5-9.5-4-14.5-1.5Z" />
        <path d="M12 27.5c3.5 4.5 7.5 6.5 12 6.5s8.5-2 12-6.5c-3.5 1-7.5 1.5-12 1.5s-8.5-.5-12-1.5Z" />
      </g>
    </svg>
  );
}

export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <a href="#inicio" className={cn("group flex items-center gap-2.5", className)} aria-label="Lume Estética — início">
      <span className={dark ? "text-espresso-800" : "text-nude-200"}>
        <LotusMark className="h-8 w-9 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105" />
      </span>
      <span className="leading-none">
        <span
          className={cn(
            "block font-serif text-[1.7rem] font-medium tracking-wide",
            dark ? "text-espresso-900" : "text-cream-50"
          )}
        >
          Lume
        </span>
        <span
          className={cn(
            "mt-1 block text-[0.55rem] font-semibold uppercase tracking-[0.28em]",
            dark ? "text-espresso-500" : "text-nude-200/80"
          )}
        >
          Beleza que realça você
        </span>
      </span>
    </a>
  );
}
