import Image from 'next/image';

interface DataType {
    sectionClass?: string;
}

const HeaderTopV3 = ({ sectionClass }: DataType) => {
    return (
        <>
            <div className={`top-bar-area top-bar-style-one bg-theme text-light ${sectionClass}`}>
                <div className="container">
                    <div className="row align-center">
                        <div className="col-lg-7">
                            <ul className="item-flex">
                                <a
                                    href="https://wa.me/96171592971?text=Hello%20My%20Spot%20Caffe!%20I%27d%20like%20to%20order%20a%20coffee."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="fab fa-whatsapp" style={{ marginRight: 8 }}></i>
                                    71 592 971
                                </a>

                                {/* <li>
                                    <a href="mailto:name@email.com">
                                        <Image src="/assets/img/icon/6.png" alt="Icon" width={64} height={64} /> Email: food@restan.com
                                    </a>
                                </li> */}
                            </ul>
                        </div>
                        <div className="col-lg-5 text-end">
                            <p>
                                <i className="fas fa-map-marker-alt"></i>{" "}
                                <a
                                    href="https://maps.app.goo.gl/dzQPx1oz4saUkcRQA"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-reset text-decoration-none"
                                >Ain Borday St, Baalbek, Lebanon</a>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default HeaderTopV3;