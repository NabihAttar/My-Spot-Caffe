import CheckoutContent from "@/components/cart/CheckoutContent";
import BodyDark from "@/components/classes/BodyDark";
import LayoutV6 from "@/components/layouts/LayoutV6";

export const metadata = {
    title: "Restan - Checkout Dark"
};

const CheckoutPageDark = () => {
    return (
        <>
            <LayoutV6 title="Cart Page" breadCrumb="checkout-dark" logoWhite={true}>
                <CheckoutContent />
                <BodyDark />
            </LayoutV6>
        </>
    );
};

export default CheckoutPageDark;