/**
 * Broadcast a "menu changed" signal so the public menu page can refetch.
 *
 * Listeners hook the `storage` event on `MENU_UPDATED_KEY`, which fires in
 * every other tab on the same origin whenever this function runs.
 *
 * Safe to call from anywhere in the admin UI; it's a no-op on the server.
 */
export const MENU_UPDATED_KEY = "spotcaffe:menu-updated";

export function notifyMenuUpdated(): void {
    if (typeof window === "undefined") return;
    try {
        window.localStorage.setItem(MENU_UPDATED_KEY, String(Date.now()));
    } catch {
        // localStorage might be disabled (private mode, quota). Ignore.
    }
}
