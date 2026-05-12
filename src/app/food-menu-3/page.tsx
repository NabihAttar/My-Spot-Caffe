import type { Metadata } from "next";
import DeliveryV1 from "@/components/delivery/DeliveryV1";
import FoodCategoryV5 from "@/components/food/FoodCategoryV5";
import LayoutV6 from "@/components/layouts/LayoutV6";
import ReservationV1 from "@/components/reservation/ReservationV1";
import TestimonialV1 from "@/components/testimonial/TestimonialV1";

export const metadata: Metadata = {
    title: "Full Menu",
    description:
        "Browse the full My Spot Caffe menu — coffee, hot and cold drinks, desserts and signature items, all in one place.",
    alternates: { canonical: "/food-menu-3" },
};

const FoodMenu3Page = () => {
    return (
        <>
            <LayoutV6 breadCrumb="food-menu-3" title="Restaurant Food Menu">
                <FoodCategoryV5 hasFull={true} />
                <DeliveryV1 />
                <TestimonialV1 />
                <ReservationV1 sectionClass="mb-120" />
            </LayoutV6>
        </>
    );
};

export default FoodMenu3Page;