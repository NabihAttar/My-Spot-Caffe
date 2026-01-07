import AboutV4 from "@/components/about/AboutV4";
import BannerV6 from "@/components/banner/BannerV6";
import BlogV1 from "@/components/blog/BlogV1";
import BodyColor2 from "@/components/classes/BodyColor2";
import DealV2 from "@/components/deal/DealV2";
import FoodMenuV6 from "@/components/food/FoodMenuV6";
import FoodMenuV7 from "@/components/food/FoodMenuV7";
import BusinessHours from "@/components/hours/BusinessHours";
import LayoutV7 from "@/components/layouts/LayoutV7";
import OfferV1 from "@/components/offer/OfferV1";
import TestimonialV1 from "@/components/testimonial/TestimonialV1";

export const metadata = {
    title: "Restan - Home 3"
};

const Home3 = () => {
    return (
        <>
            <LayoutV7>
                <BannerV6 />
                <AboutV4 />
                <FoodMenuV6 />
                <DealV2 />
                <FoodMenuV7 />
                <OfferV1 />
                <BusinessHours />
                <TestimonialV1 />
                <BlogV1 />
                <BodyColor2 />
            </LayoutV7>
        </>
    );
};

export default Home3;