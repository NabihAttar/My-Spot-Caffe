import Link from 'next/link';
import Image from 'next/image';

interface DataType {
    id: number;
    blogClass: string;
    thumb: string;
    badge: string;
    date: string;
    author: string;
    title: string;
    text: string;
}

const SingleBlog2 = ({ blog }: { blog: DataType }) => {
    const { id, blogClass, thumb, badge, date, author, title, text } = blog

    return (
        <>
            <div className={`blog-style-one solid ${blogClass}`}>
                <div className="thumb">
                    <Image src={`/assets/img/blog/${thumb}`} alt="Image Not Found" width={800} height={600} />
                    <div className="tags"><Link href="#" >{badge}</Link></div>
                    <div className="info">
                        <div className="blog-meta">
                            <ul>
                                <li>
                                    <Link href="#" ><i className="fas fa-user"></i> {author}</Link>
                                </li>
                                <li>{date}</li>
                            </ul>
                        </div>
                        <h4>
                            <Link href={`/blog-single-with-sidebar/${id}`}>{title}</Link>
                        </h4>
                        <p>{[text]}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleBlog2;