import DownloadApp from "@/components/app/DownloadApp";
import BannerV4 from "@/components/banner/BannerV4";
import BlogV1 from "@/components/blog/BlogV1";
import ChefV1 from "@/components/chef/ChefV1";
import DealV1 from "@/components/deal/DealV1";
import FeatureV3 from "@/components/feature/FeatureV3";
import FoodCategoryV3 from "@/components/food/FoodCategoryV3";
import BusinessHours from "@/components/hours/BusinessHours";
import LayoutV1 from "@/components/layouts/LayoutV1";
import WhyChooseV1 from "@/components/whyChoose/WhyChooseV1";
import FoodCategoryV4 from "@/components/food/FoodCategoryV4";

import WhyChooseV2 from "@/components/whyChoose/WhyChooseV2";
import ProductV1 from "@/components/product/ProductV1";


import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Spot Caffe | Coffee, Drinks & QR Code Menu",
    description:
        "Welcome to My Spot Caffe, your place for coffee, drinks, desserts, and a smooth QR code menu experience.",
    alternates: { canonical: "/home-1" },
};

const Home1 = () => {
    return (
        <>
            <LayoutV1>
                <BannerV4 />
                <ProductV1 />
                <WhyChooseV2 />
                {/* <FoodCategoryV4 /> */}
                {/* <FeatureV3 />
                <WhyChooseV1 />
                <DealV1 /> */}
                {/* <FoodCategoryV3 /> */}
                {/* <DownloadApp /> */}
                <BusinessHours />
                {/* <ChefV1 /> */}
                {/* <BlogV1 /> */}
            </LayoutV1>
        </>
    );
};

export default Home1;