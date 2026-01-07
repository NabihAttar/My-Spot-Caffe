import Link from 'next/link';
import Image from 'next/image';

const AboutV1 = () => {
    return (
        <>
            <div className="about-style-one-area default-padding">
                <div className="about-thumb">
                    <div className="item animate" data-aos="fade-left" data-aos-delay="100" style={{ backgroundImage: "url(/assets/img/about/2.jpg)" }}></div>
                    <div className="item animate" data-aos="fade-left" data-aos-delay="200" style={{ backgroundImage: "url(/assets/img/about/3.jpg)" }}></div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-6">
                            <div className="about-style-one-info animate" data-aos="fade-up" data-aos-delay="400">
                                <Image src="/assets/img/shape/2.png" alt="Image Not Found" width={1061} height={500} />
                                <h4 className="sub-heading">About us</h4>
                                <h2 className="title">We Invite You <br /> To Visit Our Restaurant</h2>
                                <p>
                                    A relaxing and pleasant atmosphere, good jazz, dinner, and cocktails. The Patio Time Bar opens in the center of Florence. The only bar inspired by the 1960s, it will give you a experience that you’ll have a hard time forgetting.
                                </p>
                                <Link className="btn btn-theme btn-md animation mt-10" href="/about-us">Discover More</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutV1;