import FooterV2 from '../footer/FooterV2';
import HeaderTopV2 from '../header/HeaderTopV2';
import HeaderV5 from '../header/HeaderV5';

interface DataType {
    children: React.ReactNode;
}

const LayoutV5 = ({ children }: DataType) => {
    return (
        <>
            <div className="wrapper">
                <HeaderTopV2 />
                <HeaderV5 />
                {children}
                <FooterV2 />
            </div>
        </>
    );
};

export default LayoutV5;