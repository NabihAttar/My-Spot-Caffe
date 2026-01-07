"use client"
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addToCart } from '@/store/slices/cartSlice';
import { toast } from 'react-toastify';

interface DataType {
    id: number;
    thumb: string;
    rating: number;
    review: number;
    oldPrice: number;
    newPrice: number;
    name: string;
    btnText: string;
}

const SingleFoodCategoryV3 = ({ data }: { data: DataType }) => {
    const { id, thumb, rating, review, oldPrice, newPrice, name, btnText } = data

    // Redux hooks to manage cart state
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items); // adjust this if your slice structure is different

    const handleAddToCart = () => {
        const alreadyInCart = cartItems.some((item) => item.id === data.id);

        if (alreadyInCart) {
            toast.warning("Product already in cart");
        } else {
            dispatch(
                addToCart({
                    id: data.id!,
                    title: data.name!,
                    newPrice: Number(data.newPrice),
                    thumb: data.thumb!,
                    quantity: 1,
                })
            );
            toast.success("Product added successfully");
        }
    };

    return (
        <>
            <div className="food-menu-style-three">
                <div className="thumb">
                    <Image src={`/assets/img/menu/${thumb}`} alt="Image Not Found" width={800} height={600} />
                    <div className="d-flex">
                        <div className="food-review">
                            <i className="fas fa-star"></i>
                            <span>{rating}({review}K)</span>
                        </div>
                        <div className="price">
                            <span><del>${oldPrice}</del> ${newPrice}</span>
                        </div>
                    </div>
                </div>
                <div className="info">
                    <h4><Link href={`/shop-single/${id}`}>{name}</Link></h4>
                    <ul>
                        <li>4 chicken legs</li>
                        <li>Chili sauce</li>
                        <li>Soft Drinks</li>
                    </ul>
                    <Link href="#" className="cart-btn-border" onClick={handleAddToCart} scroll={false}>
                        <i className="fas fa-shopping-cart"></i> {btnText}
                    </Link>
                </div>
            </div>
        </>
    );
};

export default SingleFoodCategoryV3;