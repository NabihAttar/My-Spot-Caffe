import Image from 'next/image';
import Link from 'next/link';

interface DataType {
    id: number;
    thumbFull: string;
    title: string;
    date: string;
}

const SingleRecentPost = ({ blog }: { blog: DataType }) => {
    const { id, thumbFull, title, date } = blog

    const truncateString = (str: string) => {
        if (str.length <= 40) {
            return str;
        }
        return `${str.slice(0, 40)} ...`;
    };

    const truncatedTitle = truncateString(title);

    return (
        <>
            <li>
                <div className="thumb">
                    <Link href={`/blog-single-with-sidebar/${id}`}>
                        <Image src={`/assets/img/blog/${thumbFull}`} alt="Thumb" width={300} height={300} />
                    </Link>
                </div>
                <div className="info">
                    <div className="meta-title">
                        <span className="post-date">{date}</span>
                    </div>
                    <Link href={`/blog-single-with-sidebar/${id}`}>{truncatedTitle}</Link>
                </div>
            </li>
        </>
    );
};

export default SingleRecentPost;