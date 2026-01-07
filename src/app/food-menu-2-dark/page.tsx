import BodyDark from "@/components/classes/BodyDark";
import FoodMenuV3 from "@/components/food/FoodMenuV3";
import BusinessHours from "@/components/hours/BusinessHours";
import LayoutV6 from "@/components/layouts/LayoutV6";
import ReservationV1 from "@/components/reservation/ReservationV1";

export const metadata = {
    title: "Restan - Food Menu 2 Dark"
};

const FoodMenu2PageDark = () => {
    return (
        <>
            <LayoutV6 breadCrumb="food-menu-2-dark" title="Restaurant Best Food" logoWhite={true}>
                <FoodMenuV3 sectionClass="shape-less" hasTitle={false} />
                <BusinessHours />
                <ReservationV1 sectionClass="mb-120" />
                <BodyDark />
            </LayoutV6>
        </>
    );
};

export default FoodMenu2PageDark;