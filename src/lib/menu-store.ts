import { isVercelServerless } from "./server-paths";

export interface MenuStore {
    /** Returns JSON string or null when missing. */
    get(key: string): Promise<string | null>;
    set(key: string, value: string): Promise<void>;
}

async function createKvStore(): Promise<MenuStore | null> {
    // Only attempt KV on Vercel; locally most users won't have env vars set.
    if (!isVercelServerless()) return null;

    // @vercel/kv throws when env isn't configured.
    try {
        const { kv } = await import("@vercel/kv");
        // Smoke read to ensure configuration exists (won't create anything).
        await kv.get("spotcaffe:__kv_smoke__");
        return {
            async get(key) {
                const v = await kv.get<string>(key);
                return typeof v === "string" ? v : v == null ? null : JSON.stringify(v);
            },
            async set(key, value) {
                await kv.set(key, value);
            },
        };
    } catch {
        // Keep the app running, but be explicit in server logs so it's easy to diagnose
        // "admin edits don't persist" on Vercel.
        console.warn(
            "[menu-store] Vercel KV not configured. Falling back to ephemeral filesystem storage; admin changes may not persist across cold starts/regions."
        );
        return null;
    }
}

let storePromise: Promise<MenuStore | null> | null = null;

export async function getMenuStore(): Promise<MenuStore | null> {
    if (!storePromise) storePromise = createKvStore();
    return storePromise;
}

