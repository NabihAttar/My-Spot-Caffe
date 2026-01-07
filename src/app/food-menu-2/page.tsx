import FoodMenuV3 from "@/components/food/FoodMenuV3";
import BusinessHours from "@/components/hours/BusinessHours";
import LayoutV6 from "@/components/layouts/LayoutV6";
import ReservationV1 from "@/components/reservation/ReservationV1";

export const metadata = {
    title: "Restan - Food Menu 2"
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