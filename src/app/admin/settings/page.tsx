"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminShell from "@/components/admin/AdminShell";
import Spinner from "@/components/admin/Spinner";

interface ChangeCredsResponse {
    ok?: boolean;
    error?: string;
    user?: { name?: string };
}

interface StorageStatus {
    persistent: boolean;
    backend: "redis" | "blob" | "filesystem" | null;
    vercel: boolean;
    setupRequired: boolean;
    message: string;
}

const SettingsPage = () => {
    const [user, setUser] = useState<string | null>(null);
    const [exp, setExp] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [qrUrl, setQrUrl] = useState<string>("");
    const [storage, setStorage] = useState<StorageStatus | null>(null);

    // Change-credentials form state
    const [currentPassword, setCurrentPassword] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/auth/me", { cache: "no-store" })
            .then((r) => r.json())
            .then((data: { user?: { name?: string; exp?: number } | null }) => {
                setUser(data?.user?.name ?? null);
                setExp(data?.user?.exp ?? null);
            })
            .finally(() => setLoading(false));

        fetch("/api/admin/storage-status", { cache: "no-store" })
            .then((r) => r.json())
            .then((data: { data?: StorageStatus }) => {
                if (data?.data) setStorage(data.data);
            })
            .catch(() => {
                /* ignore */
            });

        if (typeof window !== "undefined") {
            setQrUrl(`${window.location.origin}/food-menu`);
        }
    }, []);

    const copyMenuUrl = async () => {
        try {
            await navigator.clipboard.writeText(qrUrl);
            toast.success("Menu URL copied to clipboard");
        } catch {
            toast.error("Could not copy URL");
        }
    };

    const handleChangeCreds = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);

        if (!currentPassword) {
            setFormError("Please enter your current password to confirm changes.");
            return;
        }

        const wantsUsername = newUsername.trim().length > 0 && newUsername.trim() !== user;
        const wantsPassword = newPassword.length > 0;

        if (!wantsUsername && !wantsPassword) {
            setFormError("Enter a new username, a new password, or both.");
            return;
        }

        if (wantsPassword) {
            if (newPassword.length < 6) {
                setFormError("New password must be at least 6 characters.");
                return;
            }
            if (newPassword !== confirmPassword) {
                setFormError("New password and confirmation do not match.");
                return;
            }
        }

        setSubmitting(true);
        try {
            const res = await fetch("/api/auth/change-credentials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currentPassword,
                    newUsername: wantsUsername ? newUsername.trim() : undefined,
                    newPassword: wantsPassword ? newPassword : undefined,
                }),
            });
            const data = (await res.json()) as ChangeCredsResponse;
            if (!res.ok || !data.ok) {
                setFormError(data.error || "Could not update credentials");
                return;
            }
            toast.success("Credentials updated successfully");
            setUser(data.user?.name ?? user);
            setCurrentPassword("");
            setNewUsername("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            setFormError((err as Error).message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AdminShell title="Settings" subtitle="Admin panel & account">
            {loading ? (
                <Spinner large center />
            ) : (
                <div className="admin-grid admin-grid--two">
                    <div className="admin-card">
                        <div className="admin-card__header">
                            <div>
                                <h2 className="admin-card__title">Account</h2>
                                <p className="admin-card__subtitle">Current admin session</p>
                            </div>
                        </div>
                        <div className="admin-card__body">
                            <dl
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "140px 1fr",
                                    gap: 12,
                                    margin: 0,
                                    fontSize: 14,
                                }}
                            >
                                <dt style={{ color: "var(--admin-text-muted)" }}>Username</dt>
                                <dd style={{ margin: 0 }}>
                                    <strong>{user || "—"}</strong>
                                </dd>

                                <dt style={{ color: "var(--admin-text-muted)" }}>Session expires</dt>
                                <dd style={{ margin: 0 }}>
                                    {exp ? new Date(exp).toLocaleString() : "—"}
                                </dd>
                            </dl>
                        </div>
                    </div>

                    <div className="admin-card">
                        <div className="admin-card__header">
                            <div>
                                <h2 className="admin-card__title">Public Menu</h2>
                                <p className="admin-card__subtitle">
                                    QR menu and direct link share the same source.
                                </p>
                            </div>
                        </div>
                        <div className="admin-card__body">
                            <div className="admin-field">
                                <label>Public menu URL</label>
                                <div style={{ display: "flex", gap: 8 }}>
                                    <input
                                        className="admin-input"
                                        readOnly
                                        value={qrUrl}
                                        onFocus={(e) => e.currentTarget.select()}
                                    />
                                    <button
                                        type="button"
                                        className="admin-btn admin-btn--ghost"
                                        onClick={copyMenuUrl}
                                    >
                                        <i className="fas fa-copy" aria-hidden /> Copy
                                    </button>
                                </div>
                                <span className="hint">
                                    This is what the QR code on the public site points to.
                                </span>
                            </div>

                            <p
                                style={{
                                    fontSize: 13,
                                    color: "var(--admin-text-muted)",
                                    marginTop: 14,
                                }}
                            >
                                <i className="fas fa-info-circle" aria-hidden /> Changes you make
                                in the admin panel reflect on both the normal menu page and the
                                QR-linked menu instantly — they read from the same data source.
                            </p>
                        </div>
                    </div>

                    <div className="admin-card" style={{ gridColumn: "1 / -1" }}>
                        <div className="admin-card__header">
                            <div>
                                <h2 className="admin-card__title">Change Username / Password</h2>
                                <p className="admin-card__subtitle">
                                    Update the credentials you use to sign in.
                                </p>
                            </div>
                        </div>
                        <div className="admin-card__body">
                            <form
                                onSubmit={handleChangeCreds}
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                                    gap: 14,
                                }}
                                noValidate
                            >
                                <div
                                    className="admin-field"
                                    style={{ gridColumn: "1 / -1" }}
                                >
                                    <label htmlFor="cred-current">
                                        Current password <span className="req">*</span>
                                    </label>
                                    <input
                                        id="cred-current"
                                        type="password"
                                        className="admin-input"
                                        autoComplete="current-password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        disabled={submitting}
                                    />
                                    <span className="hint">
                                        Required to confirm any changes.
                                    </span>
                                </div>

                                <div className="admin-field">
                                    <label htmlFor="cred-username">New username</label>
                                    <input
                                        id="cred-username"
                                        className="admin-input"
                                        autoComplete="username"
                                        placeholder={user || "admin"}
                                        value={newUsername}
                                        onChange={(e) => setNewUsername(e.target.value)}
                                        disabled={submitting}
                                    />
                                    <span className="hint">
                                        Leave empty to keep <strong>{user || "—"}</strong>.
                                    </span>
                                </div>

                                <div className="admin-field">
                                    <label htmlFor="cred-new">New password</label>
                                    <input
                                        id="cred-new"
                                        type="password"
                                        className="admin-input"
                                        autoComplete="new-password"
                                        placeholder="At least 6 characters"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        disabled={submitting}
                                    />
                                    <span className="hint">
                                        Leave empty to keep the current password.
                                    </span>
                                </div>

                                <div className="admin-field">
                                    <label htmlFor="cred-confirm">Confirm new password</label>
                                    <input
                                        id="cred-confirm"
                                        type="password"
                                        className="admin-input"
                                        autoComplete="new-password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        disabled={submitting || newPassword.length === 0}
                                    />
                                </div>

                                {formError && (
                                    <div
                                        className="admin-login__alert"
                                        style={{ gridColumn: "1 / -1" }}
                                    >
                                        {formError}
                                    </div>
                                )}

                                <div
                                    style={{
                                        gridColumn: "1 / -1",
                                        display: "flex",
                                        gap: 10,
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <button
                                        type="submit"
                                        className="admin-btn"
                                        disabled={submitting}
                                    >
                                        {submitting ? (
                                            <>
                                                <Spinner /> Saving…
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-save" aria-hidden /> Save
                                                changes
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>

                            <p
                                style={{
                                    fontSize: 12.5,
                                    color: "var(--admin-text-muted)",
                                    marginTop: 14,
                                }}
                            >
                                <i className="fas fa-shield-alt" aria-hidden /> Passwords are
                                salted and hashed before being stored at{" "}
                                <code>data/admin-credentials.json</code>. The plain-text password
                                is never saved.
                            </p>
                        </div>
                    </div>

                    <div className="admin-card" style={{ gridColumn: "1 / -1" }}>
                        <div className="admin-card__header">
                            <div>
                                <h2 className="admin-card__title">Data storage</h2>
                                <p className="admin-card__subtitle">Where your menu lives</p>
                            </div>
                        </div>
                        <div className="admin-card__body">
                            {storage?.setupRequired && (
                                <div
                                    className="admin-login__alert"
                                    style={{ marginBottom: 14 }}
                                >
                                    <strong>Action required on Vercel:</strong> admin saves will
                                    reset until you connect persistent storage. In Vercel → your
                                    project → <strong>Storage</strong>, add{" "}
                                    <strong>Upstash Redis</strong> or <strong>Vercel Blob</strong>,
                                    connect it to this project, then redeploy.
                                </div>
                            )}

                            {storage && (
                                <p style={{ margin: "0 0 10px", fontSize: 13.5 }}>
                                    <span
                                        className={`admin-badge ${
                                            storage.persistent
                                                ? "admin-badge--success"
                                                : "admin-badge--danger"
                                        }`}
                                        style={{ marginRight: 8 }}
                                    >
                                        {storage.persistent ? "Persistent" : "Not persistent"}
                                    </span>
                                    {storage.message}
                                </p>
                            )}

                            <p style={{ margin: "0 0 10px", fontSize: 13.5 }}>
                                Locally, menu data is saved to <code>data/menu.json</code>. On
                                Vercel it must use Redis or Blob — the server filesystem is
                                temporary and old prices come back after a few minutes without it.
                            </p>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 12.5,
                                    color: "var(--admin-text-muted)",
                                }}
                            >
                                Uploaded product images are stored under{" "}
                                <code>public/assets/img/food/uploads/</code>.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </AdminShell>
    );
};

export default SettingsPage;
