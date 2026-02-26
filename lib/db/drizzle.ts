import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

export const createDrizzleClient = () => {
  const postgresClient = postgres(process.env.SUPABASE_DATABASE_URL!);
  return drizzle(postgresClient);
};
