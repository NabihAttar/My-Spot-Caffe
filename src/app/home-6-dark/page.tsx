import AboutV2 from "@/components/about/AboutV2";
import BannerV2 from "@/components/banner/BannerV2";
import BlogV1 from "@/components/blog/BlogV1";
import BodyDark2 from "@/components/classes/BodyDark2";
import FoodCategoryV5 from "@/components/food/FoodCategoryV5";
import FoodMenuV2 from "@/components/food/FoodMenuV2";
import GalleryV2 from "@/components/gallery/GalleryV2";
import LayoutV5 from "@/components/layouts/LayoutV5";
import ReservationV1 from "@/components/reservation/ReservationV1";
import TestimonialV1 from "@/components/testimonial/TestimonialV1";

export const metadata = {
    title: "Restan - Home 6 Dark"
};

const Home6Dark = () => {
    return (
        <>
            <LayoutV5>
                <BannerV2 />
                <FoodCategoryV5 />
                <AboutV2 />
                <FoodMenuV2 />
                <GalleryV2 />
                <TestimonialV1 />
                <ReservationV1 btnClass="reservation-btn" />
                <BlogV1 />
                <BodyDark2 />
            </LayoutV5>
        </>
    );
};

export default Home6Dark;