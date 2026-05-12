/**
 * Persisted admin credentials.
 *
 * When the admin updates the username / password from the Settings page we
 * store the result in `data/admin-credentials.json`. Passwords are salted +
 * SHA-256 hashed; the plain-text value is never written to disk.
 *
 * If the file does not exist the auth layer falls back to the ADMIN_USERNAME
 * and ADMIN_PASSWORD environment variables (existing behavior preserved).
 */

import { promises as fs } from "fs";
import path from "path";
import { createHash, randomBytes, timingSafeEqual } from "crypto";

const DATA_DIR = path.join(process.cwd(), "data");
const CRED_FILE = path.join(DATA_DIR, "admin-credentials.json");

export interface StoredCredentials {
    username: string;
    salt: string;          // hex
    passwordHash: string;  // hex(sha256(salt + password))
    updatedAt: string;     // ISO timestamp
}

// Lightweight in-memory cache to avoid hitting the disk on every login.
let cache: StoredCredentials | null = null;
let cacheReady = false;
let writeLock: Promise<void> = Promise.resolve();

function hashPassword(password: string, salt: string): string {
    return createHash("sha256").update(`${salt}:${password}`).digest("hex");
}

async function loadFromDisk(): Promise<StoredCredentials | null> {
    try {
        const raw = await fs.readFile(CRED_FILE, "utf-8");
        const parsed = JSON.parse(raw) as Partial<StoredCredentials>;
        if (
            typeof parsed.username === "string" &&
            typeof parsed.salt === "string" &&
            typeof parsed.passwordHash === "string"
        ) {
            return {
                username: parsed.username,
                salt: parsed.salt,
                passwordHash: parsed.passwordHash,
                updatedAt: parsed.updatedAt ?? new Date(0).toISOString(),
            };
        }
    } catch {
        // file missing or invalid → use env-var fallback
    }
    return null;
}

/** Read the stored credentials (cached). Returns null when the file is missing. */
export async function getStoredCredentials(): Promise<StoredCredentials | null> {
    if (cacheReady) return cache;
    cache = await loadFromDisk();
    cacheReady = true;
    return cache;
}

/** Persist new credentials, overwriting any previous file. */
export async function saveCredentials(
    username: string,
    password: string
): Promise<StoredCredentials> {
    const previous = writeLock;
    let release: () => void;
    writeLock = new Promise<void>((resolve) => {
        release = resolve;
    });
    await previous;
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
        const salt = randomBytes(16).toString("hex");
        const passwordHash = hashPassword(password, salt);
        const data: StoredCredentials = {
            username,
            salt,
            passwordHash,
            updatedAt: new Date().toISOString(),
        };
        await fs.writeFile(CRED_FILE, JSON.stringify(data, null, 2), "utf-8");
        cache = data;
        cacheReady = true;
        return data;
    } finally {
        release!();
    }
}

/** Timing-safe password verification against a stored credential record. */
export function verifyStoredPassword(
    stored: StoredCredentials,
    password: string
): boolean {
    const candidate = hashPassword(password, stored.salt);
    const a = Buffer.from(candidate, "hex");
    const b = Buffer.from(stored.passwordHash, "hex");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
}
