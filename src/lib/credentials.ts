/**
 * Persisted admin credentials.
 *
 * When the admin updates the username / password from the Settings page we
 * store the result in durable storage (Redis/Blob on Vercel, or
 * data/admin-credentials.json locally). Passwords are salted + SHA-256 hashed.
 */

import { promises as fs } from "fs";
import path from "path";
import { createHash, randomBytes, timingSafeEqual } from "crypto";
import { adminCredentialsJsonPath, isVercelServerless } from "./server-paths";
import { CREDENTIALS_STORAGE_KEY, getMenuStore } from "./menu-store";
import { MenuPersistenceError } from "./menu-errors";

function credFile(): string {
    return adminCredentialsJsonPath();
}

export interface StoredCredentials {
    username: string;
    salt: string;
    passwordHash: string;
    updatedAt: string;
}

let cache: StoredCredentials | null = null;
let cacheReady = false;
let writeLock: Promise<void> = Promise.resolve();

function hashPassword(password: string, salt: string): string {
    return createHash("sha256").update(`${salt}:${password}`).digest("hex");
}

function parseStoredCredentials(raw: string): StoredCredentials | null {
    try {
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
        /* invalid */
    }
    return null;
}

async function loadFromDisk(): Promise<StoredCredentials | null> {
    const store = await getMenuStore();
    if (store) {
        const raw = await store.get(CREDENTIALS_STORAGE_KEY);
        if (!raw) return null;
        return parseStoredCredentials(raw);
    }

    if (isVercelServerless()) {
        return null;
    }

    try {
        const raw = await fs.readFile(credFile(), "utf-8");
        return parseStoredCredentials(raw);
    } catch {
        return null;
    }
}

export async function getStoredCredentials(): Promise<StoredCredentials | null> {
    if (cacheReady) return cache;
    cache = await loadFromDisk();
    cacheReady = true;
    return cache;
}

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
        const salt = randomBytes(16).toString("hex");
        const passwordHash = hashPassword(password, salt);
        const data: StoredCredentials = {
            username,
            salt,
            passwordHash,
            updatedAt: new Date().toISOString(),
        };
        const payload = JSON.stringify(data, null, 2);

        const store = await getMenuStore();
        if (store) {
            await store.set(CREDENTIALS_STORAGE_KEY, payload);
        } else if (isVercelServerless()) {
            throw new MenuPersistenceError(
                "On Vercel, add Upstash Redis or Vercel Blob in Project → Storage, connect it to this app, then redeploy."
            );
        } else {
            await fs.mkdir(path.dirname(credFile()), { recursive: true });
            await fs.writeFile(credFile(), payload, "utf-8");
        }

        cache = data;
        cacheReady = true;
        return data;
    } finally {
        release!();
    }
}

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
