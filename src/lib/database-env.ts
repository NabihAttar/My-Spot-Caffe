const PLACEHOLDER_HOST = /@HOST:5432/i;

export function isPlaceholderDatabaseUrl(url: string): boolean {
    const trimmed = url.trim();
    return (
        PLACEHOLDER_HOST.test(trimmed) ||
        trimmed.includes("@HOST:") ||
        trimmed.includes("USER:PASSWORD@")
    );
}

/** Pooled URL for Prisma Client at runtime (Vercel serverless). */
export function getRuntimeDatabaseUrl(): string {
    const configured = process.env.DATABASE_URL?.trim();
    if (configured && !isPlaceholderDatabaseUrl(configured)) {
        return configured;
    }

    return (
        process.env.POSTGRES_PRISMA_URL?.trim() ||
        process.env.POSTGRES_URL?.trim() ||
        ""
    );
}

/** Direct URL for migrations (bypasses PgBouncer). */
export function getMigrateDatabaseUrl(): string {
    return (
        process.env.POSTGRES_URL_NON_POOLING?.trim() ||
        process.env.DIRECT_URL?.trim() ||
        getRuntimeDatabaseUrl()
    );
}

/** Apply resolved runtime URL so Prisma Client can connect on Vercel. */
export function resolveDatabaseEnv(): void {
    const runtimeUrl = getRuntimeDatabaseUrl();
    if (runtimeUrl) {
        process.env.DATABASE_URL = runtimeUrl;
    }

    const directUrl = process.env.POSTGRES_URL_NON_POOLING?.trim();
    if (directUrl) {
        process.env.DIRECT_URL = directUrl;
    }
}

export function hasResolvedDatabaseUrl(): boolean {
    return Boolean(getRuntimeDatabaseUrl());
}
