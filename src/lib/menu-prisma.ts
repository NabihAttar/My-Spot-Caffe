import type { Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { loadSeedMenu, migrateMenuIds } from "./db-seed";
import type { Category, Menu, Product } from "./menu-types";
import { MenuPersistenceError } from "./menu-errors";

function jsonField(value: unknown): Prisma.InputJsonValue | undefined {
    if (value == null) return undefined;
    return value as Prisma.InputJsonValue;
}

function productsFromCategory(category: Category): Product[] {
    return category.tabContent?.[0]?.tabData ?? [];
}

function toProduct(row: {
    id: number;
    thumb: string;
    name: string;
    price: number;
    priceFull: number;
    leftInfo: string;
    rightInfo: string;
    description: string | null;
    ingredients: string | null;
    discountPrice: number | null;
    prepTime: string | null;
    sizes: Prisma.JsonValue;
    addons: Prisma.JsonValue;
    tags: Prisma.JsonValue;
    order: number;
    available: boolean;
    featured: boolean;
    createdAt: Date;
    updatedAt: Date;
}): Product {
    return {
        id: row.id,
        thumb: row.thumb,
        name: row.name,
        price: row.price,
        priceFull: row.priceFull,
        leftInfo: row.leftInfo,
        rightInfo: row.rightInfo,
        description: row.description ?? undefined,
        ingredients: row.ingredients ?? undefined,
        discountPrice: row.discountPrice ?? undefined,
        prepTime: row.prepTime ?? undefined,
        sizes: (row.sizes as unknown as Product["sizes"]) ?? undefined,
        addons: (row.addons as unknown as Product["addons"]) ?? undefined,
        tags: (row.tags as unknown as Product["tags"]) ?? undefined,
        order: row.order,
        available: row.available,
        featured: row.featured,
        createdAt: row.createdAt.toISOString(),
        updatedAt: row.updatedAt.toISOString(),
    };
}

function toCategory(row: {
    id: number;
    tabTitle: string;
    tabClass: string;
    tabThumb: string;
    discount: number;
    tabId: string;
    nameAr: string | null;
    description: string | null;
    icon: string | null;
    order: number;
    hidden: boolean;
    createdAt: Date;
    updatedAt: Date;
    products: Parameters<typeof toProduct>[0][];
}): Category {
    return {
        id: row.id,
        tabTitle: row.tabTitle,
        tabClass: row.tabClass,
        tabThumb: row.tabThumb,
        discount: row.discount,
        tabId: row.tabId,
        nameAr: row.nameAr ?? undefined,
        description: row.description ?? undefined,
        icon: row.icon ?? undefined,
        order: row.order,
        hidden: row.hidden,
        createdAt: row.createdAt.toISOString(),
        updatedAt: row.updatedAt.toISOString(),
        tabContent: [
            {
                id: 1,
                tabData: row.products.map(toProduct),
            },
        ],
    };
}

async function seedIfEmpty(): Promise<void> {
    const count = await prisma.category.count();
    if (count > 0) return;
    const seed = migrateMenuIds(await loadSeedMenu());
    await writeMenuToPrisma(seed);
}

export async function readMenuFromPrisma(): Promise<Menu> {
    try {
        await seedIfEmpty();
        const rows = await prisma.category.findMany({
            include: {
                products: { orderBy: { order: "asc" } },
            },
            orderBy: { order: "asc" },
        });
        return rows.map(toCategory);
    } catch (err) {
        const detail = err instanceof Error ? err.message : "unknown error";
        throw new MenuPersistenceError(
            `Could not read menu from PostgreSQL: ${detail}. Check DATABASE_URL and run prisma migrate deploy.`
        );
    }
}

export async function writeMenuToPrisma(menu: Menu): Promise<void> {
    const categoryIds = menu.map((c) => c.id);
    const productIds: number[] = [];

    try {
        await prisma.$transaction(async (tx) => {
            for (const cat of menu) {
                const products = productsFromCategory(cat);
                await tx.category.upsert({
                    where: { id: cat.id },
                    create: {
                        id: cat.id,
                        tabTitle: cat.tabTitle,
                        tabClass: cat.tabClass,
                        tabThumb: cat.tabThumb,
                        discount: cat.discount ?? 0,
                        tabId: cat.tabId,
                        nameAr: cat.nameAr ?? null,
                        description: cat.description ?? null,
                        icon: cat.icon ?? null,
                        order: cat.order ?? 0,
                        hidden: cat.hidden ?? false,
                    },
                    update: {
                        tabTitle: cat.tabTitle,
                        tabClass: cat.tabClass,
                        tabThumb: cat.tabThumb,
                        discount: cat.discount ?? 0,
                        tabId: cat.tabId,
                        nameAr: cat.nameAr ?? null,
                        description: cat.description ?? null,
                        icon: cat.icon ?? null,
                        order: cat.order ?? 0,
                        hidden: cat.hidden ?? false,
                    },
                });

                for (const p of products) {
                    productIds.push(p.id);
                    await tx.product.upsert({
                        where: { id: p.id },
                        create: {
                            id: p.id,
                            categoryId: cat.id,
                            thumb: p.thumb,
                            name: p.name,
                            price: p.price ?? 0,
                            priceFull: p.priceFull ?? 0,
                            leftInfo: p.leftInfo ?? "",
                            rightInfo: p.rightInfo ?? "",
                            description: p.description ?? null,
                            ingredients: p.ingredients ?? null,
                            discountPrice: p.discountPrice ?? null,
                            prepTime: p.prepTime ?? null,
                            sizes: jsonField(p.sizes),
                            addons: jsonField(p.addons),
                            tags: jsonField(p.tags),
                            order: p.order ?? 0,
                            available: p.available !== false,
                            featured: p.featured ?? false,
                        },
                        update: {
                            categoryId: cat.id,
                            thumb: p.thumb,
                            name: p.name,
                            price: p.price ?? 0,
                            priceFull: p.priceFull ?? 0,
                            leftInfo: p.leftInfo ?? "",
                            rightInfo: p.rightInfo ?? "",
                            description: p.description ?? null,
                            ingredients: p.ingredients ?? null,
                            discountPrice: p.discountPrice ?? null,
                            prepTime: p.prepTime ?? null,
                            sizes: jsonField(p.sizes),
                            addons: jsonField(p.addons),
                            tags: jsonField(p.tags),
                            order: p.order ?? 0,
                            available: p.available !== false,
                            featured: p.featured ?? false,
                        },
                    });
                }
            }

            if (productIds.length > 0) {
                await tx.product.deleteMany({
                    where: { id: { notIn: productIds } },
                });
            } else {
                await tx.product.deleteMany();
            }

            if (categoryIds.length > 0) {
                await tx.category.deleteMany({
                    where: { id: { notIn: categoryIds } },
                });
            } else {
                await tx.category.deleteMany();
            }
        });
    } catch (err) {
        const detail = err instanceof Error ? err.message : "unknown error";
        throw new MenuPersistenceError(
            `Could not save menu to PostgreSQL: ${detail}. Verify DATABASE_URL and database migrations.`
        );
    }
}
