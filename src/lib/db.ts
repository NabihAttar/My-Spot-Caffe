/**
 * Menu persistence layer.
 *
 * Priority:
 * 1. PostgreSQL via Prisma when DATABASE_URL is set (production on Vercel)
 * 2. Upstash Redis / Vercel Blob (legacy fallback)
 * 3. Local data/menu.json (development)
 *
 * On Vercel without DATABASE_URL or Redis/Blob, reads fall back to bundled seed
 * JSON and writes throw MenuPersistenceError.
 */

import { promises as fs } from "fs";
import path from "path";
import type { Menu, Category, Product } from "./menu-types";
import { isVercelServerless, menuJsonPath } from "./server-paths";
import { getMenuStore, MENU_STORAGE_KEY } from "./menu-store";
import { MenuPersistenceError } from "./menu-errors";
import { hasDatabase } from "./prisma";
import { readMenuFromPrisma, writeMenuToPrisma } from "./menu-prisma";
import { loadSeedMenu, migrateMenuIds } from "./db-seed";

export { MenuPersistenceError } from "./menu-errors";

const VERCEL_STORAGE_HINT =
    "On Vercel, connect Vercel Postgres (DATABASE_URL) in Project → Storage, run `npx prisma migrate deploy`, then redeploy. Alternatively add Upstash Redis or Vercel Blob.";

function dataFile(): string {
    return menuJsonPath();
}

function dataDir(): string {
    return path.dirname(dataFile());
}

let writeLock: Promise<void> = Promise.resolve();

async function ensureDataFile(): Promise<void> {
    if (isVercelServerless() || hasDatabase()) return;
    const store = await getMenuStore();
    if (store) return;
    const DATA_FILE = dataFile();
    try {
        await fs.access(DATA_FILE);
    } catch {
        await fs.mkdir(dataDir(), { recursive: true });
        const seed = await loadSeedMenu();
        await fs.writeFile(DATA_FILE, JSON.stringify(seed, null, 2), "utf-8");
    }
}

function parseMenu(raw: string): Menu {
    try {
        return JSON.parse(raw) as Menu;
    } catch {
        return [];
    }
}

function applyIdMigration(menu: Menu): Menu {
    const migrated = migrateMenuIds(menu);
    return migrated;
}

function menuNeedsIdMigration(before: Menu, after: Menu): boolean {
    return JSON.stringify(before) !== JSON.stringify(after);
}

export async function readMenu(): Promise<Menu> {
    if (hasDatabase()) {
        return readMenuFromPrisma();
    }

    const store = await getMenuStore();
    if (store) {
        let raw = await store.get(MENU_STORAGE_KEY);
        if (!raw) {
            const seed = await loadSeedMenu();
            raw = JSON.stringify(seed, null, 2);
            await store.set(MENU_STORAGE_KEY, raw);
        }

        let menu = parseMenu(raw);
        const migrated = applyIdMigration(menu);
        if (menuNeedsIdMigration(menu, migrated)) {
            menu = migrated;
            store.set(MENU_STORAGE_KEY, JSON.stringify(menu, null, 2)).catch(() => {
                /* ignore */
            });
        }
        return menu;
    }

    if (isVercelServerless()) {
        return loadSeedMenu();
    }

    await ensureDataFile();
    const raw = await fs.readFile(dataFile(), "utf-8");
    let menu = parseMenu(raw);
    const migrated = applyIdMigration(menu);
    if (menuNeedsIdMigration(menu, migrated)) {
        menu = migrated;
        writeMenu(menu).catch(() => {
            /* ignore */
        });
    }
    return menu;
}

export async function writeMenu(menu: Menu): Promise<void> {
    if (hasDatabase()) {
        return writeMenuToPrisma(menu);
    }

    const store = await getMenuStore();
    if (store) {
        const previous = writeLock;
        let release: () => void;
        writeLock = new Promise<void>((resolve) => {
            release = resolve;
        });
        await previous;
        try {
            await store.set(MENU_STORAGE_KEY, JSON.stringify(menu, null, 2));
        } catch (err) {
            const detail = err instanceof Error ? err.message : "unknown error";
            throw new MenuPersistenceError(
                store.backend === "redis"
                    ? `Could not save menu to Redis: ${detail}. Check your Upstash Redis connection in Vercel → Storage.`
                    : `Could not save menu to Vercel Blob: ${detail}. Check your Blob store in Vercel → Storage.`
            );
        } finally {
            release!();
        }
        return;
    }

    if (isVercelServerless()) {
        throw new MenuPersistenceError(VERCEL_STORAGE_HINT);
    }

    const previous = writeLock;
    let release: () => void;
    writeLock = new Promise<void>((resolve) => {
        release = resolve;
    });
    await previous;
    try {
        await fs.mkdir(dataDir(), { recursive: true });
        await fs.writeFile(dataFile(), JSON.stringify(menu, null, 2), "utf-8");
    } catch (err) {
        const detail = err instanceof Error ? err.message : "unknown error";
        throw new MenuPersistenceError(`Could not save menu file: ${detail}`);
    } finally {
        release!();
    }
}

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

export function sortedCategoryProducts(category: Category): Product[] {
    ensureGroup(category);
    return [...(category.tabContent[0].tabData ?? [])].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0)
    );
}

export function normalizeProductOrders(category: Category): void {
    ensureGroup(category);
    const sorted = sortedCategoryProducts(category);
    sorted.forEach((p, idx) => {
        p.order = idx;
    });
    category.tabContent[0].tabData = sorted;
}

export function reorderProductInCategory(
    menu: Menu,
    categoryId: number,
    productId: number,
    direction: "up" | "down"
): boolean {
    const category = findCategory(menu, categoryId);
    if (!category) return false;
    const sorted = sortedCategoryProducts(category);
    const idx = sorted.findIndex((p) => p.id === productId);
    if (idx < 0) return false;
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return false;
    [sorted[idx], sorted[swapIdx]] = [sorted[swapIdx], sorted[idx]];
    sorted.forEach((p, i) => {
        p.order = i;
    });
    ensureGroup(category);
    category.tabContent[0].tabData = sorted;
    return true;
}

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
