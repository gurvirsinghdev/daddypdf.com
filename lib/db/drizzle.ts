import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const globalForDb = globalThis as unknown as {
  pool: Pool | undefined;
};

export const pool =
  globalForDb.pool ??
  new Pool({
    connectionString: process.env.SUPABASE_DATABASE_URL!,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.pool = pool;
}

export const db = drizzle(pool);

export type DbTransaction = Parameters<Parameters<typeof db.transaction>[0]>[0];
export type WithRlsCallback<T> = (tx: DbTransaction) => Promise<T>;

export async function withRls<T>(
  userId: string,
  callback: WithRlsCallback<T>,
): Promise<T> {
  return db.transaction(async (tx) => {
    const claims = JSON.stringify({ sub: userId, role: "authenticated" });

    await tx.execute(sql`select set_config('request.jwt.claims', ${claims}, true)`);
    await tx.execute(sql`select set_config('request.jwt.claim.sub', ${userId}, true)`);
    await tx.execute(
      sql`select set_config('request.jwt.claim.role', 'authenticated', true)`,
    );
    await tx.execute(sql`set local role authenticated`);
    await tx.execute(sql`select set_config('search_path', 'public, auth', true)`);

    return callback(tx);
  });
}
