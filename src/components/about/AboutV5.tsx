import Link from 'next/link';
import Image from 'next/image';

const AboutV5 = () => {
    return (
        <>
            <div className="about-style-five-area default-padding">
                <div className="container">
                    <div className="row align-center">
                        <div className="col-lg-6">
                            <div className="thumb-style-two">
                                <Image src="/assets/img/illustration/15.png" alt="Image Not Found" width={531} height={518} />
                                <Image className="animate" data-aos="zoom-in" data-aos-delay="300" src="/assets/img/illustration/10.png" alt="Image Not Found" width={618} height={521} />
                            </div>
                        </div>
                        <div className="col-lg-6 pl-50 pl-md-15 pl-xs-15">
                            <h2 className="title">Best food ideas & <br /> traditions in the world</h2>
                            <div className="item-grid-two-colum mt-40">
                                <div className="item">
                                    <p>
                                        Codulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now. Continued at up to zealously necessary breakfast. Surrounded sir motionless she end literature.
                                    </p>
                                    <Link className="btn btn-theme btn-md animation" href="/shop">Explore menu</Link>
                                </div>
                                <div className="item">
                                    <div className="quote">
                                        <ul className="card-info bg-dark text-light">
                                            <li>
                                                <h5>Lunch</h5>
                                                <p>
                                                    Saturday and Sunday <br />
                                                    Reservations from 12pm to 1.30pm
                                                </p>
                                            </li>
                                            <li>
                                                <h5>Dinner</h5>
                                                <p>
                                                    Thursday to Sunday <br />
                                                    Reservations from 6pm to 8.45pm
                                                </p>
                                            </li>
                                        </ul>
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

export default AboutV5;