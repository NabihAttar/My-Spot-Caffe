import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Products",
    description: "Manage My Spot Caffe products, prices, and visibility.",
};

export default function AdminProductsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
