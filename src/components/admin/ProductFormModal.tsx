"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { notifyMenuUpdated } from "./notifyMenuUpdated";
import type { Category, Product } from "@/lib/menu-types";

type ProductWithCategory = Product & { categoryId: number };

interface Props {
    open: boolean;
    categories: Category[];
    /** Initial product (with categoryId) for edit mode. Null/undefined for create. */
    initial?: ProductWithCategory | null;
    /** Preselected category id for new products. */
    defaultCategoryId?: number;
    onClose: () => void;
    onSaved: (product: ProductWithCategory) => void;
}

interface FormState {
    categoryId: string;
    name: string;
    priceFull: string;
    leftInfo: string;
    order: string;
    available: boolean;
    featured: boolean;
}

const empty: FormState = {
    categoryId: "",
    name: "",
    priceFull: "",
    leftInfo: "",
    order: "",
    available: true,
    featured: false,
};

const ProductFormModal = ({
    open,
    categories,
    initial,
    defaultCategoryId,
    onClose,
    onSaved,
}: Props) => {
    const [form, setForm] = useState<FormState>(empty);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!open) return;
        if (initial) {
            setForm({
                categoryId: String(initial.categoryId),
                name: initial.name ?? "",
                priceFull: initial.priceFull ? String(initial.priceFull) : "",
                leftInfo: initial.leftInfo ?? "",
                order: typeof initial.order === "number" ? String(initial.order) : "",
                available: initial.available !== false,
                featured: !!initial.featured,
            });
        } else {
            setForm({
                ...empty,
                categoryId:
                    defaultCategoryId !== undefined
                        ? String(defaultCategoryId)
                        : categories[0]?.id !== undefined
                        ? String(categories[0].id)
                        : "",
            });
        }
        setErrors({});
    }, [open, initial, defaultCategoryId, categories]);

    if (!open) return null;

    const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.name.trim()) e.name = "Name is required";
        if (!form.categoryId) e.categoryId = "Select a category";
        if (!form.priceFull.trim()) {
            e.priceFull = "Price is required";
        } else if (Number.isNaN(Number(form.priceFull))) {
            e.priceFull = "Must be a number";
        } else if (Number(form.priceFull) <= 0) {
            e.priceFull = "Must be greater than 0";
        }
        if (form.order && Number.isNaN(Number(form.order))) {
            e.order = "Must be a number";
        }
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault();
        if (!validate()) return;
        setSaving(true);
        try {
            const payload: Partial<Product> & { categoryId: number } = {
                categoryId: Number(form.categoryId),
                name: form.name.trim(),
                priceFull: form.priceFull ? Number(form.priceFull) : 0,
                leftInfo: form.leftInfo,
                order: form.order ? Number(form.order) : undefined,
                available: form.available,
                featured: form.featured,
            };
            const url = initial ? `/api/products/${initial.id}` : "/api/products";
            const method = initial ? "PATCH" : "POST";
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = (await res.json()) as { data?: ProductWithCategory; error?: string };
            if (!res.ok) throw new Error(data.error || "Save failed");
            toast.success(initial ? "Product updated" : "Product created");
            notifyMenuUpdated();
            if (data.data) onSaved(data.data);
        } catch (e) {
            toast.error((e as Error).message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div
            className="admin-modal-backdrop"
            onClick={(e) => {
                if (e.target === e.currentTarget && !saving) onClose();
            }}
        >
            <form
                className="admin-modal"
                onSubmit={handleSubmit}
                noValidate
                style={{ maxWidth: 720 }}
            >
                <div className="admin-modal__header">
                    <span className="admin-modal__title">
                        {initial ? "Edit Product" : "Add Product"}
                    </span>
                    <button
                        type="button"
                        className="admin-modal__close"
                        onClick={onClose}
                        disabled={saving}
                        aria-label="Close"
                    >
                        <i className="fas fa-times" aria-hidden />
                    </button>
                </div>

                <div className="admin-modal__body">
                    <div className="admin-form-grid">
                        <div className="admin-field">
                            <label htmlFor="p-name">
                                Product Name <span className="req">*</span>
                            </label>
                            <input
                                id="p-name"
                                className="admin-input"
                                value={form.name}
                                onChange={(e) => update("name", e.target.value)}
                                placeholder="e.g. Cappuccino"
                            />
                            {errors.name && <span className="error">{errors.name}</span>}
                        </div>

                        <div className="admin-field">
                            <label htmlFor="p-cat">
                                Category <span className="req">*</span>
                            </label>
                            <select
                                id="p-cat"
                                className="admin-select"
                                value={form.categoryId}
                                onChange={(e) => update("categoryId", e.target.value)}
                            >
                                <option value="">— select category —</option>
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.tabTitle}
                                    </option>
                                ))}
                            </select>
                            {errors.categoryId && <span className="error">{errors.categoryId}</span>}
                        </div>

                        <div className="admin-field">
                            <label htmlFor="p-price-full">
                                Price <span className="req">*</span>
                            </label>
                            <input
                                id="p-price-full"
                                className="admin-input"
                                type="number"
                                step="0.01"
                                min="0"
                                value={form.priceFull}
                                onChange={(e) => update("priceFull", e.target.value)}
                                placeholder="0"
                            />
                            {errors.priceFull && <span className="error">{errors.priceFull}</span>}
                            <span className="hint">Main displayed price on the menu.</span>
                        </div>

                        <div className="admin-field full">
                            <label htmlFor="p-left">Left Info / Description tag</label>
                            <input
                                id="p-left"
                                className="admin-input"
                                value={form.leftInfo}
                                onChange={(e) => update("leftInfo", e.target.value)}
                                placeholder="e.g. Smooth and balanced"
                            />
                            <span className="hint">Shown on the public menu under the name.</span>
                        </div>

                        <div className="admin-field">
                            <label htmlFor="p-order">Display Order</label>
                            <input
                                id="p-order"
                                className="admin-input"
                                type="number"
                                value={form.order}
                                onChange={(e) => update("order", e.target.value)}
                                placeholder="0"
                            />
                            {errors.order && <span className="error">{errors.order}</span>}
                        </div>

                        <div className="admin-field">
                            <label className="admin-checkbox">
                                <input
                                    type="checkbox"
                                    checked={form.available}
                                    onChange={(e) => update("available", e.target.checked)}
                                />
                                Available on public menu
                            </label>
                        </div>

                        <div className="admin-field">
                            <label className="admin-checkbox">
                                <input
                                    type="checkbox"
                                    checked={form.featured}
                                    onChange={(e) => update("featured", e.target.checked)}
                                />
                                Featured / Popular
                            </label>
                        </div>
                    </div>
                </div>

                <div className="admin-modal__footer">
                    <button
                        type="button"
                        className="admin-btn admin-btn--ghost"
                        onClick={onClose}
                        disabled={saving}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="admin-btn" disabled={saving}>
                        {saving ? (
                            <>
                                <Spinner /> Saving…
                            </>
                        ) : (
                            <>
                                <i className="fas fa-save" aria-hidden /> Save
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductFormModal;
