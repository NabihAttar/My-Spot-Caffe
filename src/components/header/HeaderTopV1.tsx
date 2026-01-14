import SocialShare from '../social/SocialShare';
import Link from 'next/link';
import Image from 'next/image';

interface DataType {
    sectionClass?: string;
}

const HeaderTopV1 = ({ sectionClass }: DataType) => {
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
                                        <Image src="/assets/img/icon/7.png" alt="Icon" width={64} height={64} /> Email: food@restan.com
                                    </a>
                                </li> */}
                            </ul>
                        </div>
                        <div className="col-lg-5 text-end">
                            <div className="item-flex">
                                {/* <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        <Image src="/assets/img/icon/flag.png" alt="Image Not Found" width={50} height={50} />
                                        English <i className="fas fa-angle-down"></i>
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><Link className="dropdown-item" href="#">Spanish</Link></li>
                                        <li><Link className="dropdown-item" href="#">Arabic</Link></li>
                                    </ul>
                                </div> */}
                                <div className="social">
                                    <ul>
                                        <SocialShare />
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeaderTopV1;