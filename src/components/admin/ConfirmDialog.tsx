"use client";

import { useEffect } from "react";
import Spinner from "./Spinner";

interface Props {
    open: boolean;
    title: string;
    message: string | React.ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    loading?: boolean;
    danger?: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

const ConfirmDialog = ({
    open,
    title,
    message,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    loading = false,
    danger = false,
    onCancel,
    onConfirm,
}: Props) => {
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" && !loading) onCancel();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, loading, onCancel]);

    if (!open) return null;

    return (
        <div
            className="admin-modal-backdrop"
            onClick={(e) => {
                if (e.target === e.currentTarget && !loading) onCancel();
            }}
        >
            <div className="admin-modal admin-modal--sm" role="dialog" aria-modal="true">
                <div className="admin-modal__header">
                    <span className="admin-modal__title">{title}</span>
                    <button
                        type="button"
                        className="admin-modal__close"
                        onClick={onCancel}
                        disabled={loading}
                        aria-label="Close"
                    >
                        <i className="fas fa-times" aria-hidden />
                    </button>
                </div>
                <div className="admin-modal__body">
                    <p style={{ margin: 0, fontSize: 14 }}>{message}</p>
                </div>
                <div className="admin-modal__footer">
                    <button
                        type="button"
                        className="admin-btn admin-btn--ghost"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        {cancelLabel}
                    </button>
                    <button
                        type="button"
                        className={`admin-btn ${danger ? "admin-btn--danger" : ""}`}
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading ? <Spinner /> : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
