import Link from 'next/link';
import Image from 'next/image';

interface DataType {
    id: number;
    thumb: string;
    animation: string;
    delay: string;
    title: string;
    listData: Array<{ id: number; listName: string; price: string }>;
    btnText: string;
}

const SingleMenuV1 = ({ menu }: { menu: DataType }) => {
    const { thumb, delay, title, btnText } = menu

    return (
        <>
            <div className="menu-type-item animate" data-aos="fade-up" data-aos-delay={delay}>
                <div className="thumb">
                    <Image src={`/assets/img/illustration/${thumb}`} alt="Image Not Found" width={450} height={450} />
                </div>
                <div className="info">
                    <h3>{title}</h3>
                    <ul className="menu-type-list">
                        {menu.listData.map(data =>
                            <li key={data.id}><span>{data.listName}</span> <b>{data.price}</b></li>
                        )}
                    </ul>
                    <Link href="/shop" className="btn mt-30 circle btn-sm btn-theme effect">{btnText}</Link>
                </div>
            </div>
        </>
    );
};

export default SingleMenuV1;