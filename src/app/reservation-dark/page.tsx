import BodyDark from "@/components/classes/BodyDark";
import LayoutV6 from "@/components/layouts/LayoutV6";
import ReservationV2 from "@/components/reservation/ReservationV2";

export const metadata = {
    title: "Restan - Reservation Dark"
};

const ReservationPageDark = () => {
    return (
        <>
            <LayoutV6 breadCrumb="reservation-dark" title="Online Reservation" logoWhite={true}>
                <ReservationV2 />
                <BodyDark />
            </LayoutV6>
        </>
    );
};

export default ReservationPageDark;