"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  CalendarCheck,
  List,
  Loader2,
  MessageCircle,
  Send,
  Sparkles,
  Tag,
  X,
} from "lucide-react";
import {
  LUNA_GREETING,
  LUNA_QUIZ,
  LUNA_RECOMMENDATIONS,
  LUNA_SHORTCUTS,
} from "@/data/luna-knowledge";
import { WHATSAPP_LINK, services } from "@/data/services";
import { formatBRL } from "@/lib/utils";
import type { LunaReply } from "@/lib/luna/types";
import { cn } from "@/lib/utils";

const SHORTCUT_ICONS: Record<string, typeof CalendarCheck> = {
  calendar: CalendarCheck,
  sparkles: Sparkles,
  list: List,
  tag: Tag,
  chat: MessageCircle,
};

type Msg = {
  id: number;
  role: "user" | "assistant";
  text: string;
  suggestions?: string[];
};

let idSeq = 1;
const nid = () => idSeq++;

/** Render seguro de **negrito** + quebras de linha (sem HTML cru). */
function Rich({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, li) => (
        <Fragment key={li}>
          {li > 0 && <br />}
          {line.split("**").map((part, pi) =>
            pi % 2 === 1 ? <strong key={pi} className="font-bold">{part}</strong> : <span key={pi}>{part}</span>
          )}
        </Fragment>
      ))}
    </>
  );
}

