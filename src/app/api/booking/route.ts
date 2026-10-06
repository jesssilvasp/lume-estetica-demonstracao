import { NextResponse } from "next/server";

/**
 * POST /api/booking — Fase 1: valida e registra a intenção de agendamento.
 * Fase 2: persiste em `appointments` e consulta disponibilidade real.
 * Nunca inventa disponibilidade: retorna status `pending` + orientação de confirmação.
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const serviceSlug = typeof body.serviceSlug === "string" ? body.serviceSlug : "";
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 80) : "";
    const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 20) : "";
    const date = typeof body.date === "string" ? body.date : "";
    const period = typeof body.period === "string" ? body.period : "";

    if (!serviceSlug || !name || !phone) {
      return NextResponse.json(
        { error: "Informe serviço, nome e telefone para continuar." },
        { status: 400 }
      );
    }
    if (!/^[\d\s()+.-]{8,20}$/.test(phone)) {
      return NextResponse.json({ error: "Telefone inválido." }, { status: 400 });
    }

    return NextResponse.json({
      status: "pending",
      message: `Obrigada, ${name.split(" ")[0]}! 💕 Recebemos seu pedido de ${serviceSlug}${date ? ` para ${date}` : ""}${period ? ` (${period})` : ""}. Nossa equipe vai confirmar o horário pelo WhatsApp em instantes.`,
      booking: { serviceSlug, name, phone, date, period },
    });
  } catch {
    return NextResponse.json({ error: "Não foi possível registrar. Tente pelo WhatsApp." }, { status: 500 });
  }
}
