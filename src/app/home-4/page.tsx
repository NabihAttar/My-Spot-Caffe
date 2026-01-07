import AboutV3 from "@/components/about/AboutV3";
import BannerV3 from "@/components/banner/BannerV3";
import BlogV1 from "@/components/blog/BlogV1";
import ChefV1 from "@/components/chef/ChefV1";
import FactV1 from "@/components/fact/FactV1";
import FeatureV1 from "@/components/feature/FeatureV1";
import FoodMenuV1 from "@/components/food/FoodMenuV1";
import LayoutV3 from "@/components/layouts/LayoutV3";
import MenuV1 from "@/components/menu/MenuV1";
import OfferProduct from "@/components/product/OfferProduct";

export const metadata = {
    title: "Restan - Home 4"
};

const Home4 = () => {
    return (
        <>
            <LayoutV3>
                <BannerV3 />
                <FeatureV1 />
                <MenuV1 />
                <AboutV3 />
                <FoodMenuV1 />
                <OfferProduct />
                <FactV1 />
                <ChefV1 />
                <BlogV1 />
            </LayoutV3>
        </>
    );
};

export default Home4;