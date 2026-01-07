import Image from 'next/image';
import Counter from '../counter/Counter';

const WhyChooseV2 = () => {
    return (
        <>
            <div className="choose-us-style-one-area shadow dark default-padding text-light bg-fixed"
                style={{ backgroundImage: 'url(/assets/img/banner/15.jpg)' }}>
                <div className="container">
                    <div className="row align-center">
                        <div className="col-lg-5 pr-60 pr-md-15 pr-xs-15">
                            <div className="choose-us-style-two-info">
                                <h2 className="title">Best food ideas in the whole world</h2>
                                <div className="fun-fact-list">
                                    <div className="fun-fact">
                                        <div className="counter">
                                            <div className="timer"><Counter end={65} /></div>
                                            <div className="operator">K</div>
                                        </div>
                                        <span className="medium">Clients Every Day</span>
                                    </div>
                                    <div className="fun-fact">
                                        <div className="counter">
                                            <div className="timer"><Counter end={26} /></div>
                                        </div>
                                        <span className="medium">Hygiene certificate</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="feature-style-two-items">
                                <div className="feature-style-two">
                                    <Image src="/assets/img/icon/16.png" width={240} height={240} alt="Image Not Found" />
                                    <h4>Quality Food</h4>
                                    <p>
                                        Seeing rather is settle genius excuse over to comparison new.
                                    </p>
                                </div>
                                <div className="feature-style-two">
                                    <Image src="/assets/img/icon/15.png" width={256} height={256} alt="Image Not Found" />
                                    <h4>Perfect Test</h4>
                                    <p>
                                        Timing rather is settle genius excuse over to comparison new.
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