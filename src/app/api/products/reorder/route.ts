/**
 * PATCH /api/products/reorder
 *
 * Move a product up or down within a category. Body:
 *   { categoryId: number, productId: number, direction: "up" | "down" }
 */

import { NextRequest, NextResponse } from "next/server";
import { readMenu, writeMenu, reorderProductInCategory } from "@/lib/db";
import { menuPersistenceErrorResponse } from "@/lib/menu-persistence";
import { revalidateMenuPages } from "@/lib/revalidate-menu";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(req: NextRequest) {
    try {
    let body: { categoryId?: number; productId?: number; direction?: string };
    try {
        body = (await req.json()) as typeof body;
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const categoryId = body.categoryId;
    const productId = body.productId;
    const direction = body.direction;

    if (typeof categoryId !== "number" || typeof productId !== "number") {
        return NextResponse.json(
            { error: "categoryId and productId are required" },
            { status: 400 }
        );
    }
    if (direction !== "up" && direction !== "down") {
        return NextResponse.json(
            { error: 'direction must be "up" or "down"' },
            { status: 400 }
        );
    }

    const menu = await readMenu();
    const ok = reorderProductInCategory(menu, categoryId, productId, direction);
    if (!ok) {
        return NextResponse.json(
            { error: "Cannot reorder (product not found or already at edge)" },
            { status: 400 }
        );
    }

    await writeMenu(menu);
    revalidateMenuPages();
    return NextResponse.json({ ok: true });
    } catch (err) {
        return menuPersistenceErrorResponse(err);
    }
}
