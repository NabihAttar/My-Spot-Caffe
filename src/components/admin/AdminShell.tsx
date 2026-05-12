"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

interface Props {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

const AdminShell = ({ title, subtitle, children }: Props) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        fetch("/api/auth/me", { cache: "no-store" })
            .then((r) => r.json())
            .then((data: { user?: { name?: string } | null }) => {
                if (!cancelled) setUserName(data?.user?.name ?? null);
            })
            .catch(() => {});
        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <div className={`admin-shell ${sidebarOpen ? "has-mobile-sidebar" : ""}`}>
            <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="admin-main">
                <AdminTopbar
                    title={title}
                    subtitle={subtitle}
                    userName={userName}
                    onToggleSidebar={() => setSidebarOpen((v) => !v)}
                />
                <main className="admin-content">{children}</main>
            </div>
        </div>
    );
};

export default AdminShell;
