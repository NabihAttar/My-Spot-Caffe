"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AdminShell from "@/components/admin/AdminShell";
import Spinner from "@/components/admin/Spinner";
import EmptyState from "@/components/admin/EmptyState";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import CategoryFormModal from "@/components/admin/CategoryFormModal";
import { notifyMenuUpdated } from "@/components/admin/notifyMenuUpdated";
import type { Category } from "@/lib/menu-types";

const countProducts = (c: Category) =>
    (c.tabContent ?? []).reduce((sum, g) => sum + (g.tabData?.length ?? 0), 0);

interface ApiError {
    error?: string;
    productCount?: number;
}

const CategoriesPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [formOpen, setFormOpen] = useState(false);
    const [editing, setEditing] = useState<Category | null>(null);

    const [confirm, setConfirm] = useState<{
        cat: Category;
        force: boolean;
        message: string;
    } | null>(null);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [togglingId, setTogglingId] = useState<number | null>(null);

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

    const handleEdit = (c: Category) => {
        setEditing(c);
        setFormOpen(true);
    };

    const handleAdd = () => {
        setEditing(null);
        setFormOpen(true);
    };

    const handleSaved = () => {
        setFormOpen(false);
        load();
    };

    const handleDelete = (c: Category) => {
        const count = countProducts(c);
        if (count > 0) {
            setConfirm({
                cat: c,
                force: true,
                message: `Category "${c.tabTitle}" has ${count} product${count === 1 ? "" : "s"}. Deleting will also remove all of them. Continue?`,
            });
        } else {
            setConfirm({
                cat: c,
                force: false,
                message: `Delete category "${c.tabTitle}"? This action cannot be undone.`,
            });
        }
    };

    const performDelete = async () => {
        if (!confirm) return;
        setConfirmLoading(true);
        try {
            const url = `/api/categories/${confirm.cat.id}${confirm.force ? "?force=1" : ""}`;
            const res = await fetch(url, { method: "DELETE" });
            const data = (await res.json()) as ApiError;
            if (!res.ok) throw new Error(data.error || "Delete failed");
            toast.success("Category deleted");
            notifyMenuUpdated();
            setConfirm(null);
            load();
        } catch (e) {
            toast.error((e as Error).message);
        } finally {
            setConfirmLoading(false);
        }
    };

    const toggleHidden = async (c: Category) => {
        setTogglingId(c.id);
        try {
            const res = await fetch(`/api/categories/${c.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ hidden: !c.hidden }),
            });
            if (!res.ok) throw new Error("Update failed");
            toast.success(!c.hidden ? "Category hidden" : "Category visible");
            notifyMenuUpdated();
            load();
        } catch (e) {
            toast.error((e as Error).message);
        } finally {
            setTogglingId(null);
        }
    };

    const sorted = [...categories].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0)
    );

    return (
        <AdminShell
            title="Categories"
            subtitle="Organize your menu into sections"
        >
            <div className="admin-card">
                <div className="admin-card__header">
                    <div>
                        <h2 className="admin-card__title">All Categories</h2>
                        <p className="admin-card__subtitle">
                            {sorted.length} categor{sorted.length === 1 ? "y" : "ies"}
                        </p>
                    </div>
                    <div style={{ marginLeft: "auto" }}>
                        <button type="button" className="admin-btn" onClick={handleAdd}>
                            <i className="fas fa-plus" aria-hidden /> Add Category
                        </button>
                    </div>
                </div>

                <div className="admin-table-wrap">
                    {loading ? (
                        <Spinner large center />
                    ) : sorted.length === 0 ? (
                        <EmptyState
                            icon="fas fa-layer-group"
                            title="No categories yet"
                            description="Create your first menu category."
                            action={
                                <button
                                    type="button"
                                    className="admin-btn"
                                    onClick={handleAdd}
                                >
                                    <i className="fas fa-plus" aria-hidden /> Add Category
                                </button>
                            }
                        />
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Arabic</th>
                                    <th>Products</th>
                                    <th>Status</th>
                                    <th style={{ textAlign: "right" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sorted.map((c) => (
                                    <tr key={c.id}>
                                        <td>
                                            <strong>{c.tabTitle}</strong>
                                            {c.description && (
                                                <div
                                                    style={{
                                                        color: "var(--admin-text-muted)",
                                                        fontSize: 12,
                                                        marginTop: 2,
                                                    }}
                                                >
                                                    {c.description}
                                                </div>
                                            )}
                                        </td>
                                        <td dir="rtl" style={{ fontFamily: "inherit" }}>
                                            {c.nameAr || "—"}
                                        </td>
                                        <td>
                                            <span className="admin-badge admin-badge--primary">
                                                {countProducts(c)}
                                            </span>
                                        </td>
                                        <td>
                                            {c.hidden ? (
                                                <span className="admin-badge admin-badge--warning">
                                                    Hidden
                                                </span>
                                            ) : (
                                                <span className="admin-badge admin-badge--success">
                                                    Visible
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
                                                    onClick={() => toggleHidden(c)}
                                                    disabled={togglingId === c.id}
                                                    title={c.hidden ? "Show" : "Hide"}
                                                >
                                                    {togglingId === c.id ? (
                                                        <Spinner />
                                                    ) : c.hidden ? (
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
                                                    onClick={() => handleEdit(c)}
                                                >
                                                    <i className="fas fa-pen" aria-hidden /> Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    className="admin-btn admin-btn--danger admin-btn--sm"
                                                    onClick={() => handleDelete(c)}
                                                >
                                                    <i className="fas fa-trash" aria-hidden /> Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <CategoryFormModal
                open={formOpen}
                initial={editing}
                onClose={() => setFormOpen(false)}
                onSaved={handleSaved}
            />

            <ConfirmDialog
                open={!!confirm}
                title="Delete category"
                message={confirm?.message || ""}
                confirmLabel="Delete"
                danger
                loading={confirmLoading}
                onCancel={() => setConfirm(null)}
                onConfirm={performDelete}
            />
        </AdminShell>
    );
};

export default CategoriesPage;
