import BodyDark from '@/components/classes/BodyDark';
import LayoutV6 from '@/components/layouts/LayoutV6';
import Shop2PageContent from '@/components/shop/Shop2PageContent';
import ProductData from "@/assets/jsonData/product/ProductData.json";

export const metadata = {
    title: "Restan - Shop Single 2 Dark"
};

interface Params {
    id: string;
}

interface PageProps {
    params: Promise<Params>;
}

const ShopSingle2PageDark = async ({ params }: PageProps) => {

    const { id } = await params;
    const data = ProductData.find(product => product.id === parseInt(id))

    return (
        <>
            <LayoutV6 breadCrumb="shop-single-2-dark" title="Grilled Flank Steak" logoWhite={true}>
                {data && <Shop2PageContent productInfo={data} />}
                <BodyDark />
            </LayoutV6>
        </>
    );
};

export default ShopSingle2PageDark;