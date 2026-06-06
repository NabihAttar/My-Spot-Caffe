import { execSync } from "node:child_process";
import {
    getMigrateDatabaseUrl,
    getRuntimeDatabaseUrl,
    isPlaceholderDatabaseUrl,
} from "../src/lib/database-env";

const migrateUrl = getMigrateDatabaseUrl();
const runtimeUrl = getRuntimeDatabaseUrl();

if (!migrateUrl) {
    console.error(`
[vercel-build] No PostgreSQL connection found.

Fix on Vercel:
  1. Storage → Create Database → Postgres → Connect to this project
  2. Delete DATABASE_URL if it still contains "@HOST:5432" (placeholder from .env.example)
  3. Redeploy — Vercel injects POSTGRES_* variables automatically

Or set DATABASE_URL to a real connection string in Project → Settings → Environment Variables.
`);
    process.exit(1);
}

if (process.env.DATABASE_URL && isPlaceholderDatabaseUrl(process.env.DATABASE_URL)) {
    console.warn(
        "[vercel-build] DATABASE_URL is a placeholder; using Vercel Postgres variables instead."
    );
}

execSync("npx prisma migrate deploy", {
    stdio: "inherit",
    env: { ...process.env, DATABASE_URL: migrateUrl },
});

if (runtimeUrl) {
    process.env.DATABASE_URL = runtimeUrl;
}
