"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import Spinner from "@/components/admin/Spinner";

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const next = searchParams.get("next") || "/admin/dashboard";

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!username.trim() || !password) {
            setError("Username and password are required");
            return;
        }
        setSubmitting(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: username.trim(), password }),
            });
            const data = (await res.json()) as { error?: string };
            if (!res.ok) {
                setError(data.error || "Login failed");
                return;
            }
            toast.success("Welcome back!");
            router.push(next);
            router.refresh();
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="admin-login">
            <div className="admin-login__card">
                <div className="admin-login__brand">
                    <span className="admin-login__brand-mark">
                        <i className="fas fa-mug-hot" aria-hidden />
                    </span>
                    <div>
                        <h1>My Spot Café</h1>
                        <small>Admin Panel</small>
                    </div>
                </div>

                <h2>Sign in</h2>
                <p className="lead">Enter your credentials to manage the menu.</p>

                {error && <div className="admin-login__alert">{error}</div>}

                <form onSubmit={handleSubmit} noValidate>
                    <div className="admin-field">
                        <label htmlFor="login-username">Username</label>
                        <input
                            id="login-username"
                            className="admin-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                            autoFocus
                            disabled={submitting}
                        />
                    </div>
                    <div className="admin-field">
                        <label htmlFor="login-password">Password</label>
                        <input
                            id="login-password"
                            type="password"
                            className="admin-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            disabled={submitting}
                        />
                    </div>
                    <button type="submit" className="admin-btn" disabled={submitting}>
                        {submitting ? (
                            <>
                                <Spinner /> Signing in…
                            </>
                        ) : (
                            <>
                                <i className="fas fa-sign-in-alt" aria-hidden /> Sign in
                            </>
                        )}
                    </button>
                </form>

                <p className="admin-login__hint">
                    Configure <code>ADMIN_USERNAME</code> / <code>ADMIN_PASSWORD</code> in
                    your <code>.env</code> file.
                </p>
            </div>
        </div>
    );
}

export default function AdminLoginPage() {
    return (
        <Suspense fallback={<div className="admin-login"><Spinner large /></div>}>
            <LoginForm />
        </Suspense>
    );
}
