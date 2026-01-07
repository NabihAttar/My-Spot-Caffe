import HeaderV2 from '../header/HeaderV2';
import FooterV2 from '../footer/FooterV2';

interface DataType {
    children: React.ReactNode;
}

const LayoutV2 = ({ children }: DataType) => {
    return (
        <>
            <div className="wrapper">
                <HeaderV2 />
                {children}
                <FooterV2 />
            </div>
        </>
    );
};

export default LayoutV2;