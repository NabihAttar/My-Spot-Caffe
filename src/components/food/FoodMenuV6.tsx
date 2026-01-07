"use client"
import BestFoodV6Data from "@/assets/jsonData/food/BestFoodV6Data.json";
import SingleFoodMenuV6 from "./SingleFoodMenuV6";
import { useState } from "react";

const FoodMenuV6 = () => {

    const [activeServiceId, setActiveServiceId] = useState(BestFoodV6Data[0]?.id || null);

    const handleMouseEnter = (id: number) => {
        setActiveServiceId(id);
    };

    const handleMouseLeave = () => {
        // Do nothing on mouse leave to keep the active item
    };

    return (
        <>
            <div className="best-food-style-one-area default-padding bottom-less bg-gray text-center">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <div className="site-heading text-center">
                                <h4 className="sub-title">Our Special</h4>
                                <h2 className="title">Popular Burger</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        {BestFoodV6Data.map(food =>
                            <div className={`col-xl-3 col-lg-6 col-md-6 mb-30 best-food-style-one ${activeServiceId === food.id ? 'active' : ''} `}
                                key={food.id}
                                onMouseEnter={() => handleMouseEnter(food.id)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <SingleFoodMenuV6 food={food} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FoodMenuV6;