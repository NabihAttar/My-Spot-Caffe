/**
 * GET    /api/products/:id        — fetch one product (with categoryId).
 * PATCH  /api/products/:id        — update product fields. Body may include
 *                                   `categoryId` to move the product between
 *                                   categories.
 * DELETE /api/products/:id        — delete one product.
 */

import { NextRequest, NextResponse } from "next/server";
import {
    readMenu,
    writeMenu,
    findProduct,
    findCategory,
    ensureGroup,
    normalizeProductOrders,
    sortedCategoryProducts,
} from "@/lib/db";
import type { Product } from "@/lib/menu-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RouteContext {
    params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, ctx: RouteContext) {
    const { id } = await ctx.params;
    const menu = await readMenu();
    const found = findProduct(menu, Number(id));
    if (!found) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({
        data: { ...found.product, categoryId: found.category.id },
    });
}

export async function PATCH(req: NextRequest, ctx: RouteContext) {
    const { id } = await ctx.params;
    let body: (Partial<Product> & { categoryId?: number }) | undefined;
    try {
        body = (await req.json()) as Partial<Product> & { categoryId?: number };
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const menu = await readMenu();
    const found = findProduct(menu, Number(id));
    if (!found) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const { product, category } = found;

    // Move category if requested.
    if (
        typeof body!.categoryId === "number" &&
        body!.categoryId !== category.id
    ) {
        const target = findCategory(menu, body!.categoryId);
        if (!target) {
            return NextResponse.json(
                { error: "Target category not found" },
                { status: 404 }
            );
        }
        // Remove from current group.
        for (const group of category.tabContent ?? []) {
            const idx = group.tabData?.findIndex((p) => p.id === product.id) ?? -1;
            if (idx >= 0) group.tabData.splice(idx, 1);
        }
        ensureGroup(target);
        normalizeProductOrders(category);
        const targetSorted = sortedCategoryProducts(target);
        product.order = targetSorted.length;
        target.tabContent[0].tabData.push(product);
        normalizeProductOrders(target);
    }

    // Apply string field updates.
    if (typeof body!.thumb === "string") product.thumb = body!.thumb;
    if (typeof body!.name === "string") product.name = body!.name;
    if (typeof body!.leftInfo === "string") product.leftInfo = body!.leftInfo;
    if (typeof body!.rightInfo === "string") product.rightInfo = body!.rightInfo;
    if (typeof body!.description === "string") product.description = body!.description;
    if (typeof body!.ingredients === "string") product.ingredients = body!.ingredients;
    if (typeof body!.prepTime === "string") product.prepTime = body!.prepTime;

    // Apply numeric field updates.
    if (typeof body!.price === "number") product.price = body!.price;
    if (typeof body!.priceFull === "number") product.priceFull = body!.priceFull;
    if (typeof body!.discountPrice === "number") product.discountPrice = body!.discountPrice;
    if (typeof body!.order === "number") product.order = body!.order;

    // Apply boolean / array updates.
    if (typeof body!.available === "boolean") product.available = body!.available;
    if (typeof body!.featured === "boolean") product.featured = body!.featured;
    if (Array.isArray(body!.tags)) product.tags = body!.tags;
    if (Array.isArray(body!.sizes)) product.sizes = body!.sizes;
    if (Array.isArray(body!.addons)) product.addons = body!.addons;
    product.updatedAt = new Date().toISOString();

    await writeMenu(menu);

    // Re-resolve category in case of move.
    const after = findProduct(menu, product.id)!;
    return NextResponse.json({
        data: { ...after.product, categoryId: after.category.id },
    });
}

export async function DELETE(_req: NextRequest, ctx: RouteContext) {
    const { id } = await ctx.params;
    const menu = await readMenu();
    let deleted = false;
    for (const category of menu) {
        for (const group of category.tabContent ?? []) {
            const idx = group.tabData?.findIndex((p) => p.id === Number(id)) ?? -1;
            if (idx >= 0) {
                group.tabData.splice(idx, 1);
                deleted = true;
                break;
            }
        }
        if (deleted) break;
    }
    if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
    await writeMenu(menu);
    return NextResponse.json({ ok: true });
}
