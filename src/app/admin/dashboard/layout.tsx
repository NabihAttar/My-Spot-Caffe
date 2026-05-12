import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Overview of My Spot Caffe menu, products, and categories.",
};

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
