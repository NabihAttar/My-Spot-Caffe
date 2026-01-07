import Link from 'next/link';
import Image from 'next/image';

interface DataType {
    id: number;
    date: string;
    dateIcon: string;
    authorIcon: string;
    thumbFull: string;
    text: string;
    author: string;
    title: string;
    btnText: string;
}

const SingleBlogStandard = ({ blog }: { blog: DataType }) => {
    const { id, date, dateIcon, author, authorIcon, title, thumbFull, text, btnText } = blog

    return (
        <>
            <div className="item">
                <div className="thumb">
                    <Link href={`/blog-single/${id}`}>
                        <Image src={`/assets/img/blog/${thumbFull}`} alt="Thumb" width={1380} height={700} />
                    </Link>
                </div>
                <div className="info">
                    <div className="meta">
                        <ul>
                            <li>
                                <Link href="#" ><i className={dateIcon}></i> {date}</Link>
                            </li>
                            <li>
                                <Link href="#" ><i className={authorIcon}></i> {author}</Link>
                            </li>
                        </ul>
                    </div>
                    <h2><Link href={`/blog-single/${id}`}>{title}</Link></h2>
                    <p>{text}</p>
                    <Link className="btn mt-10 btn-md circle btn-theme animation" href={`/blog-single/${id}`}>{btnText}</Link>
                </div>
            </div>
        </>
    );
};

export default SingleBlogStandard;