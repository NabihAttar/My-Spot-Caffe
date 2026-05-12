import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Categories",
    description: "Organize My Spot Caffe menu categories and visibility.",
};

export default function AdminCategoriesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
