import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign in",
    description: "Sign in to the My Spot Caffe admin panel.",
};

export default function AdminLoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
