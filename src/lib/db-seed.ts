import { promises as fs } from "fs";
import path from "path";
import type { Menu } from "./menu-types";

const SEED_FILE = path.join(
    process.cwd(),
    "public",
    "assets",
    "jsonData",
    "food",
    "FoodCartV4Data.json"
);

/** Normalize bundled JSON into admin-friendly defaults. */
export async function loadSeedMenu(): Promise<Menu> {
    let seed: Menu = [];
    try {
        const raw = await fs.readFile(SEED_FILE, "utf-8");
        seed = JSON.parse(raw) as Menu;
    } catch {
        seed = [];
    }

    const now = new Date().toISOString();
    return seed.map((cat, idx) => ({
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
}

/** Ensure globally unique category/product IDs (seed JSON reuses product id 1 per category). */
export function migrateMenuIds(menu: Menu): Menu {
    const cloned = structuredClone(menu) as Menu;
    let maxProductId = 0;
    for (const cat of cloned) {
        for (const group of cat.tabContent ?? []) {
            for (const p of group.tabData ?? []) {
                if (typeof p.id === "number" && p.id > maxProductId) {
                    maxProductId = p.id;
                }
            }
        }
    }

    const seenProductIds = new Set<number>();
    let nextProductId = maxProductId + 1;
    for (const cat of cloned) {
        for (const group of cat.tabContent ?? []) {
            for (const p of group.tabData ?? []) {
                if (typeof p.id !== "number" || seenProductIds.has(p.id)) {
                    p.id = nextProductId++;
                }
                seenProductIds.add(p.id);
            }
        }
    }

    const seenCategoryIds = new Set<number>();
    let nextCategoryId = cloned.reduce((m, c) => Math.max(m, c.id || 0), 0) + 1;
    for (const cat of cloned) {
        if (typeof cat.id !== "number" || seenCategoryIds.has(cat.id)) {
            cat.id = nextCategoryId++;
            cat.tabId = `tab${cat.id}`;
        }
        seenCategoryIds.add(cat.id);
    }

    return cloned;
}
