"use client";

import { useRef, useState } from "react";
import Spinner from "./Spinner";

interface Props {
    /** Current value: either a public URL (/assets/...) or a filename in /assets/img/food. */
    value: string;
    onChange: (value: string) => void;
    /** Base path used for filename-only values, default /assets/img/food/. */
    basePath?: string;
}

function resolveSrc(value: string, basePath: string): string {
    if (!value) return "";
    if (value.startsWith("http") || value.startsWith("/")) return value;
    return `${basePath}${value}`;
}

const ImagePicker = ({ value, onChange, basePath = "/assets/img/food/" }: Props) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [uploading, setUploading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    const handleFiles = async (files: FileList | null) => {
        if (!files || files.length === 0) return;
        setErr(null);
        setUploading(true);
        try {
            const form = new FormData();
            form.append("file", files[0]);
            const res = await fetch("/api/upload", { method: "POST", body: form });
            const data = (await res.json()) as { url?: string; error?: string };
            if (!res.ok || !data.url) {
                setErr(data.error || "Upload failed");
                return;
            }
            onChange(data.url);
        } catch (e) {
            setErr((e as Error).message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <div className="admin-image-preview">
                {value ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={resolveSrc(value, basePath)} alt="Preview" />
                ) : (
                    <span>
                        <i className="fas fa-image" aria-hidden /> No image
                    </span>
                )}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                <button
                    type="button"
                    className="admin-btn admin-btn--ghost admin-btn--sm"
                    onClick={() => inputRef.current?.click()}
                    disabled={uploading}
                >
                    {uploading ? (
                        <>
                            <Spinner /> Uploading…
                        </>
                    ) : (
                        <>
                            <i className="fas fa-upload" aria-hidden /> Upload
                        </>
                    )}
                </button>
                {value && (
                    <button
                        type="button"
                        className="admin-btn admin-btn--ghost admin-btn--sm"
                        onClick={() => onChange("")}
                    >
                        <i className="fas fa-trash-alt" aria-hidden /> Clear
                    </button>
                )}
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => handleFiles(e.target.files)}
                />
            </div>
            <input
                type="text"
                className="admin-input"
                style={{ marginTop: 8 }}
                placeholder="…or paste an image URL / filename"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            {err && <p className="error" style={{ color: "var(--admin-danger)", fontSize: 12, marginTop: 6 }}>{err}</p>}
        </div>
    );
};

export default ImagePicker;
