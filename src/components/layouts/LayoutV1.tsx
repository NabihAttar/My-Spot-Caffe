import FooterV1 from '../footer/FooterV1';
import HeaderV1 from '../header/HeaderV1'
import HeaderTopV3 from '../header/HeaderTopV3';

interface DataType {
    children: React.ReactNode;
}

const LayoutV1 = ({ children }: DataType) => {
    return (
        <>
            <div className="wrapper">
                <HeaderTopV3 sectionClass='bg-transparent' />
                <HeaderV1 />
                {children}
                <FooterV1 />
            </div>
        </>
    );
};

export default LayoutV1;