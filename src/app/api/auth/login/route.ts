/**
 * POST /api/auth/login
 *
 * Body: { username, password }
 * On success, sets the HttpOnly session cookie and returns { ok: true, user }.
 */

import { NextRequest, NextResponse } from "next/server";
import {
    AUTH_COOKIE,
    checkCredentials,
    cookieOptions,
    createToken,
    getAdminUsername,
} from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    let body: { username?: string; password?: string };
    try {
        body = (await req.json()) as { username?: string; password?: string };
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const username = String(body.username ?? "").trim();
    const password = String(body.password ?? "");

    if (!username || !password) {
        return NextResponse.json(
            { error: "Username and password are required" },
            { status: 400 }
        );
    }

    if (!(await checkCredentials(username, password))) {
        return NextResponse.json(
            { error: "Invalid username or password" },
            { status: 401 }
        );
    }

    const name = await getAdminUsername();
    const token = createToken(name);
    const res = NextResponse.json({ ok: true, user: { name } });
    res.cookies.set(AUTH_COOKIE, token, cookieOptions());
    return res;
}
