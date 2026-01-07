import FoodMenuV7Data from "@/assets/jsonData/food/FoodMenuV7Data.json"
import SingleFoodMenuV7 from "./SingleFoodMenuV7";

const FoodMenuV7 = () => {
    return (
        <>
            <div className="food-menu-style-three-area default-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <div className="site-heading text-center">
                                <h4 className="sub-title">Popular Menu</h4>
                                <h2 className="title">Latest Food Items</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row gutter-none">
                        <div className="col-xl-6">
                            <ul className="meal-items-three">
                                {FoodMenuV7Data.slice(0, 3).map(food =>
                                    <SingleFoodMenuV7 food={food} key={food.id} />
                                )}
                            </ul>
                        </div>
                        <div className="col-xl-6">
                            <ul className="meal-items-three">
                                {FoodMenuV7Data.slice(3, 6).map(food =>
                                    <SingleFoodMenuV7 food={food} key={food.id} />
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default FoodMenuV7;