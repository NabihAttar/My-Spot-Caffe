/**
 * GET /api/categories       — list categories (admin convenience).
 * POST /api/categories      — create a new category.
 */

import { NextRequest, NextResponse } from "next/server";
import {
    readMenu,
    writeMenu,
    nextCategoryId,
    normalizeActiveCategory,
} from "@/lib/db";
import type { Category } from "@/lib/menu-types";
import { menuPersistenceErrorResponse } from "@/lib/menu-persistence";
import { revalidateMenuPages } from "@/lib/revalidate-menu";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
    const menu = await readMenu();
    return NextResponse.json({ data: menu });
}

export async function POST(req: NextRequest) {
    try {
    let body: Partial<Category>;
    try {
        body = (await req.json()) as Partial<Category>;
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    if (!body.tabTitle || !String(body.tabTitle).trim()) {
        return NextResponse.json(
            { error: "Category name (tabTitle) is required" },
            { status: 400 }
        );
    }

    const menu = await readMenu();
    const id = nextCategoryId(menu);
    const now = new Date().toISOString();
    const order =
        typeof body.order === "number"
            ? body.order
            : menu.reduce((m, c) => Math.max(m, c.order ?? 0), -1) + 1;

    const category: Category = {
        id,
        tabTitle: String(body.tabTitle).trim(),
        tabClass: "",
        tabThumb: body.tabThumb || "coffe.png",
        discount: typeof body.discount === "number" ? body.discount : 0,
        tabId: `tab${id}`,
        tabContent: [{ id: 1, tabData: [] }],
        nameAr: body.nameAr,
        description: body.description,
        icon: body.icon,
        order,
        hidden: body.hidden ?? false,
        createdAt: now,
        updatedAt: now,
    };

    menu.push(category);
    normalizeActiveCategory(menu);
    await writeMenu(menu);
    revalidateMenuPages();

    return NextResponse.json({ data: category }, { status: 201 });
    } catch (err) {
        return menuPersistenceErrorResponse(err);
    }
}
