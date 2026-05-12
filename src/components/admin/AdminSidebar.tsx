"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
    href: string;
    label: string;
    icon: string;
    group?: string;
}

const NAV: NavItem[] = [
    { href: "/admin/dashboard", label: "Dashboard", icon: "fas fa-th-large", group: "main" },
    { href: "/admin/products", label: "Products", icon: "fas fa-mug-hot", group: "menu" },
    { href: "/admin/categories", label: "Categories", icon: "fas fa-layer-group", group: "menu" },
    { href: "/admin/settings", label: "Settings", icon: "fas fa-cog", group: "system" },
];

interface Props {
    open: boolean;
    onClose: () => void;
}

const AdminSidebar = ({ open, onClose }: Props) => {
    const pathname = usePathname() || "";

    return (
        <aside className={`admin-sidebar ${open ? "is-open" : ""}`}>
            <div className="admin-sidebar__brand">
                <span className="admin-sidebar__brand-mark">
                    <i className="fas fa-mug-hot" aria-hidden />
                </span>
                <span className="admin-sidebar__brand-text">
                    My Spot Café
                    <small>Admin Panel</small>
                </span>
            </div>

            <div className="admin-sidebar__group-label">Main</div>
            <nav className="admin-sidebar__nav">
                {NAV.filter((n) => n.group === "main").map((n) => (
                    <Link
                        key={n.href}
                        href={n.href}
                        className={pathname.startsWith(n.href) ? "active" : ""}
                        onClick={onClose}
                    >
                        <i className={n.icon} aria-hidden />
                        <span>{n.label}</span>
                    </Link>
                ))}

                <div className="admin-sidebar__group-label">Menu</div>
                {NAV.filter((n) => n.group === "menu").map((n) => (
                    <Link
                        key={n.href}
                        href={n.href}
                        className={pathname.startsWith(n.href) ? "active" : ""}
                        onClick={onClose}
                    >
                        <i className={n.icon} aria-hidden />
                        <span>{n.label}</span>
                    </Link>
                ))}

                <div className="admin-sidebar__group-label">System</div>
                {NAV.filter((n) => n.group === "system").map((n) => (
                    <Link
                        key={n.href}
                        href={n.href}
                        className={pathname.startsWith(n.href) ? "active" : ""}
                        onClick={onClose}
                    >
                        <i className={n.icon} aria-hidden />
                        <span>{n.label}</span>
                    </Link>
                ))}

                <Link href="/food-menu" target="_blank" rel="noopener" onClick={onClose}>
                    <i className="fas fa-external-link-alt" aria-hidden />
                    <span>View Public Menu</span>
                </Link>
            </nav>

            <div className="admin-sidebar__footer">
                &copy; {new Date().getFullYear()} My Spot Café
            </div>
        </aside>
    );
};

export default AdminSidebar;
