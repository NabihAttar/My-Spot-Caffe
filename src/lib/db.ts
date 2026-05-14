/**
 * Tiny file-backed JSON "database" for the menu.
 *
 * We intentionally avoid adding a real DB dependency (sqlite, prisma, etc.).
 * Instead we persist the menu in `data/menu.json` locally (or under
 * `os.tmpdir()` on Vercel — see `server-paths.ts`) and
 * seed it on first read from the existing FoodCartV4Data.json so the public
 * menu and QR menu continue to work even before any admin edit happens.
 *
 * All access goes through readMenu / writeMenu so we have a single source
 * of truth and a simple in-memory write lock to avoid concurrent writes
 * corrupting the file.
 */

import { promises as fs } from "fs";
import path from "path";
import type { Menu, Category, Product } from "./menu-types";
import { menuJsonPath } from "./server-paths";

function dataFile(): string {
    return menuJsonPath();
}

function dataDir(): string {
    return path.dirname(dataFile());
}
const SEED_FILE = path.join(
    process.cwd(),
    "public",
    "assets",
    "jsonData",
    "food",
    "FoodCartV4Data.json"
);

let writeLock: Promise<void> = Promise.resolve();

async function ensureDataFile(): Promise<void> {
    const DATA_FILE = dataFile();
    try {
        await fs.access(DATA_FILE);
    } catch {
        // Seed from the existing JSON used by the public menu so first run is consistent.
        await fs.mkdir(dataDir(), { recursive: true });
        let seed: Menu = [];
        try {
            const raw = await fs.readFile(SEED_FILE, "utf-8");
            seed = JSON.parse(raw) as Menu;
        } catch {
            seed = [];
        }
        // Normalize seed with admin-friendly defaults.
        const now = new Date().toISOString();
        seed = seed.map((cat, idx) => ({
            ...cat,
            order: cat.order ?? idx,
            hidden: cat.hidden ?? false,
            createdAt: cat.createdAt ?? now,
            updatedAt: cat.updatedAt ?? now,
            tabContent: (cat.tabContent ?? []).map((group) => ({
                ...group,
                tabData: (group.tabData ?? []).map((p, pIdx) => ({
                    ...p,
                    order: p.order ?? pIdx,
                    available: p.available ?? true,
                    featured: p.featured ?? false,
                    tags: p.tags ?? [],
                    createdAt: p.createdAt ?? now,
                    updatedAt: p.updatedAt ?? now,
                })),
            })),
        }));
        await fs.writeFile(DATA_FILE, JSON.stringify(seed, null, 2), "utf-8");
    }
}

/**
 * One-shot migration: the original seed data used per-category product IDs
 * (each category started its products at id 1). That made the IDs non-unique
 * globally, which:
 *   - made findProduct(id) ambiguous, and
 *   - caused React "duplicate key" warnings on any list that flattens
 *     products across categories (admin dashboard / products table).
 *
 * This function detects duplicates and renumbers them in place. It returns
 * `true` if anything changed so the caller can persist the corrected file.
 */
function migrateMenu(menu: Menu): boolean {
    let changed = false;

    // 1. Globally-unique product IDs.
    let maxProductId = 0;
    for (const cat of menu) {
        for (const group of cat.tabContent ?? []) {
            for (const p of group.tabData ?? []) {
                if (typeof p.id === "number" && p.id > maxProductId) {
                    maxProductId = p.id;
                }
            }
        }
    }
    const seenProductIds = new Set<number>();
    let nextProductIdLocal = maxProductId + 1;
    for (const cat of menu) {
        for (const group of cat.tabContent ?? []) {
            for (const p of group.tabData ?? []) {
                if (typeof p.id !== "number" || seenProductIds.has(p.id)) {
                    p.id = nextProductIdLocal++;
                    changed = true;
                }
                seenProductIds.add(p.id);
            }
        }
    }

    // 2. Globally-unique category IDs (defensive — should already be unique).
    const seenCategoryIds = new Set<number>();
    let nextCategoryIdLocal =
        menu.reduce((m, c) => Math.max(m, c.id || 0), 0) + 1;
    for (const cat of menu) {
        if (typeof cat.id !== "number" || seenCategoryIds.has(cat.id)) {
            cat.id = nextCategoryIdLocal++;
            cat.tabId = `tab${cat.id}`;
            changed = true;
        }
        seenCategoryIds.add(cat.id);
    }

    return changed;
}

export async function readMenu(): Promise<Menu> {
    await ensureDataFile();
    const DATA_FILE = dataFile();
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    let menu: Menu;
    try {
        menu = JSON.parse(raw) as Menu;
    } catch {
        return [];
    }
    if (migrateMenu(menu)) {
        // Persist fixed IDs so future reads are stable. Fire-and-forget is
        // fine — even if the write fails we still return correct data for
        // this request and the next read will retry.
        writeMenu(menu).catch(() => {
            /* ignore */
        });
    }
    return menu;
}

export async function writeMenu(menu: Menu): Promise<void> {
    // Serialize writes via a chained promise lock.
    const previous = writeLock;
    let release: () => void;
    writeLock = new Promise<void>((resolve) => {
        release = resolve;
    });
    await previous;
    try {
        await fs.mkdir(dataDir(), { recursive: true });
        await fs.writeFile(dataFile(), JSON.stringify(menu, null, 2), "utf-8");
    } finally {
        release!();
    }
}

// ---------- Convenience helpers used by the API routes ----------

export function nextCategoryId(menu: Menu): number {
    return menu.reduce((max, c) => Math.max(max, c.id), 0) + 1;
}

export function nextProductId(menu: Menu): number {
    let max = 0;
    for (const cat of menu) {
        for (const group of cat.tabContent ?? []) {
            for (const p of group.tabData ?? []) {
                if (p.id > max) max = p.id;
            }
        }
    }
    return max + 1;
}

export function findCategory(menu: Menu, id: number): Category | undefined {
    return menu.find((c) => c.id === id);
}

export function findProduct(
    menu: Menu,
    productId: number
): { product: Product; category: Category } | undefined {
    for (const category of menu) {
        for (const group of category.tabContent ?? []) {
            const product = (group.tabData ?? []).find((p) => p.id === productId);
            if (product) return { product, category };
        }
    }
    return undefined;
}

export function ensureGroup(category: Category): void {
    if (!category.tabContent || category.tabContent.length === 0) {
        category.tabContent = [{ id: 1, tabData: [] }];
    }
    if (!category.tabContent[0].tabData) {
        category.tabContent[0].tabData = [];
    }
}

/** Make sure exactly one category has the active "show active" class. */
export function normalizeActiveCategory(menu: Menu): void {
    const visible = menu
        .filter((c) => !c.hidden)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    menu.forEach((c) => {
        c.tabClass = "";
    });
    if (visible[0]) {
        visible[0].tabClass = "show active";
    }
}
