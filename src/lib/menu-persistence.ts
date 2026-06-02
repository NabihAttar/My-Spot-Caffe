import { NextResponse } from "next/server";
import { MenuPersistenceError } from "./db";

export function menuPersistenceErrorResponse(err: unknown): NextResponse {
    if (err instanceof MenuPersistenceError) {
        return NextResponse.json(
            {
                error: err.message,
                code: "STORAGE_NOT_CONFIGURED",
            },
            { status: 503 }
        );
    }

    console.error("[menu-persistence]", err);
    return NextResponse.json({ error: "Failed to save menu data" }, { status: 500 });
}
