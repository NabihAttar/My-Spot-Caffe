"use client";

import { useCallback, useEffect, useState } from "react";
import FoodCartV4Data from "@/assets/jsonData/food/FoodCartV4Data.json";
import FoodMenuTabV3 from "./FoodMenuTabV3";
import type { Menu } from "@/lib/menu-types";

interface DataType {
    sectionClass?: string;
    hasTitle?: boolean;
}

/**
 * Public-facing menu component.
 *
 * Data flow:
 * 1. Render seeded static JSON immediately (so SSR / first paint never blanks).
 * 2. After mount, fetch the live admin-managed menu from /api/menu.
 *    The API filters out hidden categories and unavailable products
 *    for non-admin callers, so this page automatically reflects any
 *    changes made from the admin panel (also covers the QR menu since
 *    the QR code points to /food-menu).
 * 3. Re-fetch whenever:
 *    - the tab regains focus (`window` focus + `visibilitychange`),
 *    - the admin signals a change in another tab via the
 *      `spotcaffe:menu-updated` localStorage event, or
 *    - a 30-second poll fires (safety net for stale tabs).
 */
const MENU_UPDATED_KEY = "spotcaffe:menu-updated";
const POLL_INTERVAL_MS = 30_000;

const FoodMenuV3 = ({ sectionClass, hasTitle }: DataType) => {
    const [menu, setMenu] = useState<Menu>(FoodCartV4Data as unknown as Menu);

    const fetchMenu = useCallback(async (signal?: AbortSignal) => {
        try {
            const res = await fetch("/api/menu", {
                cache: "no-store",
                signal,
            });
            if (!res.ok) return;
            const data = (await res.json()) as { data?: Menu };
            if (Array.isArray(data?.data)) {
                setMenu(data.data);
            }
        } catch {
            // Network / abort — keep current state.
        }
    }, []);

    useEffect(() => {
        const ac = new AbortController();
        fetchMenu(ac.signal);

        const onFocus = () => fetchMenu();
        const onVisibility = () => {
            if (document.visibilityState === "visible") fetchMenu();
        };
        const onStorage = (e: StorageEvent) => {
            if (e.key === MENU_UPDATED_KEY) fetchMenu();
        };

        window.addEventListener("focus", onFocus);
        document.addEventListener("visibilitychange", onVisibility);
        window.addEventListener("storage", onStorage);
        const poll = window.setInterval(() => fetchMenu(), POLL_INTERVAL_MS);

        return () => {
            ac.abort();
            window.removeEventListener("focus", onFocus);
            document.removeEventListener("visibilitychange", onVisibility);
            window.removeEventListener("storage", onStorage);
            window.clearInterval(poll);
        };
    }, [fetchMenu]);

    return (
        <div className={`food-menu-area default-padding-top ${sectionClass ?? ""}`}>
            <div className="container">
                {hasTitle && (
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="site-heading text-center text-light">
                                <h4 className="sub-title"> Menu</h4>
                                <h2 className="title">Our Specials Menu</h2>
                            </div>
                        </div>
                    </div>
                )}

                <div className="food-menu-items text-light">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div
                                className="nav nav-tabs food-menu-nav"
                                id="nav-tab"
                                role="tablist"
                            >
                                {menu.map((tab, idx) => {
                                    const isActive =
                                        tab.tabClass?.includes("active") || idx === 0;
                                    return (
                                        <button
                                            key={tab.id}
                                            className={`nav-link ${isActive ? "active" : ""}`}
                                            id={`nav-${tab.tabId}`}
                                            data-bs-toggle="tab"
                                            data-bs-target={`#${tab.tabId}`}
                                            type="button"
                                            role="tab"
                                            aria-controls={tab.tabId}
                                            aria-selected={isActive}
                                        >
                                            {tab.tabTitle}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div
                                className="tab-content food-menu-tab-content"
                                id="nav-tabContent"
                            >
                                {menu.map((food, idx) => {
                                    const isActive =
                                        food.tabClass?.includes("active") || idx === 0;
                                    return (
                                        <div
                                            className={`tab-pane fade ${
                                                isActive ? "show active" : ""
                                            }`}
                                            id={food.tabId}
                                            role="tabpanel"
                                            key={food.id}
                                        >
                                            <div className="row">
                                                <div
                                                    className="col-xl-5 thumb"
                                                    style={{
                                                        background: `url(/assets/img/thumb/${food.tabThumb})`,
                                                    }}
                                                />
                                                <div className="col-xl-7">
                                                    {(food.tabContent ?? []).map((list) => (
                                                        <FoodMenuTabV3
                                                            list={list}
                                                            key={list.id}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodMenuV3;
