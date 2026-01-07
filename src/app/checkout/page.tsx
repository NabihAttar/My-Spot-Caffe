import CheckoutContent from "@/components/cart/CheckoutContent";
import LayoutV6 from "@/components/layouts/LayoutV6";

export const metadata = {
    title: "Restan - Checkout"
};

const CheckoutPage = () => {
    return (
        <>
            <LayoutV6 title="Cart Page" breadCrumb="checkout" >
                <CheckoutContent />
            </LayoutV6>
        </>
    );
};

export default CheckoutPage;