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
    oldPrice: number;
    newPrice: number;
}

const SingleFoodMenuV1 = ({ food }: { food: DataType }) => {
    const { id, thumb, rating, title, text, oldPrice, newPrice } = food

    const oldP = (Math.floor(oldPrice)).toFixed(2);
    const newP = (Math.floor(newPrice)).toFixed(2);

    // Redux hooks to manage cart state
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items); // adjust this if your slice structure is different

    const handleAddToCart = () => {
        const alreadyInCart = cartItems.some((item) => item.id === food.id);

        if (alreadyInCart) {
            toast.warning("Product already in cart");
        } else {
            dispatch(
                addToCart({
                    id: food.id!,
                    title: food.title!,
                    newPrice: Number(food.newPrice),
                    thumb: food.thumb!,
                    quantity: 1,
                })
            );
            toast.success("Product added successfully");
        }
    };


    return (
        <>
            <div className="product">
                <div className="product-contents">
                    <div className="product-image">
                        <Link href={`/shop-single/${id}`}>
                            <Image src={`/assets/img/product/${thumb}`} alt="Product" width={600} height={490} />
                        </Link>
                        <div className="shop-action">
                            <ul>
                                <li className="wishlist">
                                    <Link href="#" scroll={false}><span>Add to wishlist</span></Link>
                                </li>
                                <li className="quick-view">
                                    <Link href="#" scroll={false}><span>Quick view</span></Link>
                                </li>
                            </ul>
                        </div>
                        <div className="product-review">
                            <i className="fas fa-star"></i>
                            <span>{rating}</span>
                        </div>
                    </div>
                    <div className="product-caption">
                        <h4 className="product-title">
                            <Link href={`/shop-single/${id}`}>{title}</Link>
                        </h4>
                        <p>{text}</p>
                        <div className="bottom">
                            <div className="price">
                                <span><del>${oldP}</del> ${newP}</span>
                            </div>
                            <Link href="#" onClick={handleAddToCart} scroll={false} className="add-to-cart">
                                <i className="fas fa-shopping-basket"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleFoodMenuV1;