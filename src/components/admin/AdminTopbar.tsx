"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Props {
    title: string;
    subtitle?: string;
    userName?: string | null;
    onToggleSidebar: () => void;
}

const AdminTopbar = ({ title, subtitle, userName, onToggleSidebar }: Props) => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            toast.success("Logged out");
            router.push("/admin/login");
            router.refresh();
        } catch {
            toast.error("Could not log out");
        }
    };

    const initials = (userName || "A").trim().charAt(0).toUpperCase();

    return (
        <header className="admin-topbar">
            <button
                type="button"
                className="admin-topbar__toggle"
                onClick={onToggleSidebar}
                aria-label="Toggle navigation"
            >
                <i className="fas fa-bars" aria-hidden />
            </button>

            <div>
                <h1 className="admin-topbar__title">{title}</h1>
                {subtitle && <p className="admin-topbar__subtitle">{subtitle}</p>}
            </div>

            <div className="admin-topbar__spacer" />

            <div className="admin-topbar__user">
                <span className="admin-topbar__user-badge">{initials}</span>
                <span>{userName || "Admin"}</span>
            </div>

            <button
                type="button"
                className="admin-btn admin-btn--ghost admin-btn--sm"
                onClick={handleLogout}
            >
                <i className="fas fa-sign-out-alt" aria-hidden /> Logout
            </button>
        </header>
    );
};

export default AdminTopbar;
