import type { Metadata } from "next";
import FoodMenuV3 from "@/components/food/FoodMenuV3";
import BusinessHours from "@/components/hours/BusinessHours";
import LayoutV6 from "@/components/layouts/LayoutV6";
import ReservationV1 from "@/components/reservation/ReservationV1";

export const metadata: Metadata = {
    title: "QR Code Menu",
    description:
        "View the My Spot Caffe digital menu easily using our QR code menu experience — coffee, drinks, desserts and more.",
    alternates: { canonical: "/food-menu-2" },
    keywords: [
        "QR code menu",
        "digital menu",
        "My Spot Caffe menu",
        "coffee menu",
        "cafe menu",
    ],
    openGraph: {
        title: "QR Code Menu | My Spot Caffe",
        description:
            "View the My Spot Caffe digital menu easily using our QR code menu experience.",
        url: "/food-menu-2",
    },
    twitter: {
        title: "QR Code Menu | My Spot Caffe",
        description:
            "View the My Spot Caffe digital menu easily using our QR code menu experience.",
    },
};

const FoodMenu2Page = () => {
    return (
        <>
            <LayoutV6 breadCrumb="food-menu-2" title="Restaurant Best Food">
                <FoodMenuV3 sectionClass="shape-less" hasTitle={false} />
                <BusinessHours />
                <ReservationV1 sectionClass="mb-120" />
            </LayoutV6>
        </>
    );
};

export default FoodMenu2Page;