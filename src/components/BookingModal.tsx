"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarCheck, Check, Loader2, X } from "lucide-react";
import { WHATSAPP_LINK, services } from "@/data/services";
import { formatBRL } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./icons";

const PROFESSIONALS = [
  { id: "any", name: "Primeira disponível", role: "Agiliza sua confirmação" },
  { id: "ana", name: "Ana Beatriz", role: "Esteticista facial" },
  { id: "camila", name: "Camila Duarte", role: "Hair stylist" },
  { id: "renata", name: "Renata Lima", role: "Massoterapeuta" },
];

const PERIODS = [
  { id: "manha", label: "Manhã · 9h–12h" },
  { id: "tarde", label: "Tarde · 13h–17h" },
  { id: "noite", label: "Noite · 18h–20h" },
];

const STEPS = ["Serviço", "Data", "Seus dados", "Pronto"];

type State = {
  serviceSlug: string;
  professionalId: string;
  date: string;
  period: string;
  name: string;
  phone: string;
};

const initial: State = {
  serviceSlug: "",
  professionalId: "any",
  date: "",
  period: "",
  name: "",
  phone: "",
};

export function BookingModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<State>(initial);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const slug = (e as CustomEvent<{ serviceSlug?: string }>).detail?.serviceSlug;
      setForm({ ...initial, serviceSlug: slug ?? "" });
      setStep(slug ? 1 : 0);
      setConfirmation(null);
      setError(null);
      setOpen(true);
      document.body.style.overflow = "hidden";
    };
    window.addEventListener("lume:open-booking", handler);
    return () => window.removeEventListener("lume:open-booking", handler);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  const service = useMemo(
    () => services.find((s) => s.slug === form.serviceSlug),
    [form.serviceSlug]
  );
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const canNext =
    step === 0 ? !!form.serviceSlug : step === 1 ? !!form.date && !!form.period : !!form.name.trim() && form.phone.replace(/\D/g, "").length >= 10;

  const submit = async () => {
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { message?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Falha ao registrar.");
      setConfirmation(data.message ?? "Pedido recebido!");
      setStep(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Tente novamente.");
    } finally {
      setSending(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-espresso-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Agendar horário"
    >
      <div
        className="max-h-[92dvh] w-full max-w-[560px] overflow-y-auto rounded-t-[26px] bg-cream-50 p-6 shadow-lume-lg sm:rounded-[26px] sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-rose-500">
              Agendamento
            </p>
            <h2 className="mt-1 font-serif text-[1.7rem] leading-tight text-espresso-900">
              {step === 3 ? "Pedido recebido! ✨" : "Agende seu horário"}
            </h2>
          </div>
          <button
            onClick={close}
            aria-label="Fechar agendamento"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-espresso-900/5 text-espresso-700 transition-colors hover:bg-espresso-900/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* progresso */}
        <ol className="mt-5 flex items-center gap-1.5" aria-label="Etapas do agendamento">
          {STEPS.map((label, i) => (
            <li key={label} className="flex flex-1 items-center gap-1.5">
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-extrabold transition-colors",
                  i < step ? "bg-emerald-500 text-white" : i === step ? "bg-espresso-800 text-cream-50" : "bg-espresso-900/10 text-espresso-500"
                )}
              >
                {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <span className={cn("hidden text-[11.5px] font-bold sm:block", i === step ? "text-espresso-900" : "text-espresso-500/70")}>
                {label}
              </span>
              {i < STEPS.length - 1 && <span className="mx-1 h-px flex-1 bg-espresso-900/10" />}
            </li>
          ))}
        </ol>

        <div className="mt-6">
          {step === 0 && (
            <div className="grid max-h-[46dvh] gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
              {services.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => setForm((f) => ({ ...f, serviceSlug: s.slug }))}
                  aria-pressed={form.serviceSlug === s.slug}
                  className={cn(
                    "rounded-2xl border-2 p-3.5 text-left transition-all",
                    form.serviceSlug === s.slug
                      ? "border-espresso-800 bg-nude-200/60"
                      : "border-espresso-900/10 bg-white hover:border-rose-400/50"
                  )}
                >
                  <span className="block text-[13.5px] font-extrabold text-espresso-900">{s.name}</span>
                  <span className="mt-0.5 block text-[12px] text-espresso-600">{s.tagline}</span>
                  <span className="mt-1.5 block text-[12.5px] font-bold text-rose-500">
                    {formatBRL(s.priceFrom)} · {s.durationMin} min
                  </span>
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label htmlFor="bk-date" className="text-[13px] font-extrabold text-espresso-900">
                  Escolha o dia
                </label>
                <input
                  id="bk-date"
                  type="date"
                  min={today}
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-espresso-900/15 bg-white px-4 py-3 text-[14px] font-semibold text-espresso-900 outline-none focus:border-rose-400"
                />
              </div>
              <div>
                <p className="text-[13px] font-extrabold text-espresso-900">Período preferido</p>
                <div className="mt-2 grid gap-2 sm:grid-cols-3">
                  {PERIODS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setForm((f) => ({ ...f, period: p.id }))}
                      aria-pressed={form.period === p.id}
                      className={cn(
                        "rounded-2xl border-2 px-3 py-3 text-[12.5px] font-bold transition-all",
                        form.period === p.id
                          ? "border-espresso-800 bg-nude-200/60 text-espresso-900"
                          : "border-espresso-900/10 bg-white text-espresso-700 hover:border-rose-400/50"
                      )}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[13px] font-extrabold text-espresso-900">Profissional</p>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {PROFESSIONALS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setForm((f) => ({ ...f, professionalId: p.id }))}
                      aria-pressed={form.professionalId === p.id}
                      className={cn(
                        "rounded-2xl border-2 px-3.5 py-2.5 text-left transition-all",
                        form.professionalId === p.id
                          ? "border-espresso-800 bg-nude-200/60"
                          : "border-espresso-900/10 bg-white hover:border-rose-400/50"
                      )}
                    >
                      <span className="block text-[13px] font-extrabold text-espresso-900">{p.name}</span>
                      <span className="block text-[11.5px] text-espresso-600">{p.role}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              {service && (
                <div className="rounded-2xl bg-nude-200/60 px-4 py-3 text-[13px] font-semibold text-espresso-800">
                  {service.name} · {form.date.split("-").reverse().join("/")} ·{" "}
                  {PERIODS.find((p) => p.id === form.period)?.label}
                </div>
              )}
              <div>
                <label htmlFor="bk-name" className="text-[13px] font-extrabold text-espresso-900">
                  Seu nome
                </label>
                <input
                  id="bk-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Como podemos te chamar?"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-espresso-900/15 bg-white px-4 py-3 text-[14px] text-espresso-900 outline-none placeholder:text-espresso-500/50 focus:border-rose-400"
                />
              </div>
              <div>
                <label htmlFor="bk-phone" className="text-[13px] font-extrabold text-espresso-900">
                  WhatsApp
                </label>
                <input
                  id="bk-phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="(11) 99999-9999"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-espresso-900/15 bg-white px-4 py-3 text-[14px] text-espresso-900 outline-none placeholder:text-espresso-500/50 focus:border-rose-400"
                />
              </div>
              {error && (
                <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-[13px] font-semibold text-red-700">
                  {error}
                </p>
              )}
            </div>
          )}

          {step === 3 && confirmation && (
            <div className="text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <Check className="h-8 w-8" />
              </span>
              <p className="mx-auto mt-4 max-w-[400px] text-[14px] leading-relaxed text-espresso-700">
                {confirmation}
              </p>
              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25d366] px-7 py-3 text-[13.5px] font-bold text-white transition-transform hover:scale-[1.02]"
                >
                  <WhatsAppIcon className="h-5 w-5" /> Confirmar no WhatsApp
                </a>
                <button
                  onClick={close}
                  className="rounded-full border border-espresso-900/15 px-7 py-3 text-[13.5px] font-bold text-espresso-800 transition-colors hover:bg-espresso-900/5"
                >
                  Fechar
                </button>
              </div>
            </div>
          )}
        </div>

        {step < 3 && (
          <div className="mt-7 flex items-center justify-between gap-3">
            <button
              onClick={() => (step === 0 ? close() : setStep((s) => s - 1))}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-3 text-[13.5px] font-bold text-espresso-600 transition-colors hover:text-espresso-900"
            >
              <ArrowLeft className="h-4 w-4" /> {step === 0 ? "Cancelar" : "Voltar"}
            </button>
            {step < 2 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canNext}
                className="inline-flex items-center gap-2 rounded-full bg-espresso-800 px-8 py-3 text-[13.5px] font-bold text-cream-50 transition-all hover:bg-espresso-950 disabled:opacity-40"
              >
                Continuar <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={!canNext || sending}
                className="inline-flex items-center gap-2 rounded-full bg-espresso-800 px-8 py-3 text-[13.5px] font-bold text-cream-50 transition-all hover:bg-espresso-950 disabled:opacity-40"
              >
                {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarCheck className="h-4 w-4" />}
                {sending ? "Enviando..." : "Confirmar pedido"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
