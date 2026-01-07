import FoodCartV3Data from '@/assets/jsonData/food/FoodCartV3Data.json'
import SingleFoodCategoryV3 from './SingleFoodCategoryV3';

const FoodCategoryV3 = () => {
    return (
        <>
            <div className="food-menu-style-three-area default-padding-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="site-heading text-center">
                                <h4 className="sub-title">Food Menu</h4>
                                <h2 className="title">Our Specials Menu</h2>
                            </div>
                        </div>
                    </div>
                    <div className="food-menu-three-two-items">
                        <div className="row">
                            <div className="col-lg-12 text-center">

                                <div className="nav nav-tabs food-menu-nav style-three" id="nav-tab" role="tablist">
                                    <button className="nav-link active" id="nav-id-1" data-bs-toggle="tab" data-bs-target="#tab1" type="button" role="tab" aria-controls="tab1" aria-selected="true">
                                        Main Dishes
                                    </button>
                                    <button className="nav-link" id="nav-id-2" data-bs-toggle="tab" data-bs-target="#tab2" type="button" role="tab" aria-controls="tab2" aria-selected="false">
                                        Desserts
                                    </button>
                                    <button className="nav-link" id="nav-id-3" data-bs-toggle="tab" data-bs-target="#tab3" type="button" role="tab" aria-controls="tab3" aria-selected="false">
                                        Sea Food
                                    </button>
                                    <button className="nav-link" id="nav-id-4" data-bs-toggle="tab" data-bs-target="#tab4" type="button" role="tab" aria-controls="tab4" aria-selected="false">
                                        Beverage
                                    </button>
                                </div>

                            </div>
                            <div className="col-lg-12">
                                <div className="tab-content food-style-two-content" id="nav-tabContent">
                                    {FoodCartV3Data.map(cart =>
                                        <div className={`tab-pane fade ${cart.tabClass}`} key={cart.id} id={cart.tabId}>
                                            <div className="row">
                                                {cart.tabData.map(data =>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 mt-30" key={data.id}>
                                                        <SingleFoodCategoryV3 data={data} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FoodCategoryV3;