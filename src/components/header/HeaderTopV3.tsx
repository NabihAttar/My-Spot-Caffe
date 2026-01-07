import Image from 'next/image';

interface DataType {
    sectionClass?: string;
}

const HeaderTopV3 = ({ sectionClass }: DataType) => {
    return (
        <>
            <div className={`top-bar-area top-bar-style-one bg-theme text-light ${sectionClass}`}>
                <div className="container">
                    <div className="row align-center">
                        <div className="col-lg-7">
                            <ul className="item-flex">
                                <li>
                                    <a href="tel:+4733378901">
                                        <Image src="/assets/img/icon/6.png" alt="Icon" width={64} height={64} /> Phone: +4733378901
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:name@email.com">
                                        <Image src="/assets/img/icon/6.png" alt="Icon" width={64} height={64} /> Email: food@restan.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-5 text-end">
                            <p>
                                <i className="fas fa-map-marker-alt"></i> 175 10h Street, Office 375 Berlin, De 21562
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeaderTopV3;