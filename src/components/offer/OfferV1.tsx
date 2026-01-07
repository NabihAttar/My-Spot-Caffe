import Image from "next/image";
import Link from "next/link";

const OfferV1 = () => {
    return (
        <>
            <div className="combo-offer-area default-padding bg-theme text-light bg-cover"
                style={{ backgroundImage: 'url(/assets/img/shape/6.jpg)' }}>
                <div className="container">
                    <div className="row align-center">
                        <div className="col-xl-5 col-lg-6">
                            <h4>Super Compbo Offer</h4>
                            <h2 className="title">Burger and sea fish curry combo</h2>
                            <p>
                                Continue indulged speaking the was out horrible for domestic position. Seeing rather her you not esteem men settle genius excuse. Deal say over you age from. Comparison new ham melancholy son themselves.
                            </p>
                            <Link className="btn btn-md circle btn-theme animation mt-10" href="/shop-single/1">Accept This Deal</Link>
                        </div>
                        <div className="col-xl-6 offset-xl-1 col-lg-6">
                            <div className="comob-thumb">
                                <Image src="/assets/img/thumb/12.jpg" width={740} height={740} alt="Image Not Found" />
                                <Image src="/assets/img/illustration/13.png" width={451} height={451} alt="Image Not Found" />
                                <div className="item-price">
                                    <h1><del>$80</del> $65</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OfferV1;