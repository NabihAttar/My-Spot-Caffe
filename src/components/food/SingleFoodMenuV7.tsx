import Image from "next/image";
import Link from "next/link";

interface DataType {
    id: number;
    title: string;
    badge: string | null;
    description: string[];
    price: number;
    thumb: string;
}

const SingleFoodMenuV7 = ({ food }: { food: DataType }) => {
    const { id, title, badge, description, price, thumb } = food

    return (
        <>
            <li>
                <div className="thumbnail">
                    <Image src={`/assets/img/shop/${thumb}`} alt="Image Not Found" width={450} height={450} />
                </div>
                <div className="content">
                    <div className="left">
                        <h4>
                            <Link href={`/shop-single/${id}`}>{title}</Link>
                            {badge &&
                                <span className="badge">Must Try</span>
                            }
                        </h4>
                        <p>
                            Ricotta / goat cheese / beetroot
                        </p>
                        <p>{description.join(" / ")}</p>
                    </div>
                    <div className="right">
                        <h3>${price}</h3>
                    </div>
                </div>
            </li>
        </>
    );
};

export default SingleFoodMenuV7;