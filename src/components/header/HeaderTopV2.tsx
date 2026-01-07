import Link from 'next/link';
import Image from 'next/image';

const HeaderTopV2 = () => {
    return (
        <>
            <div className="bg-theme text-light top-bar-style-two">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="topbar-two-items">
                                <div className="topbar-info">
                                    <div className="icon">
                                        <i className="fas fa-phone"></i>
                                    </div>
                                    <div className="info">
                                        <h5>Call for Reservation</h5>
                                        <a href="tel:+4733378901">+4733378901</a>
                                    </div>
                                </div>
                                <div className="logo">
                                    <Link href="/">
                                        <Image src="/assets/img/logo-light.png" alt="Logo" width={675} height={332} />
                                    </Link>
                                </div>
                                <div className="topbar-info">
                                    <div className="icon">
                                        <i className="fas fa-envelope"></i>
                                    </div>
                                    <div className="info">
                                        <h5>Our Location</h5>
                                        <p>
                                            70240 Avenue of the Moon, California
                                        </p>
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

export default HeaderTopV2;