"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AdminShell from "@/components/admin/AdminShell";
import Spinner from "@/components/admin/Spinner";
import EmptyState from "@/components/admin/EmptyState";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import ProductFormModal from "@/components/admin/ProductFormModal";
import { notifyMenuUpdated } from "@/components/admin/notifyMenuUpdated";
import type { Category, Product, ProductRow } from "@/lib/menu-types";

type AvailabilityFilter = "all" | "active" | "hidden";

const resolveImg = (thumb: string): string => {
    if (!thumb) return "";
    if (thumb.startsWith("http") || thumb.startsWith("/")) return thumb;
    return `/assets/img/food/${thumb}`;
};

const formatPrice = (p: Product): string => {
    const parts: string[] = [];
    if (p.price && p.price > 0) parts.push(`$${p.price}`);
    if (p.priceFull && p.priceFull > 0) parts.push(`$${p.priceFull}`);
    if (parts.length === 0) return "—";
    return parts.join(" / ");
};

const ProductsPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<string>("");
    const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityFilter>("all");

    const [formOpen, setFormOpen] = useState(false);
    const [editing, setEditing] = useState<(Product & { categoryId: number }) | null>(null);

    const [confirm, setConfirm] = useState<ProductRow | null>(null);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [togglingId, setTogglingId] = useState<number | null>(null);
    const [movingId, setMovingId] = useState<number | null>(null);
    const [reorderingId, setReorderingId] = useState<number | null>(null);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/menu", { cache: "no-store" });
            const data = (await res.json()) as { data?: Category[] };
            setCategories(data.data ?? []);
        } catch (e) {
            toast.error((e as Error).message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const allRows: ProductRow[] = useMemo(() => {
        const out: ProductRow[] = [];
        for (const cat of categories) {
            for (const group of cat.tabContent ?? []) {
                for (const p of group.tabData ?? []) {
                    out.push({
                        ...p,
                        categoryId: cat.id,
                        categoryTitle: cat.tabTitle,
                    });
                }
            }
        }
        return out;
    }, [categories]);

    const categoryOrderMap = useMemo(
        () => new Map(categories.map((c) => [c.id, c.order ?? 0])),
        [categories]
    );

    const productRankInCategory = useMemo(() => {
        const rank = new Map<string, { index: number; count: number }>();
        for (const cat of categories) {
            const ids = (cat.tabContent ?? [])
                .flatMap((g) => g.tabData ?? [])
                .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                .map((p) => p.id);
            ids.forEach((id, index) => {
                rank.set(`${cat.id}-${id}`, { index, count: ids.length });
            });
        }
        return rank;
    }, [categories]);

    const visibleRows = useMemo(() => {
        const q = search.trim().toLowerCase();
        const filtered = allRows.filter((p) => {
            if (categoryFilter && String(p.categoryId) !== categoryFilter) return false;
            if (availabilityFilter === "active" && p.available === false) return false;
            if (availabilityFilter === "hidden" && p.available !== false) return false;
            if (q) {
                const hay = `${p.name} ${p.description ?? ""} ${(p.tags ?? []).join(" ")}`.toLowerCase();
                if (!hay.includes(q)) return false;
            }
            return true;
        });
        return filtered.sort((a, b) => {
            const catOrder =
                (categoryOrderMap.get(a.categoryId) ?? 0) -
                (categoryOrderMap.get(b.categoryId) ?? 0);
            if (catOrder !== 0) return catOrder;
            return (a.order ?? 0) - (b.order ?? 0);
        });
    }, [allRows, search, categoryFilter, availabilityFilter, categoryOrderMap]);

    const handleAdd = () => {
        if (categories.length === 0) {
            toast.warn("Create a category first.");
            return;
        }
        setEditing(null);
        setFormOpen(true);
    };

    const handleEdit = (row: ProductRow) => {
        setEditing({ ...row });
        setFormOpen(true);
    };

    const handleSaved = () => {
        setFormOpen(false);
        load();
    };

    const performDelete = async () => {
        if (!confirm) return;
        setConfirmLoading(true);
        try {
            const res = await fetch(`/api/products/${confirm.id}`, { method: "DELETE" });
            if (!res.ok) {
                const data = (await res.json()) as { error?: string };
                throw new Error(data.error || "Delete failed");
            }
            toast.success("Product deleted");
            notifyMenuUpdated();
            setConfirm(null);
            load();
        } catch (e) {
            toast.error((e as Error).message);
        } finally {
            setConfirmLoading(false);
        }
    };

    const moveToCategory = async (p: ProductRow, targetCategoryId: number) => {
        if (targetCategoryId === p.categoryId) return;
        setMovingId(p.id);
        try {
            const res = await fetch(`/api/products/${p.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ categoryId: targetCategoryId }),
            });
            if (!res.ok) {
                const data = (await res.json()) as { error?: string };
                throw new Error(data.error || "Move failed");
            }
            const target = categories.find((c) => c.id === targetCategoryId);
            toast.success(`Moved to ${target?.tabTitle ?? "category"}`);
            notifyMenuUpdated();
            load();
        } catch (e) {
            toast.error((e as Error).message);
        } finally {
            setMovingId(null);
        }
    };

    const reorderProduct = async (p: ProductRow, direction: "up" | "down") => {
        setReorderingId(p.id);
        try {
            const res = await fetch("/api/products/reorder", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    categoryId: p.categoryId,
                    productId: p.id,
                    direction,
                }),
            });
            if (!res.ok) {
                const data = (await res.json()) as { error?: string };
                throw new Error(data.error || "Reorder failed");
            }
            notifyMenuUpdated();
            load();
        } catch (e) {
            toast.error((e as Error).message);
        } finally {
            setReorderingId(null);
        }
    };

    const toggleAvailability = async (p: ProductRow) => {
        setTogglingId(p.id);
        try {
            const res = await fetch(`/api/products/${p.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ available: !(p.available !== false) }),
            });
            if (!res.ok) throw new Error("Update failed");
            toast.success(
                p.available === false ? "Product made available" : "Product hidden"
            );
            notifyMenuUpdated();
            load();
        } catch (e) {
            toast.error((e as Error).message);
        } finally {
            setTogglingId(null);
        }
    };

    return (
        <AdminShell title="Products" subtitle="Manage your menu items">
            <div className="admin-card">
                <div className="admin-card__header">
                    <div>
                        <h2 className="admin-card__title">All Products</h2>
                        <p className="admin-card__subtitle">
                            {visibleRows.length} of {allRows.length} shown · use arrows to
                            rank within a category · menu order matches here
                        </p>
                    </div>
                    <div style={{ marginLeft: "auto" }}>
                        <button type="button" className="admin-btn" onClick={handleAdd}>
                            <i className="fas fa-plus" aria-hidden /> Add Product
                        </button>
                    </div>
                </div>

                <div className="admin-card__body">
                    <div className="admin-filter-bar">
                        <div className="grow">
                            <input
                                className="admin-input"
                                placeholder="Search by name, description, or tag…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <select
                            className="admin-select"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            style={{ maxWidth: 220 }}
                        >
                            <option value="">All categories</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.tabTitle}
                                </option>
                            ))}
                        </select>
                        <select
                            className="admin-select"
                            value={availabilityFilter}
                            onChange={(e) =>
                                setAvailabilityFilter(e.target.value as AvailabilityFilter)
                            }
                            style={{ maxWidth: 180 }}
                        >
                            <option value="all">All statuses</option>
                            <option value="active">Active only</option>
                            <option value="hidden">Hidden only</option>
                        </select>
                        {(search || categoryFilter || availabilityFilter !== "all") && (
                            <button
                                type="button"
                                className="admin-btn admin-btn--ghost admin-btn--sm"
                                onClick={() => {
                                    setSearch("");
                                    setCategoryFilter("");
                                    setAvailabilityFilter("all");
                                }}
                            >
                                <i className="fas fa-undo" aria-hidden /> Clear
                            </button>
                        )}
                    </div>
                </div>

                <div className="admin-table-wrap">
                    {loading ? (
                        <Spinner large center />
                    ) : visibleRows.length === 0 ? (
                        <EmptyState
                            icon="fas fa-mug-hot"
                            title={allRows.length === 0 ? "No products yet" : "No matching products"}
                            description={
                                allRows.length === 0
                                    ? "Add your first product to populate the menu."
                                    : "Try clearing filters or changing your search."
                            }
                            action={
                                allRows.length === 0 ? (
                                    <button
                                        type="button"
                                        className="admin-btn"
                                        onClick={handleAdd}
                                    >
                                        <i className="fas fa-plus" aria-hidden /> Add Product
                                    </button>
                                ) : null
                            }
                        />
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th style={{ width: 60 }} />
                                    <th style={{ width: 56 }}>Rank</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Tags</th>
                                    <th>Status</th>
                                    <th style={{ textAlign: "right" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {visibleRows.map((p) => {
                                    const rank = productRankInCategory.get(
                                        `${p.categoryId}-${p.id}`
                                    );
                                    const canUp = (rank?.index ?? 0) > 0;
                                    const canDown =
                                        rank !== undefined &&
                                        rank.index < rank.count - 1;
                                    const busy =
                                        movingId === p.id || reorderingId === p.id;

                                    return (
                                    <tr key={`${p.categoryId}-${p.id}`}>
                                        <td>
                                            <div className="admin-table__thumb">
                                                {p.thumb ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img src={resolveImg(p.thumb)} alt="" />
                                                ) : (
                                                    <i className="fas fa-image" aria-hidden />
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="admin-order-controls">
                                                <button
                                                    type="button"
                                                    className="admin-btn admin-btn--ghost admin-btn--icon"
                                                    title="Move up in category"
                                                    disabled={!canUp || busy}
                                                    onClick={() =>
                                                        reorderProduct(p, "up")
                                                    }
                                                >
                                                    {reorderingId === p.id ? (
                                                        <Spinner />
                                                    ) : (
                                                        <i
                                                            className="fas fa-chevron-up"
                                                            aria-hidden
                                                        />
                                                    )}
                                                </button>
                                                <button
                                                    type="button"
                                                    className="admin-btn admin-btn--ghost admin-btn--icon"
                                                    title="Move down in category"
                                                    disabled={!canDown || busy}
                                                    onClick={() =>
                                                        reorderProduct(p, "down")
                                                    }
                                                >
                                                    <i
                                                        className="fas fa-chevron-down"
                                                        aria-hidden
                                                    />
                                                </button>
                                            </div>
                                            {rank && (
                                                <div
                                                    style={{
                                                        fontSize: 11,
                                                        color: "var(--admin-text-muted)",
                                                        textAlign: "center",
                                                        marginTop: 4,
                                                    }}
                                                >
                                                    {rank.index + 1}/{rank.count}
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <strong>{p.name}</strong>
                                            {p.featured && (
                                                <span
                                                    className="admin-badge admin-badge--warning"
                                                    style={{ marginLeft: 6 }}
                                                >
                                                    <i className="fas fa-star" aria-hidden /> Featured
                                                </span>
                                            )}
                                            {p.leftInfo && (
                                                <div
                                                    style={{
                                                        color: "var(--admin-text-muted)",
                                                        fontSize: 12,
                                                        marginTop: 2,
                                                    }}
                                                >
                                                    {p.leftInfo}
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <select
                                                className="admin-select admin-move-select"
                                                value={p.categoryId}
                                                disabled={busy || categories.length < 2}
                                                title="Move to another category"
                                                onChange={(e) =>
                                                    moveToCategory(
                                                        p,
                                                        Number(e.target.value)
                                                    )
                                                }
                                            >
                                                {categories.map((c) => (
                                                    <option key={c.id} value={c.id}>
                                                        {c.tabTitle}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            {formatPrice(p)}
                                            {typeof p.discountPrice === "number" &&
                                                p.discountPrice > 0 && (
                                                    <div
                                                        style={{
                                                            color: "var(--admin-accent)",
                                                            fontSize: 12,
                                                        }}
                                                    >
                                                        Sale: ${p.discountPrice}
                                                    </div>
                                                )}
                                        </td>
                                        <td>
                                            {(p.tags ?? []).length === 0 ? (
                                                <span style={{ color: "var(--admin-text-muted)" }}>
                                                    —
                                                </span>
                                            ) : (
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexWrap: "wrap",
                                                        gap: 4,
                                                    }}
                                                >
                                                    {p.tags!.map((t) => (
                                                        <span
                                                            key={t}
                                                            className="admin-badge admin-badge--info"
                                                        >
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
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
                                        <td style={{ textAlign: "right" }}>
                                            <div
                                                className="admin-btn-group"
                                                style={{ justifyContent: "flex-end" }}
                                            >
                                                <button
                                                    type="button"
                                                    className="admin-btn admin-btn--ghost admin-btn--sm"
                                                    onClick={() => toggleAvailability(p)}
                                                    disabled={togglingId === p.id}
                                                    title={
                                                        p.available === false
                                                            ? "Make available"
                                                            : "Hide"
                                                    }
                                                >
                                                    {togglingId === p.id ? (
                                                        <Spinner />
                                                    ) : p.available === false ? (
                                                        <>
                                                            <i className="fas fa-eye" aria-hidden /> Show
                                                        </>
                                                    ) : (
                                                        <>
                                                            <i className="fas fa-eye-slash" aria-hidden /> Hide
                                                        </>
                                                    )}
                                                </button>
                                                <button
                                                    type="button"
                                                    className="admin-btn admin-btn--ghost admin-btn--sm"
                                                    onClick={() => handleEdit(p)}
                                                >
                                                    <i className="fas fa-pen" aria-hidden /> Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    className="admin-btn admin-btn--danger admin-btn--sm"
                                                    onClick={() => setConfirm(p)}
                                                >
                                                    <i className="fas fa-trash" aria-hidden /> Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <ProductFormModal
                open={formOpen}
                categories={categories}
                initial={editing}
                defaultCategoryId={
                    categoryFilter ? Number(categoryFilter) : categories[0]?.id
                }
                onClose={() => setFormOpen(false)}
                onSaved={handleSaved}
            />

            <ConfirmDialog
                open={!!confirm}
                title="Delete product"
                message={
                    confirm
                        ? `Delete "${confirm.name}"? This action cannot be undone.`
                        : ""
                }
                confirmLabel="Delete"
                danger
                loading={confirmLoading}
                onCancel={() => setConfirm(null)}
                onConfirm={performDelete}
            />
        </AdminShell>
    );
};

export default ProductsPage;
