"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

interface Props {
    /** Icon or node shown in the center of the ring */
    symbol?: React.ReactNode;
    /** Show the button after scrolling this many pixels */
    offsetTop?: number;
    /** Outer diameter in px */
    size?: number;
    /** Ring stroke width */
    strokeWidth?: number;
}

/**
 * Scroll-to-top with a circular progress ring.
 *
 * Replaces `react-simple-scroll-up`, which passes NaN to `strokeDashoffset`
 * when `scrollHeight - clientHeight` is 0 (common on short pages or before layout).
 */
const ScrollToTopButton = ({
    symbol = "⮙",
    offsetTop = 100,
    size = 50,
    strokeWidth = 4,
}: Props) => {
    const cx = size / 2;
    const r = useMemo(() => cx - strokeWidth / 2, [cx, strokeWidth]);
    const circumference = useMemo(() => 2 * Math.PI * r, [r]);

    const [visible, setVisible] = useState(false);
    const [dashOffset, setDashOffset] = useState(circumference);

    const update = useCallback(() => {
        const doc = document.documentElement;
        const body = document.body;
        const scrollTop = window.scrollY ?? doc.scrollTop ?? body.scrollTop ?? 0;
        const scrollHeight = Math.max(
            doc.scrollHeight,
            body.scrollHeight,
            doc.offsetHeight,
            body.offsetHeight
        );
        const clientHeight = window.innerHeight || doc.clientHeight;
        const scrollable = scrollHeight - clientHeight;

        setVisible(scrollTop > offsetTop);

        let progress = 0;
        if (scrollable > 1) {
            progress = Math.min(1, Math.max(0, scrollTop / scrollable));
        }
        const offset = circumference * (1 - progress);
        setDashOffset(Number.isFinite(offset) ? offset : circumference);
    }, [circumference, offsetTop]);

    useEffect(() => {
        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update, { passive: true });
        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, [update]);

    const scrollUp = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    const bgColor = "rgb(0 0 0 / 75%)";
    const strokeEmpty = "rgb(200 200 200 / 85%)";
    const strokeFill = "rgb(0 0 0 / 50%)";

    return (
        <div
            className="to-top-progress"
            role="button"
            tabIndex={0}
            aria-label="Scroll to top"
            onClick={scrollUp}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    scrollUp();
                }
            }}
            style={{
                position: "fixed",
                bottom: 15,
                right: 15,
                visibility: visible ? "visible" : "hidden",
                opacity: visible ? 1 : 0,
                transition: "visibility .3s linear, opacity .3s linear",
                cursor: "pointer",
                userSelect: "none",
                display: "grid",
                placeItems: "center",
                gridTemplateAreas: '"inner-div"',
            }}
        >
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                style={{
                    display: "block",
                    transform: "rotate(-90deg)",
                    gridArea: "inner-div",
                }}
                focusable="false"
                aria-hidden
            >
                <circle
                    fill={bgColor}
                    stroke={strokeEmpty}
                    strokeWidth={strokeWidth}
                    r={r}
                    cx={cx}
                    cy={cx}
                />
                <circle
                    fill="none"
                    stroke={strokeFill}
                    strokeWidth={strokeWidth}
                    r={r}
                    cx={cx}
                    cy={cx}
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    style={{ transition: "stroke-dashoffset 0.3s linear" }}
                />
                {typeof symbol === "string" ? (
                    <text
                        x={cx}
                        y={cx}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={`rotate(90, ${cx}, ${cx})`}
                        fill="#fff"
                        fontSize={20}
                    >
                        {symbol}
                    </text>
                ) : null}
            </svg>
            {typeof symbol !== "string" ? (
                <div
                    style={{
                        gridArea: "inner-div",
                        zIndex: 10,
                        color: "#fff",
                        fontSize: 18,
                        display: "grid",
                        placeItems: "center",
                        pointerEvents: "none",
                    }}
                >
                    {symbol}
                </div>
            ) : null}
        </div>
    );
};

export default ScrollToTopButton;
