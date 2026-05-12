/**
 * Edge middleware that protects admin pages and admin-only API routes.
 *
 * Notes:
 * - We can't import Node's `crypto` here (Edge runtime), so verification
 *   uses Web Crypto via SubtleCrypto for HMAC-SHA256. The signing logic
 *   in src/lib/auth.ts uses the same algorithm and base64url encoding,
 *   so signatures match.
 * - Public endpoints (GET /api/menu, /api/auth/login) are NOT blocked here.
 */

import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "spotcaffe_admin";

function b64UrlToUint8(input: string): Uint8Array {
    const pad = input.length % 4 === 0 ? "" : "=".repeat(4 - (input.length % 4));
    const normalized = input.replace(/-/g, "+").replace(/_/g, "/") + pad;
    const bin = atob(normalized);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
    return arr;
}

function b64UrlToString(input: string): string {
    const bytes = b64UrlToUint8(input);
    return new TextDecoder().decode(bytes);
}

function hexToUint8(hex: string): Uint8Array {
    if (hex.length % 2 !== 0) return new Uint8Array();
    const out = new Uint8Array(hex.length / 2);
    for (let i = 0; i < out.length; i++) {
        out[i] = parseInt(hex.substr(i * 2, 2), 16);
    }
    return out;
}

function toHex(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let out = "";
    for (let i = 0; i < bytes.length; i++) {
        out += bytes[i].toString(16).padStart(2, "0");
    }
    return out;
}

async function verifyToken(token: string | undefined): Promise<boolean> {
    if (!token) return false;
    const parts = token.split(".");
    if (parts.length !== 2) return false;
    const [body, sig] = parts;
    // Must match FALLBACK_SECRET in src/lib/auth.ts exactly.
    const secret = process.env.ADMIN_SECRET || "spotcaffe-dev-secret-change-me-please";
    try {
        const key = await crypto.subtle.importKey(
            "raw",
            new TextEncoder().encode(secret),
            { name: "HMAC", hash: "SHA-256" },
            false,
            ["sign"]
        );
        const signed = await crypto.subtle.sign(
            "HMAC",
            key,
            new TextEncoder().encode(body)
        );
        const expectedHex = toHex(signed);
        if (expectedHex.length !== sig.length) return false;
        // Constant-time-ish comparison.
        let diff = 0;
        for (let i = 0; i < expectedHex.length; i++) {
            diff |= expectedHex.charCodeAt(i) ^ sig.charCodeAt(i);
        }
        if (diff !== 0) return false;
        const payload = JSON.parse(b64UrlToString(body)) as { exp?: number };
        if (!payload || typeof payload.exp !== "number") return false;
        if (payload.exp < Date.now()) return false;
        // Avoid unused warning.
        void hexToUint8;
        return true;
    } catch {
        return false;
    }
}

/**
 * In Next.js 16 the `middleware` convention was renamed to `proxy`.
 * We export both names so the file works regardless of which convention
 * is active. The file itself is named `proxy.ts` (the v16 name).
 */
export async function proxy(req: NextRequest) {
    return handle(req);
}

export async function middleware(req: NextRequest) {
    return handle(req);
}

async function handle(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get(AUTH_COOKIE)?.value;
    const isAuthed = await verifyToken(token);

    // 1. Admin pages: anything under /admin except the login page.
    if (pathname.startsWith("/admin")) {
        const isLogin = pathname === "/admin/login" || pathname.startsWith("/admin/login/");
        if (!isAuthed && !isLogin) {
            const url = req.nextUrl.clone();
            url.pathname = "/admin/login";
            url.searchParams.set("next", pathname);
            return NextResponse.redirect(url);
        }
        if (isAuthed && isLogin) {
            const url = req.nextUrl.clone();
            url.pathname = "/admin/dashboard";
            url.search = "";
            return NextResponse.redirect(url);
        }
    }

    // 2. Mutating admin API routes: protect anything other than GET.
    const adminApiPrefixes = ["/api/categories", "/api/products", "/api/upload"];
    if (adminApiPrefixes.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
        if (req.method !== "GET" && !isAuthed) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    }

    // 3. /api/auth/me always requires auth check (returns 401 if not authed).
    //    We let the route itself read the cookie; nothing to do here.

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*",
        "/api/categories/:path*",
        "/api/categories",
        "/api/products/:path*",
        "/api/products",
        "/api/upload/:path*",
        "/api/upload",
    ],
};
