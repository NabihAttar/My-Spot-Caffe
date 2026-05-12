"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import StatCard from "@/components/admin/StatCard";
import Spinner from "@/components/admin/Spinner";
import EmptyState from "@/components/admin/EmptyState";
import type { Menu, Product, Category } from "@/lib/menu-types";

interface FlatProduct extends Product {
    categoryId: number;
    categoryTitle: string;
}

const fmtDate = (iso?: string): string => {
    if (!iso) return "—";
    try {
        return new Date(iso).toLocaleString();
    } catch {
        return iso;
    }
};

const DashboardPage = () => {
    const [menu, setMenu] = useState<Menu>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const res = await fetch("/api/menu", { cache: "no-store" });
                const data = (await res.json()) as { data?: Menu };
                if (!cancelled) setMenu(data?.data ?? []);
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    const flatProducts: FlatProduct[] = useMemo(() => {
        const out: FlatProduct[] = [];
        for (const cat of menu) {
            for (const group of cat.tabContent ?? []) {
                for (const p of group.tabData ?? []) {
                    out.push({ ...p, categoryId: cat.id, categoryTitle: cat.tabTitle });
                }
            }
        }
        return out;
    }, [menu]);

    const stats = useMemo(() => {
        const totalCategories = menu.length;
        const hiddenCategories = menu.filter((c) => c.hidden).length;
        const visibleCategories = totalCategories - hiddenCategories;
        const totalProducts = flatProducts.length;
        const availableProducts = flatProducts.filter((p) => p.available !== false).length;
        const hiddenProducts = totalProducts - availableProducts;
        const featuredProducts = flatProducts.filter((p) => p.featured).length;
        return {
            totalCategories,
            visibleCategories,
            hiddenCategories,
            totalProducts,
            availableProducts,
            hiddenProducts,
            featuredProducts,
        };
    }, [menu, flatProducts]);

    const latestProducts = useMemo(() => {
        return [...flatProducts]
            .sort((a, b) => {
                const aT = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const bT = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return bT - aT;
            })
            .slice(0, 6);
    }, [flatProducts]);

    const productsByCategory: { category: Category; count: number }[] = useMemo(() => {
        return menu.map((c) => ({
            category: c,
            count: (c.tabContent ?? []).reduce(
                (sum, g) => sum + (g.tabData?.length ?? 0),
                0
            ),
        }));
    }, [menu]);

    return (
        <AdminShell
            title="Dashboard"
            subtitle="Overview of your café menu"
        >
            {loading ? (
                <Spinner large center />
            ) : (
                <>
                    <div className="admin-grid admin-grid--stats" style={{ marginBottom: 20 }}>
                        <StatCard
                            icon="fas fa-layer-group"
                            label="Total Categories"
                            value={stats.totalCategories}
                            variant="primary"
                        />
                        <StatCard
                            icon="fas fa-mug-hot"
                            label="Total Products"
                            value={stats.totalProducts}
                            variant="accent"
                        />
                        <StatCard
                            icon="fas fa-check-circle"
                            label="Active Products"
                            value={stats.availableProducts}
                            variant="success"
                        />
                        <StatCard
                            icon="fas fa-eye-slash"
                            label="Hidden / Unavailable"
                            value={stats.hiddenProducts}
                            variant="danger"
                        />
                        <StatCard
                            icon="fas fa-star"
                            label="Featured Products"
                            value={stats.featuredProducts}
                            variant="warning"
                        />
                        <StatCard
                            icon="fas fa-eye"
                            label="Visible Categories"
                            value={stats.visibleCategories}
                            variant="info"
                        />
                    </div>

                    <div className="admin-grid admin-grid--two">
                        <div className="admin-card">
                            <div className="admin-card__header">
                                <div>
                                    <h2 className="admin-card__title">Quick Actions</h2>
                                    <p className="admin-card__subtitle">
                                        Jump straight into managing the menu.
                                    </p>
                                </div>
                            </div>
                            <div className="admin-card__body">
                                <div className="admin-btn-group">
                                    <Link href="/admin/products" className="admin-btn">
                                        <i className="fas fa-plus" aria-hidden /> Add Product
                                    </Link>
                                    <Link href="/admin/categories" className="admin-btn admin-btn--accent">
                                        <i className="fas fa-plus" aria-hidden /> Add Category
                                    </Link>
                                    <Link href="/food-menu" target="_blank" rel="noopener" className="admin-btn admin-btn--ghost">
                                        <i className="fas fa-external-link-alt" aria-hidden /> View Public Menu
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="admin-card">
                            <div className="admin-card__header">
                                <div>
                                    <h2 className="admin-card__title">Products by Category</h2>
                                    <p className="admin-card__subtitle">
                                        Distribution across the menu.
                                    </p>
                                </div>
                            </div>
                            <div className="admin-card__body">
                                {productsByCategory.length === 0 ? (
                                    <EmptyState
                                        icon="fas fa-layer-group"
                                        title="No categories yet"
                                        description="Create your first category to get started."
                                    />
                                ) : (
                                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                        {productsByCategory.map(({ category, count }) => {
                                            const max = Math.max(
                                                1,
                                                ...productsByCategory.map((p) => p.count)
                                            );
                                            const pct = Math.round((count / max) * 100);
                                            return (
                                                <div key={category.id}>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            fontSize: 13,
                                                            marginBottom: 4,
                                                        }}
                                                    >
                                                        <span>
                                                            <strong>{category.tabTitle}</strong>
                                                            {category.hidden && (
                                                                <span
                                                                    className="admin-badge admin-badge--warning"
                                                                    style={{ marginLeft: 8 }}
                                                                >
                                                                    Hidden
                                                                </span>
                                                            )}
                                                        </span>
                                                        <span style={{ color: "var(--admin-text-muted)" }}>
                                                            {count}
                                                        </span>
                                                    </div>
                                                    <div
                                                        style={{
                                                            background: "var(--admin-surface-alt)",
                                                            height: 8,
                                                            borderRadius: 999,
                                                            overflow: "hidden",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                width: `${pct}%`,
                                                                height: "100%",
                                                                background:
                                                                    "linear-gradient(90deg, var(--admin-primary), var(--admin-accent))",
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="admin-card" style={{ marginTop: 20 }}>
                        <div className="admin-card__header">
                            <div>
                                <h2 className="admin-card__title">Latest Products</h2>
                                <p className="admin-card__subtitle">
                                    Most recently added or updated items.
                                </p>
                            </div>
                            <div style={{ marginLeft: "auto" }}>
                                <Link href="/admin/products" className="admin-btn admin-btn--ghost admin-btn--sm">
                                    View all
                                </Link>
                            </div>
                        </div>
                        <div className="admin-table-wrap">
                            {latestProducts.length === 0 ? (
                                <EmptyState
                                    icon="fas fa-mug-hot"
                                    title="No products yet"
                                    description="Add your first product to get started."
                                    action={
                                        <Link href="/admin/products" className="admin-btn">
                                            <i className="fas fa-plus" aria-hidden /> Add Product
                                        </Link>
                                    }
                                />
                            ) : (
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Category</th>
                                            <th>Price</th>
                                            <th>Status</th>
                                            <th>Added</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {latestProducts.map((p) => (
                                            <tr key={`${p.categoryId}-${p.id}`}>
                                                <td>
                                                    <strong>{p.name}</strong>
                                                </td>
                                                <td>{p.categoryTitle}</td>
                                                <td>
                                                    {p.priceFull ? `$${p.priceFull}` : p.price ? `$${p.price}` : "—"}
                                                </td>
                                                <td>
                                                    {p.available === false ? (
                                                        <span className="admin-badge admin-badge--danger">
                                                            Hidden
                                                        </span>
                                                    ) : (
                                                        <span className="admin-badge admin-badge--success">
                                                            Active
                                                        </span>
                                                    )}
                                                </td>
                                                <td style={{ color: "var(--admin-text-muted)" }}>
                                                    {fmtDate(p.createdAt)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </>
            )}
        </AdminShell>
    );
};

export default DashboardPage;
