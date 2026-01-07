import Link from 'next/link';
import Image from 'next/image';

interface DataType {
    bgThumb: string;
    subTitle: string;
    titleFirst: string;
    titleLast: string;
    textFirst: string;
    textLast: string;
    btnText: string;
}

const SingleBannerV2 = ({ banner }: { banner: DataType }) => {
    const { bgThumb, subTitle, titleFirst, titleLast, textFirst, textLast, btnText } = banner

    return (
        <>
            <div className="banner-thumb bg-cover shadow dark"
                style={{ background: `url(/assets/img/banner/${bgThumb})` }}>
            </div>
            <div className="container">
                <div className="content">
                    <div className="row align-center">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="info">
                                <h4>{subTitle}</h4>
                                <h2>{titleFirst}<br /> {titleLast}</h2>
                                <p>{textFirst} <br /> {textLast}</p>
                                <div className="button mt-30">
                                    <Link className="btn btn-md btn-theme animation" href="/shop">{btnText}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="banner-shap">
                <Image src="/assets/img/shape/12.png" alt="Image Not Found" width={523} height={600} />
                <Image src="/assets/img/shape/13.png" alt="Image Not Found" width={1122} height={600} />
                <Image src="/assets/img/shape/14.png" alt="Image Not Found" width={1122} height={600} />
                <Image src="/assets/img/shape/15.png" alt="Image Not Found" width={772} height={600} />
            </div>
        </>
    );
};

export default SingleBannerV2;