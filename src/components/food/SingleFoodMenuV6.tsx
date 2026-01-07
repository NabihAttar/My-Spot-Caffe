import Image from "next/image";
import RatingsStar from "../utilities/RatingsStar";
import Link from "next/link";

interface DataType {
    id: number;
    title: string;
    thumb: string;
    price: number;
    rating: number;
    description: string;
}

const SingleFoodMenuV6 = ({ food }: { food: DataType }) => {
    const { id, title, thumb, price, rating, description } = food;

    return (
        <>
            <div className="best-food-style-one-item">
                <div className="thumb">
                    <Image src={`/assets/img/shop/${thumb}`} alt="Image Not Found" width={450} height={450} />
                </div>
                <div className="info">
                    <h4><Link href={`/shop-single/${id}`}>{title}</Link></h4>
                    <div className="price-rate">
                        <div className="rating">
                            <RatingsStar ratings={rating} />
                        </div>
                        <h5>${price}</h5>
                    </div>
                    <p>
                        {description}
                    </p>
                </div>
            </div>
        </>
    );
};

export default SingleFoodMenuV6;