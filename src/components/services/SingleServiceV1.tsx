import Link from 'next/link';
import Image from 'next/image';

interface DataType {
    id: number;
    thumb: string;
    serviceName: string;
    openingHours: string;
    items: number;
    price: number;
    title: string;
    btnText: string;
}

const SingleServiceV1 = ({ service }: { service: DataType }) => {
    const { thumb, serviceName, openingHours, items, price, title, btnText } = service

    return (
        <>
            <div className="services-style-one">
                <div className="thumb">
                    <Image src={`/assets/img/services/${thumb}`} alt="Image Not Found" width={550} height={450} />
                    <h4><Link href="#" scroll={false}>{serviceName}</Link></h4>
                </div>
                <div className="info">
                    <ul>
                        <li><span>Opening Time</span> <strong>{openingHours}</strong></li>
                        <li><span>{items}+ Items</span> <strong>${price}</strong></li>
                    </ul>
                    <p>
                        {title}
                    </p>
                    <Link className="btn btn-light circle btn-md animation" href="/reservation">{btnText}</Link>
                </div>
            </div>
        </>
    );
};

export default SingleServiceV1;