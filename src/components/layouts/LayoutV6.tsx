import HeaderTopV1 from '../header/HeaderTopV1';
import FooterV1 from '../footer/FooterV1';
import HeaderV6 from '../header/HeaderV6';
import BreadCrumb from '../breadCrumb/BreadCrumb';

interface DataType {
    children: React.ReactNode;
    breadCrumb?: string;
    title?: string;
    logoWhite?: boolean;
}

const LayoutV6 = ({ children, breadCrumb, title, logoWhite }: DataType) => {
    return (
        <>
            <div className="wrapper">
                <HeaderTopV1 />
                <HeaderV6 logoWhite={logoWhite} />
                {breadCrumb && <BreadCrumb breadCrumb={breadCrumb} title={title} />}
                {children}
                <FooterV1 />
            </div>
        </>
    );
};

export default LayoutV6;