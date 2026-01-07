import Link from 'next/link';
import Image from 'next/image';

const AboutV3 = () => {
    return (
        <>
            <div className="about-style-three-area default-padding">
                <div className="container">
                    <div className="row align-center">
                        <div className="col-lg-5">
                            <div className="about-style-three-thumb">
                                <Image className="animate" data-aos="fade-right" data-aos-delay="100" src="/assets/img/about/5.jpg" alt="Image Not Found" width={600} height={760} />
                                <Image className="animate" data-aos="fade-up" data-aos-delay="200" src="/assets/img/thumb/7.jpg" alt="Image Not Found" width={800} height={1000} />
                            </div>
                        </div>
                        <div className="col-lg-7 pl-80 pl-md-15 pl-xs-15">
                            <div className="about-style-three-info">
                                <h4 className="sub-heading">Welcome at</h4>
                                <h2 className="title">Restan Restaurant</h2>
                                <div className="item-grid-two-colum">
                                    <div className="item">
                                        <p>
                                            Codulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now
                                        </p>
                                        <Link className="btn btn-theme btn-md animation" href="/food-menu">Explore menu</Link>
                                    </div>
                                    <div className="item">
                                        <div className="quote">
                                            <p>
                                                Bndulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now
                                            </p>
                                            <div className="site-owner">
                                                <div className="thumb">
                                                    <Image src="/assets/img/team/1.jpg" alt="Image Not Found" width={800} height={800} />
                                                </div>
                                                <div className="info">
                                                    <h4>Mendia Juxef</h4>
                                                    <span>Restaurant Owner</span>
                                                </div>
                                            </div>
                                        </div>
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

export default AboutV3;