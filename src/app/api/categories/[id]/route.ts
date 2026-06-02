/**
 * GET    /api/categories/:id   — fetch one
 * PATCH  /api/categories/:id   — update fields (including hidden/order/rename)
 * DELETE /api/categories/:id   — delete. Refuses if products exist unless ?force=1.
 */

import { NextRequest, NextResponse } from "next/server";
import {
    readMenu,
    writeMenu,
    findCategory,
    normalizeActiveCategory,
} from "@/lib/db";
import type { Category } from "@/lib/menu-types";
import { menuPersistenceErrorResponse } from "@/lib/menu-persistence";
import { revalidateMenuPages } from "@/lib/revalidate-menu";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RouteContext {
    params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, ctx: RouteContext) {
    const { id } = await ctx.params;
    const menu = await readMenu();
    const cat = findCategory(menu, Number(id));
    if (!cat) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ data: cat });
}

export async function PATCH(req: NextRequest, ctx: RouteContext) {
    try {
    const { id } = await ctx.params;
    let body: Partial<Category>;
    try {
        body = (await req.json()) as Partial<Category>;
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const menu = await readMenu();
    const cat = findCategory(menu, Number(id));
    if (!cat) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (body.tabTitle !== undefined) cat.tabTitle = String(body.tabTitle);
    if (body.tabThumb !== undefined) cat.tabThumb = String(body.tabThumb);
    if (typeof body.discount === "number") cat.discount = body.discount;
    if (body.nameAr !== undefined) cat.nameAr = body.nameAr;
    if (body.description !== undefined) cat.description = body.description;
    if (body.icon !== undefined) cat.icon = body.icon;
    if (typeof body.order === "number") cat.order = body.order;
    if (typeof body.hidden === "boolean") cat.hidden = body.hidden;
    cat.updatedAt = new Date().toISOString();

    normalizeActiveCategory(menu);
    await writeMenu(menu);
    revalidateMenuPages();

    return NextResponse.json({ data: cat });
    } catch (err) {
        return menuPersistenceErrorResponse(err);
    }
}

export async function DELETE(req: NextRequest, ctx: RouteContext) {
    try {
    const { id } = await ctx.params;
    const force = req.nextUrl.searchParams.get("force") === "1";

    const menu = await readMenu();
    const idx = menu.findIndex((c) => c.id === Number(id));
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const cat = menu[idx];
    const productCount = (cat.tabContent ?? []).reduce(
        (sum, g) => sum + (g.tabData?.length ?? 0),
        0
    );

    if (productCount > 0 && !force) {
        return NextResponse.json(
            {
                error: `Category has ${productCount} product(s). Move or delete them first, or pass ?force=1.`,
                productCount,
            },
            { status: 409 }
        );
    }

    menu.splice(idx, 1);
    normalizeActiveCategory(menu);
    await writeMenu(menu);
    revalidateMenuPages();

    return NextResponse.json({ ok: true });
    } catch (err) {
        return menuPersistenceErrorResponse(err);
    }
}
