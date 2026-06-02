/**
 * POST /api/upload (multipart/form-data, field name "file")
 *
 * Saves uploaded image to Vercel Blob when BLOB_READ_WRITE_TOKEN is set,
 * otherwise to /public/assets/img/food/uploads/ (local dev only).
 */

import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { put } from "@vercel/blob";
import { isVercelServerless } from "@/lib/server-paths";

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

    if (file.size > MAX_BYTES) {
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

    const base = sanitize(file.name.replace(/\.[^.]+$/, "")) || "image";
    const filename = `${Date.now()}-${base}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const blobToken = process.env.BLOB_READ_WRITE_TOKEN?.trim();
    if (blobToken || isVercelServerless()) {
        if (!blobToken) {
            return NextResponse.json(
                {
                    error:
                        "Image uploads on Vercel require Vercel Blob. Add Blob in Project → Storage and redeploy.",
                },
                { status: 503 }
            );
        }

        const pathname = `spotcaffe/uploads/${filename}`;
        const blob = await put(pathname, buffer, {
            access: "public",
            token: blobToken,
            addRandomSuffix: false,
            allowOverwrite: true,
            contentType: file.type || `image/${ext === "jpg" ? "jpeg" : ext}`,
        });

        return NextResponse.json({ url: blob.url, filename: blob.pathname });
    }

    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    const filepath = path.join(UPLOAD_DIR, filename);
    await fs.writeFile(filepath, buffer);

    const url = `/assets/img/food/uploads/${filename}`;
    return NextResponse.json({ url, filename });
}
