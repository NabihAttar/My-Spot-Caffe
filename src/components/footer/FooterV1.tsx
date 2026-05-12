import Link from 'next/link';
import FooterRowContent from './FooterRowContent';
import Image from 'next/image';

const FooterV1 = () => {
    return (
        <>
            <footer >
                <div className="container" >
                    <div className="footer-style-one bg-brown text-light" >
                        <FooterRowContent />
                    </div>
                </div>

                <div className="footer-bottom text-light">
                    <div className="footer-bottom-shape">
                        <Image src="/assets/img/shape/european-caffe.png" alt="Image Not Found" width={616} height={800} />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="footer-logo">
                                    <Link href="/">
                                        <Image src="/assets/img/my spot logo white.png" alt="My Spot Caffe Logo" width={675} height={332} />
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-6 text-end">
                                <p>
                                    &copy; Copyright {(new Date().getFullYear())}. My Spot Café. All Rights Reserved
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default FooterV1;