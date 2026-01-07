import Link from 'next/link';
import Image from 'next/image';

interface DataType {
    id: number;
    thumb: string;
    day: number;
    month: string;
    animationDelay?: string;
    author: string;
    title: string;
    btnText: string;
}

const SingleBlogV1 = ({ blog }: { blog: DataType }) => {
    const { id, thumb, day, month, author, title, btnText } = blog

    return (
        <>
            <div className="home-blog-style-one-item">
                <Link href={`/blog-single-with-sidebar/${id}`}>
                    <Image src={`/assets/img/blog/${thumb}`} alt="Image not Found" width={800} height={600} />
                </Link>
                <div className="content">
                    <div className="info">
                        <div className="date"><strong>{day}</strong> {month}</div>
                        <ul className="blog-meta">
                            <li>
                                By <Link href="#">{author}</Link>
                            </li>
                            <li>
                                <Link href="#">Burger</Link> ,
                                <Link href="#">Food</Link>
                            </li>
                        </ul>
                        <h4 className="title">
                            <Link href={`/blog-single-with-sidebar/${id}`}>{title}</Link>
                        </h4>
                        <Link href={`/blog-single-with-sidebar/${id}`} className="btn-read-more">{btnText} <i className="fas fa-arrow-right"></i></Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleBlogV1;