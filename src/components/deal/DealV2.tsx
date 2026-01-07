import Image from "next/image";
import Link from "next/link";

const DealV2 = () => {
    return (
        <>
            <div className="best-deal-style-one-area bg-dark default-padding">
                <div className="container">
                    <div className="row">

                        <div className="col-xl-6 best-deal-style-one">
                            <div className="best-deal-style-one-item">
                                <Image src="/assets/img/deal/1.jpg" alt="Imaeg Not Found" width={800} height={450} />
                                <div className="offer">
                                    <h2>$35.00</h2>
                                    <Image src="/assets/img/shape/24.png" alt="Image Not Found" width={81} height={43} />
                                </div>
                                <div className="info">
                                    <div className="top">
                                        <h4>Eat Sleep And</h4>
                                        <h2>Dream Burger</h2>
                                    </div>
                                    <div className="button">
                                        <Link className="btn btn-md circle btn-light animation" href="/shop-single/1">
                                            Accept This Deal</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6 best-deal-style-one">
                            <div className="best-deal-style-one-item">
                                <Image src="/assets/img/deal/2.jpg" alt="Imaeg Not Found" width={800} height={450} />
                                <div className="item-discount">
                                    <h2>50 <strong>Off</strong></h2>
                                </div>
                                <div className="info">
                                    <div className="top">
                                        <h4>Best deal ever</h4>
                                        <h2>Luger Burger</h2>
                                    </div>
                                    <div className="button">
                                        <Link className="btn btn-md circle btn-theme animation" href="/shop-single/2">
                                            Accept This Deal</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default DealV2;