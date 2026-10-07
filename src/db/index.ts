import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

function getPool(): Pool {
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required");
  }
  if (!globalForDb.__arenaNextJsPostgresqlPool) {
    globalForDb.__arenaNextJsPostgresqlPool = new Pool({
      connectionString: databaseUrl,
    });
  }
  return globalForDb.__arenaNextJsPostgresqlPool;
}

// Proxy preguiçoso: só conecta quando a query realmente executa.
// Permite `next build` na Vercel sem DATABASE_URL (Fase 1 usa mocks em src/data).
type Db = ReturnType<typeof drizzle>;
function getDb(): Db {
  return drizzle(getPool());
}

export const pool: Pool = new Proxy({} as Pool, {
  get(_target, prop) {
    return (getPool() as unknown as Record<PropertyKey, unknown>)[prop];
  },
});

export const db: Db = new Proxy({} as Db, {
  get(_target, prop) {
    return (getDb() as unknown as Record<PropertyKey, unknown>)[prop];
  },
});
