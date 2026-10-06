# SECURITY.md — Lume Estética

## Princípios
- Segredos só no servidor (`process.env.*`). Cliente: apenas `NEXT_PUBLIC_*`.
- Chamadas externas com chave → via route handler `/api/*` (proxy server-side).
- Nunca logar PII (nome, telefone) em console em produção.
- Validar todo input de API (tipos + limites de tamanho).

## Chat Luna
- `POST /api/luna/chat`: limite de mensagem (500 chars), histórico máx 20 msgs.
- Rate-limit simples em memória (Fase 1) → Redis/Upstash (Fase 3).
- Sanitizar saída antes de renderizar (sem `dangerouslySetInnerHTML` com input cru).
- `chat_logs` sem dados sensíveis além do necessário.

## Agendamentos
- Telefone validado (E.164 BR). Nomes escapados contra XSS/SQLi (Drizzle parametriza).
- Status default `pending`; confirmação só pela equipe.

## Headers & deploy
- `next.config`: `poweredByHeader: false`, imagens remotas só de domínios allowlist
  (`images.pexels.com`).
- HTTPS obrigatório; cookies `HttpOnly; Secure; SameSite=Lax` quando existirem.
