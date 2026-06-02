import { NextRequest, NextResponse } from "next/server";
import { getStorageStatus } from "@/lib/menu-store";
import { AUTH_COOKIE, verifyToken } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    const token = req.cookies.get(AUTH_COOKIE)?.value;
    if (!verifyToken(token)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const status = await getStorageStatus();
    return NextResponse.json({ data: status });
}
