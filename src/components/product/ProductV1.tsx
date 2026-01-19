import Link from 'next/link';
import Image from 'next/image';

const ProductV1 = () => {
    return (
        <>
            <div className="offer-product-area default-padding"
                style={{ backgroundImage: 'url(/assets/img/shape/CozyCaffe2.png)' }}
            >
                <div className="container">
                    <div className="row align-center">
                        <div className="col-lg-6">
                            <div className="offer-product-thumb">
                                <Image src="/assets/img/illustration/aboutHome.png" width={538} height={534} alt="Image not found" />
                                <div className="food-quick-info animate" data-aos="fade-left" data-aos-delay="300">
                                    <h4><Link href="#">Signature Latte</Link></h4>
                                    <div className="rating">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star-half-alt"></i>
                                    </div>
                                    <ul>
                                        <li>Double espresso</li>
                                        <li>Silky steamed milk</li>
                                        <li>Balanced sweetness</li>
                                        <li>Available hot or iced</li>
                                    </ul>
                                    {/* <div className="price">
                                        <span><del>$14.00</del> $12.00</span>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 offset-lg-1">
                            <div className="offer-product-info">
                                <h4 className="sub-heading">ABOUT US</h4>
                                <h2 className="title">Your Spot for Specialty <br />Coffee & Calm Moments</h2>
                                <p>
                                    At My Spot Caffè, we believe coffee is a ritual one that deserves care and consistency. From carefully selected beans to perfectly dialed-in espresso, every cup is crafted to taste clean, balanced, and memorable. Whether you’re here to work, meet friends, or take a quiet break, we’ve built a space that feels like yours.
                                </p>
                                <Link className="btn circle btn-theme btn-md animation" href="/about-us">
                                    <i className="fas fa-book-open"></i>
                                    Discover Our Story
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductV1;