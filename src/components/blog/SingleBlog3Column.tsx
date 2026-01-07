import Link from 'next/link';
import Image from 'next/image';

interface DataType {
    id: number;
    day: string;
    month: string;
    category: string[];
    author: string;
    title: string;
    btnText: string;
    btnIcon: string;
    thumb: string;
}

const SingleBlog3Column = ({ blog }: { blog: DataType }) => {
    const { id, thumb, day, month, author, title, btnIcon, btnText, category } = blog

    return (
        <>
            <div className="home-blog-style-one-item">
                <Link href={`/blog-single-with-sidebar/${id}`}>
                    <Image src={`/assets/img/blog/${thumb}`} alt="Thumb" width={800} height={600} />
                </Link>
                <div className="content">
                    <div className="info">
                        <div className="date"><strong>{day}</strong> {month}</div>
                        <ul className="blog-meta">
                            <li>
                                By <Link href="#">{author}</Link>
                            </li>
                            <li>
                                <Link href="#">{` ${category}`}</Link>
                            </li>
                        </ul>
                        <h4 className="title">
                            <Link href={`/blog-single-with-sidebar/${id}`}>{title}</Link>
                        </h4>
                        <Link href={`/blog-single-with-sidebar/${id}`} className="btn-read-more">{btnText} <i className={btnIcon}></i></Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleBlog3Column;