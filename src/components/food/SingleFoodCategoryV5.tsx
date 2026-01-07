/* eslint-disable @typescript-eslint/no-unused-vars */

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
    title: string;
    text: string;
    delay: string
    newPrice: number
}

const SingleFoodCategoryV5 = ({ category }: { category: DataType }) => {
    const { id, thumb, rating, title, text, delay, newPrice } = category

    const formattedRating = (Math.floor(rating)).toFixed(1);
    const newP = (Math.floor(newPrice)).toFixed(2);

    // Redux hooks to manage cart state
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items); // adjust this if your slice structure is different

    const handleAddToCart = () => {
        const alreadyInCart = cartItems.some((item) => item.id === category.id);

        if (alreadyInCart) {
            toast.warning("Product already in cart");
        } else {
            dispatch(
                addToCart({
                    id: category.id!,
                    title: category.title!,
                    newPrice: Number(category.newPrice),
                    thumb: category.thumb!,
                    quantity: 1,
                })
            );
            toast.success("Product added successfully");
        }
    };

    return (
        <>
            <div className="food-category-item animate" data-aos="fade-up" data-aos-delay={delay}>
                <div className="thumb">
                    <Image src={`/assets/img/thumb/${thumb}`} alt="Image Not Found" width={800} height={600} />
                </div>
                <div className="info">
                    <div className="food-review">
                        <div className="reviewer-avatar">
                            <Image src="/assets/img/team/5.jpg" width={200} height={200} alt="Image Not Found" />
                            <Image src="/assets/img/team/6.jpg" width={200} height={200} alt="Image Not Found" />
                            <Image src="/assets/img/team/7.jpg" width={200} height={200} alt="Image Not Found" />
                        </div>
                        <div className="rating">
                            <i className="fas fa-star"></i>
                            {formattedRating}
                        </div>
                    </div>
                    <h4>
                        <Link href={`/shop-single/${id}`}>{title}</Link>
                    </h4>
                    <p>
                        {text}
                    </p>
                    <Link href="#" className="btn-read-more" onClick={handleAddToCart} scroll={false}>
                        Order Now
                        <i className="fas fa-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default SingleFoodCategoryV5;