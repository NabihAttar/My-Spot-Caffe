import Link from 'next/link';
import Image from 'next/image';

interface DataType {
    id: number;
    thumb: string;
    category: string;
    name: string;
}

const SingleFoodCategory = ({ food }: { food: DataType }) => {
    const { thumb, category, name } = food

    return (
        <>
            <Link href="/shop">
                <Image src={`/assets/img/menu/${thumb}`} alt="Image Not Found" width={800} height={1000} />
                <div className="overlay">
                    <span>{category}</span>
                    <h5>{name}</h5>
                </div>
            </Link>
        </>
    );
};

export default SingleFoodCategory;