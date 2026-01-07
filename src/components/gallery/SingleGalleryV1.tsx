import Link from 'next/link';
import Image from 'next/image';

interface DataType {
    id: number;
    thumb: string;
    subTitle: string;
    title: string;
}

const SingleGalleryV1 = ({ gallery }: { gallery: DataType }) => {
    const { id, subTitle, title, thumb } = gallery


    return (
        <>
            <div className="gallery-style-one">
                <div className="item">
                    <Image src={`/assets/img/portfolio/${thumb}`} alt="Image Not Found" width={800} height={600} />
                    <div className="overlay">
                        <span>{subTitle}</span>
                        <h4><Link href={`/shop-single/${id}`}>{title}</Link></h4>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleGalleryV1;