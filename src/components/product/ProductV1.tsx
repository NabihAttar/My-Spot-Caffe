import Link from 'next/link';
import Image from 'next/image';

const ProductV1 = () => {
    return (
        <>
            <div className="offer-product-area default-padding"
                style={{ backgroundImage: 'url(/assets/img/shape/16.png)' }}>
                <div className="container">
                    <div className="row align-center">
                        <div className="col-lg-6">
                            <div className="offer-product-thumb">
                                <Image src="/assets/img/illustration/1.png" width={538} height={534} alt="Image not found" />
                                <div className="food-quick-info animate" data-aos="fade-left" data-aos-delay="300">
                                    <h4><Link href="#">Grilled Steak Platter</Link></h4>
                                    <div className="rating">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star-half-alt"></i>
                                    </div>
                                    <ul>
                                        <li>Steak</li>
                                        <li>Baguette</li>
                                        <li>Spanish Onion</li>
                                        <li>Salt & Pepper</li>
                                    </ul>
                                    <div className="price">
                                        <span><del>$14.00</del> $12.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 offset-lg-1">
                            <div className="offer-product-info">
                                <h4 className="sub-heading">Daily Offer</h4>
                                <h2 className="title">Grab This Deal <br /> Before It Finished</h2>
                                <p>
                                    New had happen unable uneasy. Drawings can followed improved out sociable not. Earnestly so do instantly pretended. See general few civilly amiable pleased account carried. Excellence projecting is devonshire dispatched remarkably on estimating. Side in so life past. Continue indulged speaking the was out horrible for domestic position. Seeing rather her you not esteem men settle genius excuse. Deal say over you age from. Comparison new ham melancholy son themselves.
                                </p>
                                <Link className="btn circle btn-theme btn-md animation" href="/shop">
                                    <i className="fas fa-shopping-cart"></i> Order Now
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