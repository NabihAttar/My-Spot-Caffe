import "@/assets/css/admin.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin · My Spot Café",
    robots: { index: false, follow: false },
};

/**
 * Admin segment layout — sibling to the root layout. We don't render a Header
 * or Footer here on purpose; pages decide whether to wrap in <AdminShell />
 * (dashboard etc.) or render a fullscreen layout (login page).
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
