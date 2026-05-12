"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import ImagePicker from "./ImagePicker";
import { notifyMenuUpdated } from "./notifyMenuUpdated";
import type { Category } from "@/lib/menu-types";

interface Props {
    open: boolean;
    initial?: Category | null;
    onClose: () => void;
    onSaved: (category: Category) => void;
}

interface FormState {
    tabTitle: string;
    nameAr: string;
    description: string;
    tabThumb: string;
    icon: string;
    order: string;
    hidden: boolean;
}

const empty: FormState = {
    tabTitle: "",
    nameAr: "",
    description: "",
    tabThumb: "coffe.png",
    icon: "",
    order: "",
    hidden: false,
};

const CategoryFormModal = ({ open, initial, onClose, onSaved }: Props) => {
    const [form, setForm] = useState<FormState>(empty);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!open) return;
        if (initial) {
            setForm({
                tabTitle: initial.tabTitle ?? "",
                nameAr: initial.nameAr ?? "",
                description: initial.description ?? "",
                tabThumb: initial.tabThumb ?? "",
                icon: initial.icon ?? "",
                order: typeof initial.order === "number" ? String(initial.order) : "",
                hidden: !!initial.hidden,
            });
        } else {
            setForm(empty);
        }
        setErrors({});
    }, [open, initial]);

    if (!open) return null;

    const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.tabTitle.trim()) e.tabTitle = "Name is required";
        if (form.order && Number.isNaN(Number(form.order))) e.order = "Must be a number";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault();
        if (!validate()) return;
        setSaving(true);
        try {
            const payload = {
                tabTitle: form.tabTitle.trim(),
                nameAr: form.nameAr.trim() || undefined,
                description: form.description.trim() || undefined,
                tabThumb: form.tabThumb.trim() || undefined,
                icon: form.icon.trim() || undefined,
                order: form.order ? Number(form.order) : undefined,
                hidden: form.hidden,
            };
            const url = initial ? `/api/categories/${initial.id}` : "/api/categories";
            const method = initial ? "PATCH" : "POST";
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = (await res.json()) as { data?: Category; error?: string };
            if (!res.ok) throw new Error(data.error || "Save failed");
            toast.success(initial ? "Category updated" : "Category created");
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
            <form className="admin-modal" onSubmit={handleSubmit} noValidate>
                <div className="admin-modal__header">
                    <span className="admin-modal__title">
                        {initial ? "Edit Category" : "Add Category"}
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
                        <div className="admin-field full">
                            <label htmlFor="cat-name">
                                Category Name <span className="req">*</span>
                            </label>
                            <input
                                id="cat-name"
                                className="admin-input"
                                value={form.tabTitle}
                                onChange={(e) => update("tabTitle", e.target.value)}
                                placeholder="e.g. Hot Coffee"
                            />
                            {errors.tabTitle && <span className="error">{errors.tabTitle}</span>}
                        </div>

                        <div className="admin-field">
                            <label htmlFor="cat-ar">Name (Arabic)</label>
                            <input
                                id="cat-ar"
                                className="admin-input"
                                value={form.nameAr}
                                onChange={(e) => update("nameAr", e.target.value)}
                                placeholder="اختياري"
                                dir="rtl"
                            />
                        </div>

                        <div className="admin-field">
                            <label htmlFor="cat-order">Display Order</label>
                            <input
                                id="cat-order"
                                className="admin-input"
                                type="number"
                                value={form.order}
                                onChange={(e) => update("order", e.target.value)}
                                placeholder="0"
                            />
                            {errors.order && <span className="error">{errors.order}</span>}
                            <span className="hint">Lower numbers appear first.</span>
                        </div>

                        <div className="admin-field full">
                            <label htmlFor="cat-desc">Description</label>
                            <textarea
                                id="cat-desc"
                                className="admin-textarea"
                                value={form.description}
                                onChange={(e) => update("description", e.target.value)}
                                placeholder="Short description (optional)"
                            />
                        </div>

                        <div className="admin-field full">
                            <label>Category Image / Banner</label>
                            <ImagePicker
                                value={form.tabThumb}
                                onChange={(v) => update("tabThumb", v)}
                                basePath="/assets/img/thumb/"
                            />
                            <span className="hint">
                                Banner image shown on the public menu. Defaults to existing thumbnails.
                            </span>
                        </div>

                        <div className="admin-field full">
                            <label className="admin-checkbox">
                                <input
                                    type="checkbox"
                                    checked={form.hidden}
                                    onChange={(e) => update("hidden", e.target.checked)}
                                />
                                Hide this category from the public menu
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

export default CategoryFormModal;
