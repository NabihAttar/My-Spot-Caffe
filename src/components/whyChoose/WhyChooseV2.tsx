import Image from 'next/image';
import Counter from '../counter/Counter';

const WhyChooseV2 = () => {
    return (
        <>
            <div className="choose-us-style-one-area shadow dark default-padding text-light bg-fixed"
                style={{ backgroundImage: 'url(/assets/img/banner/mySpot2.png)' }}
                >
                <div className="container">
                    <div className="row align-center">
                        <div className="col-lg-5 pr-60 pr-md-15 pr-xs-15">
                            <div className="choose-us-style-two-info">
                                <h2 className="title">Best coffee moments in the city</h2>
                                <div className="fun-fact-list">
                                    <div className="fun-fact">
                                        <div className="counter">
                                            <div className="timer" ><Counter end={65} /></div>
                                            <div className="operator">K</div>
                                        </div>
                                        <span className="medium">Cups Served</span>
                                    </div>
                                    <div className="fun-fact">
                                        <div className="counter">
                                            <div className="timer"><Counter end={26} /></div>
                                        </div>
                                        <span className="medium">Signature Drinks</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="feature-style-two-items">
                                <div className="feature-style-two">
                                    <i
                                        className="fas fa-mug-hot"
                                        style={{ fontSize: "56px", color: "#b97e23", lineHeight: 1 }}
                                    ></i>
                                    {/* <Image src="/assets/img/icon/16.png" width={240} height={240} alt="Image Not Found" /> */}
                                    <h4>Quality Beans</h4>
                                    <p>
                                        We source carefully selected beans and dial in espresso daily so every cup tastes clean, smooth, and consistent.
                                    </p>
                                </div>
                                <div className="feature-style-two">
                                    <i className="fas fa-award" style={{ fontSize: "56px", color: "#b97e23", lineHeight: 1 }}></i>
                                    <h4>Perfect Taste</h4>
                                    <p>
                                        From grind to milk texture, we focus on the details. Balanced flavors, great aroma, and a finish you’ll remember.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WhyChooseV2;