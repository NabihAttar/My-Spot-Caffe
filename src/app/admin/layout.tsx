import "@/assets/css/admin.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "Admin Dashboard | My Spot Caffe",
        template: "%s | My Spot Caffe Admin",
    },
    description:
        "Manage My Spot Caffe products, categories, prices, and menu content.",
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
        },
    },
};

/**
 * Admin segment layout — sibling to the root layout. We don't render a Header
 * or Footer here on purpose; pages decide whether to wrap in <AdminShell />
 * (dashboard etc.) or render a fullscreen layout (login page).
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
