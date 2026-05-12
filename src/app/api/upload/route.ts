/**
 * POST /api/upload (multipart/form-data, field name "file")
 *
 * Saves uploaded image into /public/assets/img/food/uploads/<timestamp>-<safe-name>
 * and returns its URL. Used by the admin product form image picker.
 *
 * Limitations: 5 MB max, jpg/jpeg/png/webp/gif only. Admin-only (protected by
 * middleware).
 */

import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_EXT = new Set(["jpg", "jpeg", "png", "webp", "gif"]);
const UPLOAD_DIR = path.join(
    process.cwd(),
    "public",
    "assets",
    "img",
    "food",
    "uploads"
);

function sanitize(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9.-]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 60);
}

export async function POST(req: NextRequest) {
    let form: FormData;
    try {
        form = await req.formData();
    } catch {
        return NextResponse.json({ error: "Expected multipart form data" }, { status: 400 });
    }

    const file = form.get("file");
    if (!(file instanceof File)) {
        return NextResponse.json({ error: "Missing 'file' field" }, { status: 400 });
    }

    const bytes = file.size;
    if (bytes > MAX_BYTES) {
        return NextResponse.json(
            { error: `File too large (max ${MAX_BYTES / 1024 / 1024} MB)` },
            { status: 413 }
        );
    }

    const ext = (file.name.split(".").pop() || "").toLowerCase();
    if (!ALLOWED_EXT.has(ext)) {
        return NextResponse.json(
            { error: `Unsupported file type: .${ext}` },
            { status: 415 }
        );
    }

    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    const base = sanitize(file.name.replace(/\.[^.]+$/, "")) || "image";
    const filename = `${Date.now()}-${base}.${ext}`;
    const filepath = path.join(UPLOAD_DIR, filename);

    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filepath, buffer);

    const url = `/assets/img/food/uploads/${filename}`;
    return NextResponse.json({ url, filename });
}
