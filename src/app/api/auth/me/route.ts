/**
 * GET /api/auth/me — returns the current logged-in admin (if any).
 */

import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE, verifyToken } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    const token = req.cookies.get(AUTH_COOKIE)?.value;
    const payload = verifyToken(token);
    if (!payload) {
        return NextResponse.json({ user: null }, { status: 200 });
    }
    return NextResponse.json({ user: { name: payload.user, exp: payload.exp } });
}
