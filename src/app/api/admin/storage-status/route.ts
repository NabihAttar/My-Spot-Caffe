import { NextRequest, NextResponse } from "next/server";
import { getStorageStatus } from "@/lib/menu-store";
import { AUTH_COOKIE, verifyToken } from "@/lib/auth";
import { hasDatabase, prisma } from "@/lib/prisma";
import { readMenu } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    const token = req.cookies.get(AUTH_COOKIE)?.value;
    if (!verifyToken(token)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const status = await getStorageStatus();
    let categoryCount: number | null = null;
    let productCount: number | null = null;

    if (hasDatabase()) {
        try {
            categoryCount = await prisma.category.count();
            productCount = await prisma.product.count();
        } catch {
            categoryCount = null;
            productCount = null;
        }
    } else {
        try {
            const menu = await readMenu();
            categoryCount = menu.length;
            productCount = menu.reduce(
                (sum, cat) =>
                    sum +
                    (cat.tabContent ?? []).reduce(
                        (s, g) => s + (g.tabData?.length ?? 0),
                        0
                    ),
                0
            );
        } catch {
            /* ignore */
        }
    }

    return NextResponse.json({
        data: {
            ...status,
            categoryCount,
            productCount,
            needsSeed: categoryCount === 0,
        },
    });
}
