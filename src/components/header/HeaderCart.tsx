"use client"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { removeFromCart } from "../../store/slices/cartSlice";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const HeaderCart = () => {
    const [mounted, setMounted] = useState(false);
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cartItems.reduce((sum, item) => sum + item.newPrice * item.quantity, 0);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleRemove = (id: number) => {
        dispatch(removeFromCart(id));
        toast.error("Product removed from cart");
    };

    // Render placeholder during SSR to match initial client render
    if (!mounted) {
        return (
            <li className="dropdown">
                <Link href="#" className="dropdown-toggle" data-toggle="dropdown">
                    <i className="far fa-shopping-cart" />
                    <span className="badge">0</span>
                </Link>
                <ul className="dropdown-menu cart-list">
                    <li className="total">
                        <p>Your cart is empty.</p>
                    </li>
                </ul>
            </li>
        );
    }

    return (
        <>
            <li className="dropdown">
                <Link href="#" className="dropdown-toggle" data-toggle="dropdown">
                    <i className="far fa-shopping-cart" />
                    <span className="badge">{totalItems}</span>
                </Link>

                <ul className="dropdown-menu cart-list">
                    {cartItems.length > 0 ? (
                        <>
                            <ul>
                                {cartItems.map((item) => (
                                    <li key={item.id}>
                                        <div className="thumb">
                                            <span className="photo">
                                                <Image src={`/assets/img/shop/${item.thumb}`} alt={item.title} width={450} height={450} />
                                            </span>
                                            <Link href="#" className="remove-product" onClick={() => handleRemove(item.id)} >
                                                <i className="fas fa-times" />
                                            </Link>
                                        </div>
                                        <div className="info">
                                            <h6>{item.title}</h6>
                                            <p>{item.quantity}x - <span className="price">${item.newPrice}</span></p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <li className="total">
                                <span className="pull-right"><strong>Total</strong>: ${totalAmount.toFixed(2)}</span>
                                <Link href="/cart" className="btn btn-default btn-cart">Cart</Link>
                                <Link href="/checkout" className="btn btn-default btn-cart">Checkout</Link>
                            </li>
                        </>
                    ) : (
                        <li className="total">
                            <p>Your cart is empty.</p>
                        </li>
                    )}
                </ul>
            </li>
        </>
    );
};

export default HeaderCart;