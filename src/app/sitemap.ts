import type { MetadataRoute } from "next";

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://myspotcaffe.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    return [
        {
            url: `${SITE_URL}/`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${SITE_URL}/food-menu`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/food-menu-2`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/food-menu-3`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.7,
        },
        {
            url: `${SITE_URL}/about-us`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${SITE_URL}/contact`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${SITE_URL}/reservation`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.6,
        },
    ];
}
