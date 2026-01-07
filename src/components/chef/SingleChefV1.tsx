import Link from 'next/link';
import Image from 'next/image';

interface DataType {
    id: number;
    thumb: string;
    designation: string;
    name: string;
}

const SingleChefV1 = ({ chef }: { chef: DataType }) => {
    const { id, thumb, designation, name } = chef

    return (
        <>
            <div className="chef-style-one">
                <div className="chef-thumb">
                    <Image src={`/assets/img/team/${thumb}`} alt="Image Not Found" width={800} height={800} />
                    <div className="info">
                        <h4><Link href={`/chef-details/${id}`}>{name}</Link></h4>
                        <span>{designation}</span>
                    </div>
                    <ul className="social">
                        <li>
                            <Link href="https://www.facebook.com/" target='_blank'>
                                <i className="fab fa-facebook-f"></i>
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.youtube.com/" target='_blank'>
                                <i className="fab fa-youtube"></i>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default SingleChefV1;