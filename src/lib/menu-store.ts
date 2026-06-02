import { isVercelServerless } from "./server-paths";

export const MENU_STORAGE_KEY = "spotcaffe:menu";
export const CREDENTIALS_STORAGE_KEY = "spotcaffe:admin-credentials";
export const MENU_BLOB_PATHNAME = "spotcaffe/menu.json";
export const CREDENTIALS_BLOB_PATHNAME = "spotcaffe/admin-credentials.json";

export type StorageBackend = "redis" | "blob" | "filesystem";

export interface MenuStore {
    backend: StorageBackend;
    get(key: string): Promise<string | null>;
    set(key: string, value: string): Promise<void>;
}

function redisEnv(): { url: string; token: string } | null {
    const url =
        process.env.UPSTASH_REDIS_REST_URL?.trim() ||
        process.env.KV_REST_API_URL?.trim();
    const token =
        process.env.UPSTASH_REDIS_REST_TOKEN?.trim() ||
        process.env.KV_REST_API_TOKEN?.trim();
    if (url && token) return { url, token };
    return null;
}

function blobToken(): string | null {
    return process.env.BLOB_READ_WRITE_TOKEN?.trim() || null;
}

function blobPathForKey(key: string): string {
    if (key === MENU_STORAGE_KEY) return MENU_BLOB_PATHNAME;
    if (key === CREDENTIALS_STORAGE_KEY) return CREDENTIALS_BLOB_PATHNAME;
    return `spotcaffe/${key.replace(/:/g, "-")}.json`;
}

async function createRedisStore(): Promise<MenuStore | null> {
    const cfg = redisEnv();
    if (!cfg) return null;

    try {
        const { Redis } = await import("@upstash/redis");
        const redis = new Redis({ url: cfg.url, token: cfg.token });
        await redis.ping();

        return {
            backend: "redis",
            async get(key) {
                const value = await redis.get<string>(key);
                if (value == null) return null;
                return typeof value === "string" ? value : JSON.stringify(value);
            },
            async set(key, value) {
                await redis.set(key, value);
            },
        };
    } catch (err) {
        console.error("[menu-store] Redis unavailable:", err);
        return null;
    }
}

async function createBlobStore(): Promise<MenuStore | null> {
    const token = blobToken();
    if (!token) return null;

    try {
        const { list, put } = await import("@vercel/blob");

        return {
            backend: "blob",
            async get(key) {
                const pathname = blobPathForKey(key);
                const { blobs } = await list({
                    prefix: pathname,
                    limit: 10,
                    token,
                });
                const blob = blobs.find((entry) => entry.pathname === pathname);
                if (!blob) return null;
                const res = await fetch(blob.url, { cache: "no-store" });
                if (!res.ok) return null;
                return res.text();
            },
            async set(key, value) {
                const pathname = blobPathForKey(key);
                await put(pathname, value, {
                    access: "public",
                    token,
                    addRandomSuffix: false,
                    allowOverwrite: true,
                    contentType: "application/json",
                });
            },
        };
    } catch (err) {
        console.error("[menu-store] Blob unavailable:", err);
        return null;
    }
}

let storePromise: Promise<MenuStore | null> | null = null;

export async function getMenuStore(): Promise<MenuStore | null> {
    if (!storePromise) {
        storePromise = (async () => {
            const redis = await createRedisStore();
            if (redis) return redis;

            const blob = await createBlobStore();
            if (blob) return blob;

            if (isVercelServerless()) {
                console.warn(
                    "[menu-store] Persistent storage is not configured on Vercel. " +
                        "Add Upstash Redis or Vercel Blob in Project → Storage, then redeploy."
                );
            }
            return null;
        })();
    }
    return storePromise;
}

export async function getStorageStatus(): Promise<{
    persistent: boolean;
    backend: StorageBackend | null;
    vercel: boolean;
    message: string;
    setupRequired: boolean;
}> {
    const store = await getMenuStore();
    const vercel = isVercelServerless();

    if (store) {
        const label = store.backend === "redis" ? "Upstash Redis" : "Vercel Blob";
        return {
            persistent: true,
            backend: store.backend,
            vercel,
            setupRequired: false,
            message: `Menu changes are saved permanently using ${label}.`,
        };
    }

    if (vercel) {
        return {
            persistent: false,
            backend: null,
            vercel,
            setupRequired: true,
            message:
                "Admin saves do not persist on Vercel yet. Add Upstash Redis or Vercel Blob in your Vercel project Storage tab, connect it to this project, then redeploy.",
        };
    }

    return {
        persistent: true,
        backend: "filesystem",
        vercel,
        setupRequired: false,
        message: "Menu changes are saved to data/menu.json on this machine.",
    };
}
