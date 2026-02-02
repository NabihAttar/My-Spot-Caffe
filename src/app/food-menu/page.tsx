import DeliveryV1 from "@/components/delivery/DeliveryV1";
import FoodMenuV4 from "@/components/food/FoodMenuV4";
import FoodMenuV5 from "@/components/food/FoodMenuV5";
import LayoutV6 from "@/components/layouts/LayoutV6";
import ReservationV1 from "@/components/reservation/ReservationV1";
import TestimonialV1 from "@/components/testimonial/TestimonialV1";
import FoodMenuV3 from "@/components/food/FoodMenuV3";

export const metadata = {
    title: "Restan - Food Menu"
};

const FoodMenuPage = () => {
    return (
        <>
            <LayoutV6 breadCrumb="menu" title=" Menu">
                {/* <FoodMenuV4 /> */}
                {/* <DeliveryV1 /> */}
                {/* <FoodMenuV5 /> */}
                <FoodMenuV3 />

                {/* <TestimonialV1 /> */}
                <ReservationV1 sectionClass="mb-120 mb-xs-60" />
            </LayoutV6>
        </>
    );
};

export default FoodMenuPage;