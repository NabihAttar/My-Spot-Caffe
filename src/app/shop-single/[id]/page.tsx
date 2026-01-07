import LayoutV6 from "@/components/layouts/LayoutV6";
import ShopSinglePageContent from "@/components/shop/ShopSinglePageContent";
import ProductData from "@/assets/jsonData/product/ProductData.json";

export const metadata = {
    title: "Restan - Shop Single"
};

interface Params {
    id: string;
}

interface PageProps {
    params: Promise<Params>;
}

const ShopSinglePage = async ({ params }: PageProps) => {

    const { id } = await params;
    const data = ProductData.find(product => product.id === parseInt(id))

    return (
        <>
            <LayoutV6 breadCrumb="shop-single" title="Grilled Flank Steak">
                {data && <ShopSinglePageContent productInfo={data} />}
            </LayoutV6>
        </>
    );
};

export default ShopSinglePage;