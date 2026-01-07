import Image from "next/image";

interface DataType {
    id: number;
    thumb: string;
    infoText: string;
    itemDiscount: string;
}

const SingleBannerV6 = ({ banner }: { banner: DataType }) => {
    const { thumb, infoText, itemDiscount } = banner;

    return (
        <>
            <div className="banner-bg">
                <Image src={`/assets/img/banner/${thumb}`} alt="Image Not Found" width={1900} height={1265} />
            </div>
            <div className="container">
                <div className="content">
                    <div className="row align-center">
                        <div className="col-lg-7">
                            <div className="info-text">
                                <Image src={`/assets/img/illustration/${infoText}`} alt="Image Not Found" width={660} height={485} />
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="item-discount">
                                <Image src={`/assets/img/illustration/${itemDiscount}`} alt="Image Not Found" width={150} height={150} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleBannerV6;