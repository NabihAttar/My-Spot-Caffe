import DeliveryV1 from "@/components/delivery/DeliveryV1";
import FoodCategoryV5 from "@/components/food/FoodCategoryV5";
import LayoutV6 from "@/components/layouts/LayoutV6";
import ReservationV1 from "@/components/reservation/ReservationV1";
import TestimonialV1 from "@/components/testimonial/TestimonialV1";

export const metadata = {
    title: "Restan - Food Menu 3"
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