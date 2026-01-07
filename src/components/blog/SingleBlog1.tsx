import Image from 'next/image';
import Link from 'next/link';

interface DataType {
    id: number;
    thumb: string;
    date: string;
    animationDelay?: string;
    author: string;
    title: string;
    btnText: string;
}

const SingleBlog1 = ({ blog }: { blog: DataType }) => {
    const { id, thumb, date, animationDelay, author, title, btnText } = blog

    return (
        <>
            <div className="col-xl-4 col-md-6 mb-30">
                <div className="blog-style-one" data-aos="fade-up" data-aos-delay={[animationDelay]}>
                    <div className="thumb">
                        <Link href={`/blog-single-with-sidebar/${id}`}>
                            <Image src={`/assets/img/blog/${thumb}`} alt="Thumb" width={800} height={600} />
                        </Link>
                    </div>
                    <div className="info">
                        <div className="blog-meta">
                            <ul>
                                <li>
                                    <span>By </span>
                                    <Link href="#" >{author}</Link>
                                </li>
                                <li>{date}</li>
                            </ul>
                        </div>
                        <h4>
                            <Link href={`/blog-single-with-sidebar/${id}`}>{title}</Link>
                        </h4>
                        <Link href={`/blog-single-with-sidebar/${id}`} className="btn-simple">
                            <i className="fas fa-angle-right"></i>{btnText}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleBlog1;