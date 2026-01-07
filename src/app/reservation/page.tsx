import LayoutV6 from "@/components/layouts/LayoutV6";
import ReservationV2 from "@/components/reservation/ReservationV2";

export const metadata = {
    title: "Restan - Reservation"
};

const ReservationPage = () => {
    return (
        <>
            <LayoutV6 breadCrumb="reservation" title="Online Reservation">
                <ReservationV2 />
            </LayoutV6>
        </>
    );
};

export default ReservationPage;