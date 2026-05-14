/**
 * Writable paths for file-backed admin data.
 *
 * On Vercel (and most serverless hosts) the project directory is read-only.
 * Writes to `data/menu.json` fail, API routes throw, and the browser sees an
 * empty or HTML error body — `res.json()` then throws "Unexpected end of JSON".
 *
 * We store JSON under `os.tmpdir()` when `VERCEL=1` so reads/writes succeed.
 * Note: /tmp survives across warm invocations but can reset on cold starts or
 * new regions; for durable production storage use a database or Vercel Blob / KV.
 */

import os from "node:os";
import path from "node:path";

export function isVercelServerless(): boolean {
    return process.env.VERCEL === "1";
}

/** Menu JSON file (seeded from public seed on first read). */
export function menuJsonPath(): string {
    if (isVercelServerless()) {
        return path.join(os.tmpdir(), "spotcaffe-menu.json");
    }
    return path.join(process.cwd(), "data", "menu.json");
}

/** Optional persisted admin credentials (hashed password). */
export function adminCredentialsJsonPath(): string {
    if (isVercelServerless()) {
        return path.join(os.tmpdir(), "spotcaffe-admin-credentials.json");
    }
    return path.join(process.cwd(), "data", "admin-credentials.json");
}
