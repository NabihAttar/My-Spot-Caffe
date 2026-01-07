import ProductData from "@/assets/jsonData/product/ProductData.json"
import BodyDark from "@/components/classes/BodyDark";
import LayoutV6 from "@/components/layouts/LayoutV6";
import ShopSinglePageContent from "@/components/shop/ShopSinglePageContent";

export const metadata = {
    title: "Restan - Shop Single Dark"
};

interface Params {
    id: string;
}

interface PageProps {
    params: Promise<Params>;
}

const ShopSinglePageDark = async ({ params }: PageProps) => {

    const { id } = await params;
    const data = ProductData.find(product => product.id === parseInt(id))

    return (
        <>
            <LayoutV6 breadCrumb="shop-single-dark" title="Grilled Flank Steak" logoWhite={true}>
                {data && <ShopSinglePageContent productInfo={data} />}
                <BodyDark />
            </LayoutV6>
        </>
    );
};

export default ShopSinglePageDark;