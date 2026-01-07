import ChefV1Data from "@/assets/jsonData/chef/ChefV1Data.json"
import SingleChefV1 from './SingleChefV1';

const ChefFull = () => {
    return (
        <>
            <div className="chef-area default-padding text-center">
                <div className="container">

                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="site-heading text-center">
                                <h4 className="sub-title">MASTER CHEFS</h4>
                                <h2 className="title">Meet Our Special Chefs</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {ChefV1Data.map(chef =>
                            <div className="col-xl-4 col-lg-6" key={chef.id}>
                                <SingleChefV1 chef={chef} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChefFull;