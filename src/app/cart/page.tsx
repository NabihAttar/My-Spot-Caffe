import CartPageContent from "@/components/cart/CartPageContent";
import LayoutV6 from "@/components/layouts/LayoutV6";

export const metadata = {
    title: "Restan - Cart"
};

const CartPage = () => {
    return (
        <>
            <LayoutV6 title="Cart Page" breadCrumb="cart" >
                <CartPageContent />
            </LayoutV6>
        </>
    );
};

export default CartPage;