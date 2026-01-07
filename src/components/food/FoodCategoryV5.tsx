import FoodCategoryV5Data from '@/assets/jsonData/food/FoodCategoryV5Data.json';
import SingleFoodCategoryV5 from './SingleFoodCategoryV5';

interface DataType {
    hasFull?: boolean;
}

const FoodCategoryV5 = ({ hasFull }: DataType) => {
    return (
        <>
            <div className="food-category-area default-padding bottom-less" style={{ backgroundImage: "url(/assets/img/shape/16.png)" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="site-heading text-center">
                                <h4 className="sub-title">Category</h4>
                                <h2 className="title">Choose Your Best Food</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {hasFull ?
                            <>
                                {FoodCategoryV5Data.map(category =>
                                    <div className="col-xl-3 col-lg-6 col-md-6" key={category.id}>
                                        <SingleFoodCategoryV5 category={category} />
                                    </div>
                                )}
                            </> :
                            <>
                                {FoodCategoryV5Data.slice(0, 4).map(category =>
                                    <div className="col-xl-3 col-lg-6 col-md-6" key={category.id}>
                                        <SingleFoodCategoryV5 category={category} />
                                    </div>
                                )}
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default FoodCategoryV5;