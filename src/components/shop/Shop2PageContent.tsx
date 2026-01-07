"use client"
import Link from 'next/link';
import ShopProductTab from '@/components/product/ShopProductTab';
import RelatedProducts from '@/components/product/RelatedProducts';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from '@/store/slices/cartSlice';
import { RootState } from '@/store/store';

interface DataType {
    id: number;
    productTag: string[];
    title: string;
    thumb: string;
    newPrice: number;
    oldPrice?: number;
}

const Shop2PageContent = ({ productInfo }: { productInfo: DataType }) => {
    const { productTag, title, newPrice, oldPrice, thumb } = productInfo;

    const newP = (Math.floor(newPrice)).toFixed(2);
    const oldP = oldPrice?.toFixed(2) ?? '';

    // Redux hooks to manage cart state
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items); // adjust this if your slice structure is different

    const handleAddToCart = () => {
        const alreadyInCart = cartItems.some((item) => item.id === productInfo.id);

        if (alreadyInCart) {
            toast.warning("Product already in cart");
        } else {
            dispatch(
                addToCart({
                    id: productInfo.id!,
                    title: productInfo.title!,
                    newPrice: Number(productInfo.newPrice),
                    thumb: productInfo.thumb!,
                    quantity: 1,
                })
            );
            toast.success("Product added successfully");
        }
    };

    return (
        <>
            <div className="validtheme-shop-single-area default-padding">
                <div className="container">
                    <div className="product-details">
                        <div className="row">

                            <div className="col-lg-6">
                                <div className="product-thumb">
                                    <div className="item-box">
                                        <div className="product-item">
                                            <Link href="#" className="item popup-gallery" scroll={false}>
                                                <Image src={`/assets/img/shop/${thumb}`} alt="Thumb" width={450} height={450} />
                                            </Link>
                                            <span className="onsale theme">-16%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="single-product-contents">
                                    <div className="summary-top-box">
                                        <div className="product-tags">
                                            {productTag && productTag.map((data, index) =>
                                                <Link key={index} href="#" scroll={false}>
                                                    {data}
                                                </Link>
                                            )}
                                        </div>
                                        <div className="review-count">
                                            <div className="rating">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star-half-alt"></i>
                                            </div>
                                            <span>(8 Review)</span>
                                        </div>
                                    </div>
                                    <h2 className="product-title">
                                        {title}
                                    </h2>
                                    <div className="price">
                                        <span className={oldPrice ? '' : 'd-none'}>
                                            <del>${oldPrice ? oldP : ''}</del>
                                        </span>
                                        <span className='ms-2'>${newP}</span>
                                    </div>
                                    <div className="product-stock validthemes-in-stock">
                                        <span>In Stock</span>
                                    </div>
                                    <p>
                                        The Aspire 5 is a compact laptop in a thin case with a metal cover, a high-quality Full HD IPS display and a rich set of interfaces. Thanks to its powerful components, the laptop can handle resource-intensive tasks perfectly and is also suitable for most games. non-characteristic words etc. Susp endisse ultricies nisi vel quam suscipit. Sabertooth peacock flounder
                                    </p>
                                    <div className="product-purchase-list">
                                        <input type="number" id="quantity" step="1" name="quantity" min="0" placeholder="0" />
                                        <Link href="#" className="btn secondary btn-theme btn-sm animation" onClick={handleAddToCart} scroll={false}>
                                            <i className="fas fa-shopping-cart"></i>
                                            Add to cart
                                        </Link>
                                        <div className="shop-action">
                                            <ul>
                                                <li className="wishlist">
                                                    <Link href="#" scroll={false}><span>Add to wishlist</span></Link>
                                                </li>
                                                <li className="compare">
                                                    <Link href="#" scroll={false}><span>Compare</span></Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="product-estimate-delivary">
                                        <i className="fas fa-box-open"></i>
                                        <strong> 2-day Delivery</strong>
                                        <span>Speedy and reliable parcel delivery!</span>
                                    </div>
                                    <div className="product-meta">
                                        <span className="sku">
                                            <strong>SKU:</strong> BE45VGRT
                                        </span>
                                        <span className="posted-in">
                                            <strong>Category:</strong>
                                            <Link href="#">Computer</Link>,
                                            <Link href="#">Speaker</Link>,
                                            <Link href="#">Headphone</Link>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ShopProductTab />
                    <RelatedProducts />
                </div>
            </div>
        </>
    );
};

export default Shop2PageContent;