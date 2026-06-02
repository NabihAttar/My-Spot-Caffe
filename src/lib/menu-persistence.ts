import { NextResponse } from "next/server";
import { isMenuPersistenceError } from "./menu-errors";

export function menuPersistenceErrorResponse(err: unknown): NextResponse {
    if (isMenuPersistenceError(err)) {
        return NextResponse.json(
            {
                error: err.message,
                code: "STORAGE_NOT_CONFIGURED",
            },
            { status: 503 }
        );
    }

    console.error("[menu-persistence]", err);

    if (err instanceof Error && err.message.trim()) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }

    return NextResponse.json({ error: "Failed to save menu data" }, { status: 500 });
}
