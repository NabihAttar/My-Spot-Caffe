import { PrismaClient, Prisma } from "@prisma/client";
import { loadSeedMenu, migrateMenuIds } from "../src/lib/db-seed";

const prisma = new PrismaClient();

function jsonField(value: unknown): Prisma.InputJsonValue | undefined {
    if (value == null) return undefined;
    return value as Prisma.InputJsonValue;
}

async function main() {
    const count = await prisma.category.count();
    if (count > 0) {
        console.log(`Database already has ${count} categories — skipping seed.`);
        return;
    }

    const seed = migrateMenuIds(await loadSeedMenu());
    const categoryIds = seed.map((c) => c.id);
    const productIds: number[] = [];

    for (const cat of seed) {
        const products = cat.tabContent?.[0]?.tabData ?? [];
        await prisma.category.create({
            data: {
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
                products: {
                    create: products.map((p) => {
                        productIds.push(p.id);
                        return {
                            id: p.id,
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
                        };
                    }),
                },
            },
        });
    }

    console.log(
        `Seeded ${categoryIds.length} categories and ${productIds.length} products from FoodCartV4Data.json.`
    );
}

main()
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
