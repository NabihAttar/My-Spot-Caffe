import Link from 'next/link';
import Image from 'next/image';

const AboutV1 = () => {
    return (
        <>
            <div className="about-style-one-area default-padding">
                <div className="about-thumb">
                    <div className="item animate" data-aos="fade-left" data-aos-delay="100" style={{ backgroundImage: "url(/assets/img/about/section_img_right_800x900.png)" }}></div>
                    <div className="item animate" data-aos="fade-left" data-aos-delay="200" style={{ backgroundImage: "url(/assets/img/about/section_img_left_800x900.png)" }}></div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-6">
                            <div className="about-style-one-info animate" data-aos="fade-up" data-aos-delay="400">
                                <Image src="/assets/img/shape/coffee_lineart_footer_1061x500_black.png" alt="Image Not Found" width={1061} height={500} />
                                <h4 className="sub-heading">About us</h4>
                                <h2 className="title">Visit My Spot <br /> Café in Baalbek</h2>
                                <p>
                                    A calm corner for specialty coffee, warm conversations, and cozy vibes.
                                    Stop by for your daily cup, a quick break, or a quiet place to work — we’ll take care of the rest.
                                </p>
                                <Link className="btn btn-theme btn-md animation mt-10" href="/contact">Contact Us</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutV1;