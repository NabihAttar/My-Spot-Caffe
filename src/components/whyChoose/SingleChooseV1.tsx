import Image from 'next/image';

interface DataType {
    thumb: string;
    info: string;
    text: string;
    delay: string;
}

const SingleChooseV1 = ({ choose }: { choose: DataType }) => {
    const { thumb, info, text, delay } = choose

    return (
        <>
            <div className="item animate" data-aos="fade-up" data-aos-delay={delay}>
                <Image src={`/assets/img/icon/${thumb}`} alt="Icon" width={256} height={256} />
                <h4>{info}</h4>
                <p>{text}</p>
            </div>
        </>
    );
};

export default SingleChooseV1;