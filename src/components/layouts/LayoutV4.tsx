import FooterV1 from '../footer/FooterV1';
import HeaderTopV1 from '../header/HeaderTopV1';
import HeaderV4 from '../header/HeaderV4';

interface DataType {
    children: React.ReactNode;
    logoWhite?: boolean
}

const LayoutV4 = ({ children, logoWhite }: DataType) => {
    return (
        <>
            <div className="wrapper">
                <HeaderTopV1 />
                <HeaderV4 logoWhite={logoWhite} />
                {children}
                <FooterV1 />
            </div>
        </>
    );
};

export default LayoutV4;