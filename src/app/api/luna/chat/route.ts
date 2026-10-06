import { think } from "@/lib/luna/brain";
import type { ChatMessage } from "@/lib/luna/types";
import { NextResponse } from "next/server";

/** Rate-limit simples em memória (Fase 1). Fase 3: migrar para Redis. */
const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_HITS = 30;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_HITS;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: "Muitas mensagens. Tente novamente em instantes." },
        { status: 429 }
      );
    }

    const body = (await req.json()) as { message?: unknown; history?: unknown };
    if (typeof body.message !== "string" || !body.message.trim()) {
      return NextResponse.json({ error: "Mensagem inválida." }, { status: 400 });
    }
    const message = body.message.trim().slice(0, 500);
    const history = (Array.isArray(body.history) ? body.history : []).filter(
      (m): m is ChatMessage =>
        typeof m === "object" &&
        m !== null &&
        ((m as ChatMessage).role === "user" || (m as ChatMessage).role === "assistant") &&
        typeof (m as ChatMessage).content === "string"
    ).slice(-20);

    const result = await think(message, history);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Algo saiu do ar por aqui. Tente novamente ou fale com a equipe. 💕" },
      { status: 500 }
    );
  }
}
