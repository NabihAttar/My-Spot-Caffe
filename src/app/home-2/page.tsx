import AboutV5 from "@/components/about/AboutV5";
import BannerV5 from "@/components/banner/BannerV5";
import BlogV1 from "@/components/blog/BlogV1";
import BodyColor2 from "@/components/classes/BodyColor2";
import FoodCategoryV4 from "@/components/food/FoodCategoryV4";
import GalleryV2 from "@/components/gallery/GalleryV2";
import LayoutV2 from "@/components/layouts/LayoutV2";
import ProductV1 from "@/components/product/ProductV1";
import ReservationV1 from "@/components/reservation/ReservationV1";
import ServiceV1 from "@/components/services/ServiceV1";
import TestimonialV1 from "@/components/testimonial/TestimonialV1";
import WhyChooseV2 from "@/components/whyChoose/WhyChooseV2";

export const metadata = {
    title: "Restan - Home 2"
};

const Home2 = () => {
    return (
        <>
            <LayoutV2>
                <BannerV5 />
                <AboutV5 />
                <ServiceV1 />
                <ProductV1 />
                <WhyChooseV2 />
                <FoodCategoryV4 />
                <GalleryV2 />
                <TestimonialV1 />
                <ReservationV1 btnClass="reservation-btn" />
                <BlogV1 />
                <BodyColor2 />
            </LayoutV2>
        </>
    );
};

export default Home2;