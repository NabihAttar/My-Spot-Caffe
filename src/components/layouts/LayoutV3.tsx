import FooterV1 from '../footer/FooterV1';
import HeaderV3 from '../header/HeaderV3';
import HeaderTopV3 from '../header/HeaderTopV3';

interface DataType {
    children: React.ReactNode;
}

const LayoutV3 = ({ children }: DataType) => {
    return (
        <>
            <div className="wrapper">
                <HeaderTopV3 sectionClass="bg-transparent" />
                <HeaderV3 />
                {children}
                <FooterV1 />
            </div>
        </>
    );
};

export default LayoutV3;