import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Settings",
    description: "Configure My Spot Caffe admin preferences.",
};

export default function AdminSettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
