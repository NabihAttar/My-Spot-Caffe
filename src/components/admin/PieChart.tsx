"use client";

import { useMemo, useState } from "react";

export interface PieDatum {
    label: string;
    value: number;
    color?: string;
}

interface PieChartProps {
    data: PieDatum[];
    size?: number;
    /** 0 = full pie, 0..1 inner-radius fraction for donut. Default 0.55. */
    innerRadiusFraction?: number;
    /** Show percentages in the legend. Default true. */
    showLegend?: boolean;
    /** Optional centre label (e.g. total count). */
    centerLabel?: { value: string | number; caption?: string };
    className?: string;
}

const DEFAULT_PALETTE = [
    "#cf820a",
    "#1f4d65",
    "#4ec9d4",
    "#f4b04a",
    "#8b5cf6",
    "#10b981",
    "#ef4444",
    "#0ea5e9",
    "#ec4899",
    "#f59e0b",
    "#14b8a6",
    "#6366f1",
];

interface Slice {
    label: string;
    value: number;
    color: string;
    percent: number;
    startAngle: number;
    endAngle: number;
    path: string;
}

/**
 * Convert a polar coordinate (angle in radians from 12 o'clock, clockwise)
 * into an (x, y) cartesian point on the SVG.
 */
function polar(cx: number, cy: number, r: number, angle: number) {
    return {
        x: cx + r * Math.sin(angle),
        y: cy - r * Math.cos(angle),
    };
}

function buildSlicePath(
    cx: number,
    cy: number,
    rOuter: number,
    rInner: number,
    startAngle: number,
    endAngle: number
): string {
    const large = endAngle - startAngle > Math.PI ? 1 : 0;
    const p1 = polar(cx, cy, rOuter, startAngle);
    const p2 = polar(cx, cy, rOuter, endAngle);

    if (rInner <= 0) {
        // Full pie wedge.
        return [
            `M ${cx} ${cy}`,
            `L ${p1.x} ${p1.y}`,
            `A ${rOuter} ${rOuter} 0 ${large} 1 ${p2.x} ${p2.y}`,
            "Z",
        ].join(" ");
    }

    const p3 = polar(cx, cy, rInner, endAngle);
    const p4 = polar(cx, cy, rInner, startAngle);
    return [
        `M ${p1.x} ${p1.y}`,
        `A ${rOuter} ${rOuter} 0 ${large} 1 ${p2.x} ${p2.y}`,
        `L ${p3.x} ${p3.y}`,
        `A ${rInner} ${rInner} 0 ${large} 0 ${p4.x} ${p4.y}`,
        "Z",
    ].join(" ");
}

const PieChart = ({
    data,
    size = 220,
    innerRadiusFraction = 0.55,
    showLegend = true,
    centerLabel,
    className,
}: PieChartProps) => {
    const [hovered, setHovered] = useState<number | null>(null);

    const slices = useMemo<Slice[]>(() => {
        const total = data.reduce((sum, d) => sum + Math.max(0, d.value), 0);
        if (total <= 0) return [];

        const cx = size / 2;
        const cy = size / 2;
        const rOuter = size / 2 - 4;
        const rInner = rOuter * Math.max(0, Math.min(0.9, innerRadiusFraction));

        let cursor = 0;
        return data
            .map((d, idx) => {
                const value = Math.max(0, d.value);
                const fraction = value / total;
                const startAngle = cursor;
                const endAngle = cursor + fraction * Math.PI * 2;
                cursor = endAngle;

                // Edge case: when there's only one non-zero slice we'd draw a
                // path that arcs the full circle (start == end). Nudge the end
                // just below 2π so the arc renders.
                const safeEnd =
                    Math.abs(endAngle - startAngle - Math.PI * 2) < 1e-6
                        ? endAngle - 1e-3
                        : endAngle;

                return {
                    label: d.label,
                    value,
                    color: d.color ?? DEFAULT_PALETTE[idx % DEFAULT_PALETTE.length],
                    percent: fraction * 100,
                    startAngle,
                    endAngle: safeEnd,
                    path: buildSlicePath(cx, cy, rOuter, rInner, startAngle, safeEnd),
                };
            })
            .filter((s) => s.value > 0);
    }, [data, size, innerRadiusFraction]);

    const total = useMemo(
        () => slices.reduce((sum, s) => sum + s.value, 0),
        [slices]
    );

    if (slices.length === 0) {
        return (
            <div
                className={className}
                style={{
                    display: "grid",
                    placeItems: "center",
                    color: "var(--admin-text-muted)",
                    fontSize: 13,
                    padding: 24,
                    minHeight: size,
                }}
            >
                No data to display
            </div>
        );
    }

    const cx = size / 2;
    const cy = size / 2;

    return (
        <div
            className={className}
            style={{
                display: "flex",
                gap: 20,
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center",
            }}
        >
            <div style={{ position: "relative", width: size, height: size, flex: "0 0 auto" }}>
                <svg
                    width={size}
                    height={size}
                    viewBox={`0 0 ${size} ${size}`}
                    role="img"
                    aria-label="Pie chart"
                >
                    {slices.map((s, i) => (
                        <path
                            key={`${s.label}-${i}`}
                            d={s.path}
                            fill={s.color}
                            stroke="#ffffff"
                            strokeWidth={2}
                            style={{
                                transition: "transform 0.18s ease, opacity 0.18s ease",
                                transformOrigin: `${cx}px ${cy}px`,
                                transform:
                                    hovered === i ? "scale(1.04)" : "scale(1)",
                                opacity:
                                    hovered === null || hovered === i ? 1 : 0.55,
                                cursor: "pointer",
                            }}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            <title>{`${s.label}: ${s.value} (${s.percent.toFixed(1)}%)`}</title>
                        </path>
                    ))}
                </svg>
                {(centerLabel || innerRadiusFraction > 0.3) && (
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            display: "grid",
                            placeItems: "center",
                            pointerEvents: "none",
                            textAlign: "center",
                        }}
                    >
                        <div>
                            <div
                                style={{
                                    fontSize: 22,
                                    fontWeight: 700,
                                    color: "var(--admin-text)",
                                    lineHeight: 1,
                                }}
                            >
                                {centerLabel?.value ?? total}
                            </div>
                            <div
                                style={{
                                    fontSize: 11,
                                    color: "var(--admin-text-muted)",
                                    marginTop: 4,
                                    textTransform: "uppercase",
                                    letterSpacing: 0.5,
                                }}
                            >
                                {centerLabel?.caption ?? "Total"}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {showLegend && (
                <ul
                    style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                        minWidth: 160,
                        flex: "1 1 160px",
                    }}
                >
                    {slices.map((s, i) => (
                        <li
                            key={`legend-${s.label}-${i}`}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                fontSize: 13,
                                cursor: "pointer",
                                opacity:
                                    hovered === null || hovered === i ? 1 : 0.55,
                                transition: "opacity 0.18s ease",
                            }}
                        >
                            <span
                                aria-hidden
                                style={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: 3,
                                    background: s.color,
                                    flex: "0 0 12px",
                                }}
                            />
                            <span
                                style={{
                                    flex: 1,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                                title={s.label}
                            >
                                {s.label}
                            </span>
                            <span
                                style={{
                                    color: "var(--admin-text-muted)",
                                    fontVariantNumeric: "tabular-nums",
                                }}
                            >
                                {s.value}{" "}
                                <span style={{ fontSize: 11 }}>
                                    ({s.percent.toFixed(1)}%)
                                </span>
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PieChart;
