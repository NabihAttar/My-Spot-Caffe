import Link from 'next/link';
import SocialShare from '../social/SocialShare';
import FooterNewsLetter from '../form/FooterNewsLetter';

const FooterRowContent = () => {
    return (
        <>
            <div className="row" >
                <div className="col-lg-3 col-md-6 footer-item mt-50">
                    <div className="f-item about">
                        <h4 className="widget-title">About Us</h4>
                        <p>
                            Continued at zealously necessary is Surrounded sir motionless she end literature. Gay direction neglected.
                        </p>
                        <ul className="footer-social">
                            <SocialShare />
                        </ul>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 mt-50 footer-item pl-50 pl-md-15 pl-xs-15">
                    <div className="f-item link">
                        <h4 className="widget-title">Explore</h4>
                        <ul>
                            <li>
                                <Link href="/about-us">Company Profile</Link>
                            </li>
                            <li>
                                <Link href="/about-us">About</Link>
                            </li>
                            <li>
                                <Link href="/contact">Help Center</Link>
                            </li>
                            <li>
                                <Link href="/contact">Career</Link>
                            </li>
                            <li>
                                <Link href="/about-us">Features</Link>
                            </li>
                            <li>
                                <Link href="/contact">Contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 footer-item  mt-50">
                    <div className="f-item contact">
                        <h4 className="widget-title">Contact Info</h4>
                        <ul>
                            <li>
                                <div className="icon">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                                 <div className="col-lg-5 text-end">
                            <p>
                                {/* <i className="fas fa-map-marker-alt"></i>{" "} */}
                                <a
                                    href="https://maps.app.goo.gl/dzQPx1oz4saUkcRQA"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-reset text-decoration-none"
                                >
                                    Ain Borday St, Baalbek, Lebanon    </a>
                            </p>
                        </div>
                            </li>
                            <li>
                                <div className="icon">
                                    {/* <i className="fas fa-phone"></i> */}
                                </div>
                                 <a
                                    href="https://wa.me/96171592971?text=Hello%20My%20Spot%20Caffe!%20I%27d%20like%20to%20order%20a%20coffee."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="fab fa-whatsapp" style={{ marginRight: 8 }}></i>
                                    71 592 971
                                </a>
                            </li>
                            {/* <li>
                                <div className="icon">
                                    <i className="fas fa-envelope"></i>
                                </div>
                                <div className="content">
                                    <a href="mailto:name@email.com">food@restan.com</a>
                                </div>
                            </li> */}
                        </ul>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 footer-item mt-50">
                    <h4 className="widget-title">Newsletter</h4>
                    <p>
                        Join our subscribers list to get the latest news and special offers.
                    </p>
                    <FooterNewsLetter />
                </div>
            </div>
        </>
    );
};

export default FooterRowContent;