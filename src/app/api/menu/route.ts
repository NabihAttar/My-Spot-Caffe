/**
 * GET /api/menu
 *
 * Returns the full menu (categories + products). Public — used by both the
 * normal menu page and the QR menu page. Hidden categories and unavailable
 * products are filtered out for non-admin callers.
 */

import { NextRequest, NextResponse } from "next/server";
import { readMenu } from "@/lib/db";
import { verifyToken, AUTH_COOKIE } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    try {
        const menu = await readMenu();
        const token = req.cookies.get(AUTH_COOKIE)?.value;
        const isAdmin = !!verifyToken(token);

        if (isAdmin) {
            // Admins see everything (incl. hidden + unavailable).
            return NextResponse.json(
                { data: menu, isAdmin: true },
                { headers: { "Cache-Control": "no-store, max-age=0" } }
            );
        }

        const visible = menu
            .filter((c) => !c.hidden)
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            .map((c) => ({
                ...c,
                tabContent: (c.tabContent ?? []).map((group) => ({
                    ...group,
                    tabData: (group.tabData ?? [])
                        .filter((p) => p.available !== false)
                        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
                })),
            }));

        return NextResponse.json(
            { data: visible, isAdmin: false },
            { headers: { "Cache-Control": "no-store, max-age=0" } }
        );
    } catch (err) {
        console.error("[api/menu]", err);
        return NextResponse.json(
            {
                error: "Could not load menu data",
                hint:
                    "Connect Vercel Postgres (DATABASE_URL), ensure migrations ran (`prisma migrate deploy`), then redeploy. Check Admin → Settings for storage status.",
            },
            { status: 500 }
        );
    }
}
