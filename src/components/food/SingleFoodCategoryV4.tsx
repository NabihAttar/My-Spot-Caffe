import Link from 'next/link';
import Image from 'next/image';

interface DataType {
    id: number;
    thumb: string;
    name: string;
    price: number;
    priceFull: number;
    leftInfo: string;
    rightInfo: string;
}

const SingleFoodCategoryV4 = ({ data }: { data: DataType }) => {
    const { id, thumb, name, price, leftInfo, rightInfo } = data

    const formattedPrice = (Math.floor(price)).toFixed(2);

    return (
        <>
            <li>
                <div className="thumbnail">
                    <Image src={`/assets/img/food/${thumb}`} alt="Image Not Found" width={200} height={200} />
                </div>
                <div className="content">
                    <div className="top">
                        <div className="title">
                            <h4><Link href={`/shop-single/${id}`}>{name}</Link></h4>
                        </div>
                        <div className="price">
                            <span>${formattedPrice}</span>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="left">
                            <p>{leftInfo}</p>
                        </div>
                        <div className="right">
                            <p>{rightInfo}</p>
                        </div>
                    </div>
                </div>
            </li>
        </>
    );
};

export default SingleFoodCategoryV4;