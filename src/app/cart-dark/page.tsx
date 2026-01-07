import CartPageContent from "@/components/cart/CartPageContent";
import BodyDark from "@/components/classes/BodyDark";
import LayoutV6 from "@/components/layouts/LayoutV6";

export const metadata = {
    title: "Restan - Cart Dark"
};

const CartPageDark = () => {
    return (
        <>
            <LayoutV6 title="Cart Page" breadCrumb="cart-dark" logoWhite={true}>
                <CartPageContent />
                <BodyDark />
            </LayoutV6>
        </>
    );
};

export default CartPageDark;