export function LunaChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { id: nid(), role: "assistant", text: LUNA_GREETING },
  ]);
  const [quiz, setQuiz] = useState<{ step: number; answers: string[] } | null>(null);
  const [recommendSlug, setRecommendSlug] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef(false);

  // Desktop XL: abre automaticamente para espelhar a referência visual
  useEffect(() => {
    if (window.matchMedia("(min-width: 1280px)").matches) setOpen(true);
  }, []);

  // API pública: window.dispatchEvent(new CustomEvent("luna:open", { detail: { message } }))
  useEffect(() => {
    const handler = (e: Event) => {
      const msg = (e as CustomEvent<{ message?: string }>).detail?.message;
      setOpen(true);
      if (msg) void sendMessage(msg);
    };
    window.addEventListener("luna:open", handler);
    return () => window.removeEventListener("luna:open", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, quiz, open]);

  const runAction = useCallback((action: LunaReply["action"]) => {
    if (!action) return;
    if (action.type === "open_booking") {
      window.dispatchEvent(
        new CustomEvent("lume:open-booking", { detail: { serviceSlug: action.serviceSlug } })
      );
    } else if (action.type === "open_whatsapp") {
      window.open(action.message ? `${WHATSAPP_LINK}&text=${encodeURIComponent(action.message)}` : WHATSAPP_LINK, "_blank");
    } else if (action.type === "scroll_to") {
      document.querySelector(action.target)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (action.type === "start_quiz") {
      setQuiz({ step: 0, answers: [] });
      setRecommendSlug(null);
    }
  }, []);

  const sendMessage = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || typing) return;
      abortRef.current = false;
      setHasInteracted(true);
      setQuiz(null);
      setRecommendSlug(null);
      setMessages((m) => [...m, { id: nid(), role: "user", text }]);
      setInput("");
      setTyping(true);
      try {
        const history = [...messages, { role: "user", content: text } as never].slice(-20);
        const res = await fetch("/api/luna/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, history }),
        });
        const data = (await res.json()) as LunaReply & { error?: string };
        if (abortRef.current) return;
        if (data.error) {
          setMessages((m) => [...m, { id: nid(), role: "assistant", text: data.error as string }]);
        } else {
          setMessages((m) => [
            ...m,
            { id: nid(), role: "assistant", text: data.reply, suggestions: data.suggestions },
          ]);
          // pequena pausa para a resposta ser lida antes da ação
          setTimeout(() => runAction(data.action), 450);
        }
      } catch {
        setMessages((m) => [
          ...m,
          {
            id: nid(),
            role: "assistant",
            text: "Ops, perdi a conexão por um instante 💕 Tente novamente ou fale com a equipe.",
            suggestions: ["Falar com a equipe"],
          },
        ]);
      } finally {
        setTyping(false);
      }
    },
    [messages, typing, runAction]
  );

  const answerQuiz = (value: string, label: string) => {
    if (!quiz) return;
    const answers = [...quiz.answers, value];
    setMessages((m) => [...m, { id: nid(), role: "user", text: label }]);
    if (quiz.step < LUNA_QUIZ.length - 1) {
      setQuiz({ step: quiz.step + 1, answers });
    } else {
      const key = `${answers[0]}:${answers[1]}`;
      const rec = LUNA_RECOMMENDATIONS[key];
      setQuiz(null);
      if (rec) {
        setRecommendSlug(rec.serviceSlug);
        setMessages((m) => [
          ...m,
          {
            id: nid(),
            role: "assistant",
            text: `${rec.text}\n\nQuer que eu verifique um horário para você? 💕`,
            suggestions: ["Quero agendar", "Consultar valores", "Falar com a equipe"],
          },
        ]);
      }
    }
  };

  const recommended = recommendSlug ? services.find((s) => s.slug === recommendSlug) : null;
  const showHeroPhoto = !hasInteracted && messages.length <= 1;

  return (
    <>
      {/* botão flutuante */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fechar assistente Luna" : "Abrir assistente Luna"}
        aria-expanded={open}
        className={cn(
          "group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lume-lg transition-all duration-300 hover:scale-105 sm:bottom-6 sm:right-6 sm:h-16 sm:w-16",
          open
            ? "bg-espresso-800 text-cream-50"
            : "bg-gradient-to-br from-nude-200 via-nude-300 to-rose-400 text-espresso-900"
        )}
      >
        {!open && (
          <span className="absolute inset-0 animate-ping rounded-full bg-rose-400/30 [animation-duration:2.5s]" aria-hidden="true" />
        )}
        <span className="relative">
          {open ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6 transition-transform duration-300 group-hover:rotate-12 sm:h-7 sm:w-7" />}
        </span>
        {!open && (
          <span className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-espresso-900 text-[11px] font-extrabold text-gold-200 ring-2 ring-cream-50">
            1
          </span>
        )}
      </button>

      {/* painel */}
      <div
        role="dialog"
        aria-label="Assistente virtual Luna"
        aria-hidden={!open}
        data-state={open ? "open" : "closed"}
        className={cn(
          "luna-panel fixed z-50 flex flex-col overflow-hidden rounded-[22px] bg-cream-50 shadow-lume-lg ring-1 ring-espresso-900/10",
          "inset-x-3 bottom-[76px] max-h-[75dvh] sm:inset-x-auto sm:bottom-24 sm:right-6 sm:h-[600px] sm:max-h-[calc(100dvh-130px)] sm:w-[360px]"
        )}
      >
        {/* header com foto (estado inicial, como na referência) */}
        {showHeroPhoto ? (
          <div className="relative h-[210px] shrink-0 overflow-hidden">
            <Image
              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800"
              alt="Luna, assistente virtual da Lume"
              fill
              sizes="360px"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/60 to-transparent" />
            <button
              onClick={() => setOpen(false)}
              aria-label="Fechar"
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-espresso-950/60 text-cream-50 backdrop-blur transition-colors hover:bg-espresso-950"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="absolute bottom-3 left-4 right-4">
              <p className="text-[14px] font-extrabold leading-snug text-white">
                Olá! Eu sou a Luna ✨<br />sua assistente de IA da Lume!
              </p>
            </div>
          </div>
        ) : (
          <div className="flex shrink-0 items-center gap-3 border-b border-espresso-900/8 bg-cream-50/95 px-4 py-3 backdrop-blur">
            <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-nude-300">
              <Image src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200" alt="Luna" fill sizes="44px" className="object-cover object-top" />
            </span>
            <span className="flex-1">
              <span className="block text-[14px] font-extrabold text-espresso-900">
                Luna ✨ <span className="font-script text-[15px] font-normal text-rose-500">online</span>
              </span>
              <span className="flex items-center gap-1.5 text-[11.5px] font-semibold text-espresso-500">
                <span className="h-2 w-2 animate-pulse-soft rounded-full bg-emerald-500" />
                Assistente virtual da Lume
              </span>
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Fechar conversa"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-espresso-900/5 text-espresso-700 transition-colors hover:bg-espresso-900/10"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* mensagens */}
        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
          {messages.map((m) => (
            <div key={m.id} className={cn("msg-in flex", m.role === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed",
                  m.role === "user"
                    ? "rounded-br-md bg-espresso-800 text-cream-50"
                    : "rounded-bl-md bg-white text-espresso-800 shadow-lume-sm ring-1 ring-espresso-900/5"
                )}
              >
                <Rich text={m.text} />
                {m.suggestions && m.suggestions.length > 0 && (
                  <span className="mt-2.5 flex flex-wrap gap-1.5">
                    {m.suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => void sendMessage(s)}
                        className="rounded-full border border-rose-400/40 bg-cream-50 px-3 py-1.5 text-[11.5px] font-bold text-espresso-800 transition-colors hover:bg-nude-200"
                      >
                        {s}
                      </button>
                    ))}
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* card de recomendação do quiz */}
          {recommended && (
            <div className="msg-in overflow-hidden rounded-2xl bg-white shadow-lume-sm ring-1 ring-espresso-900/5">
              <div className="relative h-28">
                <Image src={recommended.image} alt={recommended.name} fill sizes="320px" className="object-cover" />
                <span className="absolute bottom-2 left-3 rounded-full bg-cream-50/95 px-3 py-1 text-[12.5px] font-extrabold text-espresso-900">
                  {formatBRL(recommended.priceFrom)}
                </span>
              </div>
              <div className="p-3.5">
                <p className="text-[13.5px] font-extrabold text-espresso-900">{recommended.name}</p>
                <p className="text-[12px] text-espresso-600">{recommended.tagline}</p>
                <button
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("lume:open-booking", { detail: { serviceSlug: recommended.slug } })
                    )
                  }
                  className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-full bg-espresso-800 py-2.5 text-[12.5px] font-bold text-cream-50 transition-colors hover:bg-espresso-950"
                >
                  <CalendarCheck className="h-4 w-4" /> Agendar este tratamento
                </button>
              </div>
            </div>
          )}

          {/* quiz */}
          {quiz && (
            <div className="msg-in rounded-2xl bg-white p-4 shadow-lume-sm ring-1 ring-espresso-900/5">
              <p className="text-[13px] font-extrabold text-espresso-900">{LUNA_QUIZ[quiz.step].question}</p>
              <div className="mt-2.5 grid gap-2">
                {LUNA_QUIZ[quiz.step].answers.map((a) => (
                  <button
                    key={a.value}
                    onClick={() => answerQuiz(a.value, a.label)}
                    className="rounded-xl border border-espresso-900/10 bg-cream-50 px-3.5 py-2.5 text-left text-[12.5px] font-bold text-espresso-800 transition-all hover:border-rose-400/60 hover:bg-nude-200"
                  >
                    {a.label}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-center text-[11px] font-semibold text-espresso-500">
                {quiz.step + 1} de {LUNA_QUIZ.length}
              </p>
            </div>
          )}

          {typing && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-lume-sm ring-1 ring-espresso-900/5">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="typing-dot h-2 w-2 rounded-full bg-rose-400" />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* atalhos iniciais */}
        {showHeroPhoto && (
          <div className="shrink-0 space-y-2 px-4 pb-2">
            <p className="text-[12px] leading-relaxed text-espresso-600">
              Posso te ajudar a agendar um horário, tirar dúvidas sobre nossos serviços, informar
              valores e muito mais.
            </p>
            <div className="grid gap-1.5">
              {LUNA_SHORTCUTS.slice(0, 4).map((s) => {
                const Icon = SHORTCUT_ICONS[s.icon] ?? MessageCircle;
                return (
                  <button
                    key={s.id}
                    onClick={() => void sendMessage(s.label)}
                    className="flex items-center gap-2.5 rounded-full border border-espresso-900/12 bg-white px-4 py-2 text-left text-[12.5px] font-bold text-espresso-800 shadow-lume-sm transition-all hover:border-rose-400/60 hover:bg-nude-100"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-rose-500" />
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* input */}
        <form
          className="shrink-0 border-t border-espresso-900/8 bg-cream-50 p-3"
          onSubmit={(e) => {
            e.preventDefault();
            void sendMessage(input);
          }}
        >
          <div className="flex items-center gap-2 rounded-full bg-white py-1.5 pl-4 pr-1.5 shadow-lume-sm ring-1 ring-espresso-900/8 focus-within:ring-rose-400/60">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem..."
              aria-label="Digite sua mensagem para a Luna"
              maxLength={500}
              className="flex-1 bg-transparent text-[13px] text-espresso-900 outline-none placeholder:text-espresso-500/60"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              aria-label="Enviar mensagem"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-400 text-white transition-all hover:bg-rose-500 disabled:opacity-40"
            >
              {typing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
