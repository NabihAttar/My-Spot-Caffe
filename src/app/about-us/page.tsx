import AboutV1 from "@/components/about/AboutV1";
import BrandV1 from "@/components/brand/BrandV1";
import ChefV1 from "@/components/chef/ChefV1";
import BusinessHours from "@/components/hours/BusinessHours";
import LayoutV6 from "@/components/layouts/LayoutV6";

export const metadata = {
    title: "Restan - About Us"
};

const AboutUsPage = () => {
    return (
        <>
            <LayoutV6 breadCrumb="about-us" title="About Us">
                <BrandV1 />
                <AboutV1 />
                <ChefV1 />
                <BusinessHours />
            </LayoutV6>
        </>
    );
};

export default AboutUsPage;