import FooterV1 from "../footer/FooterV1";
import HeaderV7 from "../header/HeaderV7";

interface DataType {
    children: React.ReactNode;
    logoWhite?: boolean
}

const LayoutV7 = ({ children, logoWhite }: DataType) => {
    return (
        <>
            <HeaderV7 logoWhite={logoWhite} />
            {children}
            <FooterV1 />
        </>
    );
};

export default LayoutV7;