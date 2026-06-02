/**
 * GET  /api/products              — flat list of all products (admin convenience).
 * POST /api/products              — create a new product. Body must include categoryId.
 */

import { NextRequest, NextResponse } from "next/server";
import {
    readMenu,
    writeMenu,
    nextProductId,
    findCategory,
    ensureGroup,
} from "@/lib/db";
import type { Product, ProductRow } from "@/lib/menu-types";
import { menuPersistenceErrorResponse } from "@/lib/menu-persistence";
import { revalidateMenuPages } from "@/lib/revalidate-menu";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
    const menu = await readMenu();
    const rows: ProductRow[] = [];
    for (const category of menu) {
        for (const group of category.tabContent ?? []) {
            for (const p of group.tabData ?? []) {
                rows.push({
                    ...p,
                    categoryId: category.id,
                    categoryTitle: category.tabTitle,
                });
            }
        }
    }
    return NextResponse.json({ data: rows });
}

export async function POST(req: NextRequest) {
    try {
    let body: (Partial<Product> & { categoryId?: number }) | undefined;
    try {
        body = (await req.json()) as Partial<Product> & { categoryId?: number };
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
    if (!body || typeof body.categoryId !== "number") {
        return NextResponse.json(
            { error: "`categoryId` (number) is required" },
            { status: 400 }
        );
    }
    if (!body.name || !String(body.name).trim()) {
        return NextResponse.json(
            { error: "Product name is required" },
            { status: 400 }
        );
    }

    const menu = await readMenu();
    const category = findCategory(menu, body.categoryId);
    if (!category) {
        return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }
    ensureGroup(category);

    const id = nextProductId(menu);
    const now = new Date().toISOString();
    const order =
        typeof body.order === "number"
            ? body.order
            : (category.tabContent[0].tabData?.length ?? 0);

    const product: Product = {
        id,
        thumb: body.thumb || "14.jpg",
        name: String(body.name).trim(),
        price: typeof body.price === "number" ? body.price : 0,
        priceFull: typeof body.priceFull === "number" ? body.priceFull : 0,
        leftInfo: body.leftInfo ?? "",
        rightInfo: body.rightInfo ?? "",
        description: body.description,
        ingredients: body.ingredients,
        discountPrice:
            typeof body.discountPrice === "number" ? body.discountPrice : undefined,
        prepTime: body.prepTime,
        sizes: Array.isArray(body.sizes) ? body.sizes : [],
        addons: Array.isArray(body.addons) ? body.addons : [],
        tags: Array.isArray(body.tags) ? body.tags : [],
        order,
        available: body.available ?? true,
        featured: body.featured ?? false,
        createdAt: now,
        updatedAt: now,
    };

    category.tabContent[0].tabData.push(product);
    await writeMenu(menu);
    revalidateMenuPages();

    return NextResponse.json({ data: { ...product, categoryId: category.id } }, { status: 201 });
    } catch (err) {
        return menuPersistenceErrorResponse(err);
    }
}
