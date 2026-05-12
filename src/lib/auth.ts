/**
 * Minimal HMAC-signed cookie auth for the admin panel.
 *
 * Why hand-rolled? We don't want to add extra packages (jose, jsonwebtoken)
 * for a single admin login. Node's built-in `crypto` is enough: we encode
 * `{ user, exp }` as base64 JSON and append an HMAC-SHA256 signature.
 *
 * Credentials and secret are configured via env vars:
 *   ADMIN_USERNAME  (default: "admin")
 *   ADMIN_PASSWORD  (default: "admin123")
 *   ADMIN_SECRET    (default: random per-build; SET IN PRODUCTION)
 *
 * The cookie is HttpOnly, SameSite=Lax. In production behind HTTPS it is
 * also marked Secure.
 */

import { createHmac, timingSafeEqual } from "crypto";

export const AUTH_COOKIE = "spotcaffe_admin";
const DEFAULT_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

/**
 * Fallback secret used when ADMIN_SECRET env var is not configured.
 *
 * IMPORTANT: This must match the fallback in `src/proxy.ts` exactly,
 * otherwise the proxy will fail to verify tokens signed by the API
 * route. The Edge runtime in the proxy cannot import this Node module
 * (no `crypto`), so the value is duplicated there as a constant.
 *
 * In production, always set ADMIN_SECRET in your .env file.
 */
export const FALLBACK_SECRET = "spotcaffe-dev-secret-change-me-please";

interface TokenPayload {
    user: string;
    exp: number;
}

function getSecret(): string {
    const secret = process.env.ADMIN_SECRET;
    if (secret && secret.length >= 8) return secret;
    return FALLBACK_SECRET;
}

export function getAdminUsername(): string {
    return process.env.ADMIN_USERNAME || "admin";
}

export function getAdminPassword(): string {
    return process.env.ADMIN_PASSWORD || "admin123";
}

function b64UrlEncode(input: string): string {
    return Buffer.from(input, "utf-8")
        .toString("base64")
        .replace(/=+$/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
}

function b64UrlDecode(input: string): string {
    const pad = input.length % 4 === 0 ? "" : "=".repeat(4 - (input.length % 4));
    return Buffer.from(
        input.replace(/-/g, "+").replace(/_/g, "/") + pad,
        "base64"
    ).toString("utf-8");
}

function sign(data: string): string {
    return createHmac("sha256", getSecret()).update(data).digest("hex");
}

export function createToken(user: string, ttlMs: number = DEFAULT_TTL_MS): string {
    const payload: TokenPayload = { user, exp: Date.now() + ttlMs };
    const body = b64UrlEncode(JSON.stringify(payload));
    const sig = sign(body);
    return `${body}.${sig}`;
}

export function verifyToken(token: string | undefined | null): TokenPayload | null {
    if (!token || typeof token !== "string") return null;
    const parts = token.split(".");
    if (parts.length !== 2) return null;
    const [body, sig] = parts;
    const expected = sign(body);
    try {
        const a = Buffer.from(sig, "hex");
        const b = Buffer.from(expected, "hex");
        if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
    } catch {
        return null;
    }
    try {
        const payload = JSON.parse(b64UrlDecode(body)) as TokenPayload;
        if (!payload || typeof payload.exp !== "number" || payload.exp < Date.now()) {
            return null;
        }
        return payload;
    } catch {
        return null;
    }
}

export function checkCredentials(username: string, password: string): boolean {
    const u = getAdminUsername();
    const p = getAdminPassword();
    // Use timing-safe comparison.
    const a = Buffer.from(`${username}:${password}`);
    const b = Buffer.from(`${u}:${p}`);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
}

export function cookieOptions(maxAgeSeconds: number = 60 * 60 * 24 * 7) {
    return {
        httpOnly: true,
        sameSite: "lax" as const,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: maxAgeSeconds,
    };
}
