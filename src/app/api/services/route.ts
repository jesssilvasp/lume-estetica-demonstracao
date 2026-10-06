import { services, spotlights } from "@/data/services";
import { NextResponse } from "next/server";

/**
 * GET /api/services — contrato estável.
 * Fase 1: serve o mock tipado. Fase 2: lê do PostgreSQL sem quebrar o contrato.
 */
export async function GET() {
  return NextResponse.json(
    { services, spotlights },
    { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } }
  );
}
