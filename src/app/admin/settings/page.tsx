"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminShell from "@/components/admin/AdminShell";
import Spinner from "@/components/admin/Spinner";

const SettingsPage = () => {
    const [user, setUser] = useState<string | null>(null);
    const [exp, setExp] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [qrUrl, setQrUrl] = useState<string>("");

    useEffect(() => {
        fetch("/api/auth/me", { cache: "no-store" })
            .then((r) => r.json())
            .then((data: { user?: { name?: string; exp?: number } | null }) => {
                setUser(data?.user?.name ?? null);
                setExp(data?.user?.exp ?? null);
            })
            .finally(() => setLoading(false));
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

                            <hr
                                style={{
                                    border: 0,
                                    borderTop: "1px solid var(--admin-border)",
                                    margin: "18px 0",
                                }}
                            />

                            <p
                                style={{
                                    fontSize: 13,
                                    color: "var(--admin-text-muted)",
                                    margin: "0 0 10px",
                                }}
                            >
                                To change the admin username / password, set these environment
                                variables in your <code>.env</code> file and restart the server:
                            </p>
                            <pre
                                style={{
                                    background: "var(--admin-surface-alt)",
                                    border: "1px solid var(--admin-border)",
                                    borderRadius: 8,
                                    padding: 12,
                                    fontSize: 12.5,
                                    margin: 0,
                                    overflowX: "auto",
                                }}
                            >
{`ADMIN_USERNAME=your-username
ADMIN_PASSWORD=your-strong-password
ADMIN_SECRET=a-long-random-string`}
                            </pre>
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
                                <h2 className="admin-card__title">Data storage</h2>
                                <p className="admin-card__subtitle">Where your menu lives</p>
                            </div>
                        </div>
                        <div className="admin-card__body">
                            <p style={{ margin: "0 0 10px", fontSize: 13.5 }}>
                                Menu data is stored as JSON at{" "}
                                <code>data/menu.json</code> in your project. It is automatically
                                seeded from{" "}
                                <code>public/assets/jsonData/food/FoodCartV4Data.json</code>{" "}
                                the first time the admin panel runs. Backup this file regularly.
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
