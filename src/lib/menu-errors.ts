export const STORAGE_NOT_CONFIGURED = "STORAGE_NOT_CONFIGURED";

export class MenuPersistenceError extends Error {
    readonly code = STORAGE_NOT_CONFIGURED;

    constructor(message: string) {
        super(message);
        this.name = "MenuPersistenceError";
    }
}

export function isMenuPersistenceError(err: unknown): err is MenuPersistenceError {
    if (err instanceof MenuPersistenceError) return true;
    if (!(err instanceof Error)) return false;
    return err.name === "MenuPersistenceError" || err.message.includes("Project → Storage");
}
