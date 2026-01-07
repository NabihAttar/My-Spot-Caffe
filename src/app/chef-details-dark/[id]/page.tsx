import ChefDetailsContent from "@/components/chef/ChefDetailsContent";
import BodyDark from "@/components/classes/BodyDark";
import LayoutV6 from "@/components/layouts/LayoutV6";
import ChefV1Data from "@/assets/jsonData/chef/ChefV1Data.json";

export const metadata = {
    title: "Restan - Chef Details Dark"
};

interface Params {
    id: string;
}

interface PageProps {
    params: Promise<Params>;
}

const ChefDetailsDark = async ({ params }: PageProps) => {

    const { id } = await params;
    const data = ChefV1Data.find(chef => chef.id === parseInt(id))

    return (
        <>
            <LayoutV6 breadCrumb="chef-details-dark" title="Chef Details" logoWhite={true}>
                {data && <ChefDetailsContent chefInfo={data} />}
                <BodyDark />
            </LayoutV6>
        </>
    );
};

export default ChefDetailsDark;