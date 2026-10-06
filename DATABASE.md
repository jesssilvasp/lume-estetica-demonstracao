# DATABASE.md — Lume Estética

## Engine
PostgreSQL via Drizzle ORM. Client em `src/db`, schema em `src/db/schema.ts`.
Compatível com futura migração para Supabase (mesmo Postgres).

## Tabelas (alvo)
```sql
categories(id, slug unique, name, tagline, image, sort)
services(id, category_id → categories, slug unique, name, description,
  price_cents, duration_min, image, featured bool, active bool)
professionals(id, name, role, avatar, bio, active bool)
service_professionals(service_id, professional_id)
appointments(id, service_id, professional_id, client_name, client_phone,
  starts_at, status: pending|confirmed|cancelled, notes, created_at)
testimonials(id, client_name, text, rating, treatment, approved bool)
faqs(id, question, answer, sort)
chat_logs(id, session_id, role, message, intent, created_at)
```

## Fase 1
- Schema criado, `drizzle-kit push` aplicado.
- Seed opcional de categorias/serviços (idempotente).
- Leitura da landing ainda via `src/data/*` (mock com mesmo contrato).
- Fase 2 liga o banco de verdade sem quebrar componentes.

## Comandos
- `npx drizzle-kit push` — aplica schema (sem migrations).
- `psql $DATABASE_URL -c "..."` — inspeção rápida.
