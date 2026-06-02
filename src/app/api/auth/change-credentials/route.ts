/**
 * POST /api/auth/change-credentials
 *
 * Body: {
 *   currentPassword: string,
 *   newUsername?: string,
 *   newPassword?: string,
 * }
 *
 * Behavior:
 *  - Requires a valid admin session cookie.
 *  - Re-verifies the supplied currentPassword against the active credentials.
 *  - Persists the new credentials to data/admin-credentials.json
 *    (salted SHA-256 hash; plain text is never written to disk).
 *  - Re-issues the auth cookie so the session continues seamlessly under
 *    the (possibly new) username.
 */

import { NextRequest, NextResponse } from "next/server";
import {
    AUTH_COOKIE,
    cookieOptions,
    createToken,
    getAdminUsername,
    verifyCurrentPassword,
    verifyToken,
} from "@/lib/auth";
import { saveCredentials } from "@/lib/credentials";
import { menuPersistenceErrorResponse } from "@/lib/menu-persistence";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Body {
    currentPassword?: string;
    newUsername?: string;
    newPassword?: string;
}

const MIN_PASSWORD_LENGTH = 6;
const USERNAME_PATTERN = /^[A-Za-z0-9._-]{3,32}$/;

export async function POST(req: NextRequest) {
    const token = req.cookies.get(AUTH_COOKIE)?.value;
    if (!verifyToken(token)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let body: Body;
    try {
        body = (await req.json()) as Body;
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const currentPassword = String(body.currentPassword ?? "");
    const newUsernameRaw = body.newUsername;
    const newPasswordRaw = body.newPassword;

    if (!currentPassword) {
        return NextResponse.json(
            { error: "Current password is required" },
            { status: 400 }
        );
    }

    const wantsUsernameChange =
        typeof newUsernameRaw === "string" && newUsernameRaw.trim().length > 0;
    const wantsPasswordChange =
        typeof newPasswordRaw === "string" && newPasswordRaw.length > 0;

    if (!wantsUsernameChange && !wantsPasswordChange) {
        return NextResponse.json(
            { error: "Provide a new username, a new password, or both" },
            { status: 400 }
        );
    }

    const currentUsername = await getAdminUsername();
    const nextUsername = wantsUsernameChange
        ? newUsernameRaw!.trim()
        : currentUsername;
    const nextPassword = wantsPasswordChange ? newPasswordRaw! : null;

    if (wantsUsernameChange && !USERNAME_PATTERN.test(nextUsername)) {
        return NextResponse.json(
            {
                error:
                    "Username must be 3-32 characters using letters, digits, dot, underscore or dash",
            },
            { status: 400 }
        );
    }

    if (wantsPasswordChange && nextPassword!.length < MIN_PASSWORD_LENGTH) {
        return NextResponse.json(
            {
                error: `New password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
            },
            { status: 400 }
        );
    }

    if (!(await verifyCurrentPassword(currentPassword))) {
        return NextResponse.json(
            { error: "Current password is incorrect" },
            { status: 401 }
        );
    }

    // If only the username is changing, we still need a password value to
    // hash and store. Fall back to the current one in that case.
    const finalPassword = nextPassword ?? currentPassword;
    try {
        const saved = await saveCredentials(nextUsername, finalPassword);

        const newToken = createToken(saved.username);
        const res = NextResponse.json({
            ok: true,
            user: { name: saved.username, updatedAt: saved.updatedAt },
        });
        res.cookies.set(AUTH_COOKIE, newToken, cookieOptions());
        return res;
    } catch (err) {
        return menuPersistenceErrorResponse(err);
    }
}
