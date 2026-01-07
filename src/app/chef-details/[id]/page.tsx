import ChefDetailsContent from "@/components/chef/ChefDetailsContent";
import LayoutV6 from "@/components/layouts/LayoutV6";
import ChefV1Data from "@/assets/jsonData/chef/ChefV1Data.json";

export const metadata = {
    title: "Restan - Chef Details"
};

interface Params {
    id: string;
}

interface PageProps {
    params: Promise<Params>;
}

const ChefDetails = async ({ params }: PageProps) => {

    const { id } = await params;
    const data = ChefV1Data.find(chef => chef.id === parseInt(id))

    return (
        <>
            <LayoutV6 breadCrumb="chef-details" title="Chef Details">
                {data && <ChefDetailsContent chefInfo={data} />}
            </LayoutV6>
        </>
    );
};

export default ChefDetails;