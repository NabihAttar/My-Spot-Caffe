import Link from 'next/link';
import Image from 'next/image';

const DealV1 = () => {
    return (
        <>
            <div className="big-deal-area">
                <div className="container">
                    <div className="deal-style-one-items" style={{ backgroundImage: "url(/assets/img/shape/4.jpg)" }}>
                        <div className="row align-center">
                            <div className="col-lg-6 pr-80 pr-md-15 pr-xs-15">
                                <div className="deal-thumb">
                                    <Image src="/assets/img/illustration/1.png" alt="Image Not Found" width={538} height={534} />
                                    <Image src="/assets/img/illustration/15.png" alt="Image Not Found" width={531} height={518} />
                                    <Image src="/assets/img/illustration/12.png" alt="Image Not Found" width={418} height={400} />
                                    <div className="offer-badge animate" data-aos="zoom-in" data-aos-delay="300">
                                        Save <strong>55%</strong>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="deal-info">
                                    <h4 className="sub-heading">Today Special Offer</h4>
                                    <h2>Explore Irresistible Promotions!</h2>
                                    <p>
                                        Contrasted dissimilar get joy you instrument out reasonably. Again keeps at no meant stuff. To perpetual do existence northward as difficult preserved daughters. Continued at up to zealously necessary.
                                    </p>
                                    <Link className="btn btn-theme circle btn-md animation" href="/shop">Order Today</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DealV1;