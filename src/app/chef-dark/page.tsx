import ChefFull from "@/components/chef/ChefFull";
import BodyDark from "@/components/classes/BodyDark";
import LayoutV6 from "@/components/layouts/LayoutV6";

export const metadata = {
    title: "Restan - Chef Dark"
};

const ChefPageDark = () => {
    return (
        <>
            <LayoutV6 title="Restaurant Chef" breadCrumb="chef-dark" logoWhite={true}>
                <ChefFull />
                <BodyDark />
            </LayoutV6>
        </>
    );
};

export default ChefPageDark;