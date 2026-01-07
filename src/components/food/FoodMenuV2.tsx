import FoodCartV4Data from '@/assets/jsonData/food/FoodCartV4Data.json'
import FoodMenuTabV2 from './FoodMenuTabV2';
import Image from 'next/image';

const FoodMenuV2 = () => {
    return (
        <>
            <div className="food-menu-style-two-area overflow-hidden default-padding bg-gray">
                <div className="container">
                    <div className="row align-center">
                        <div className="col-lg-4">
                            <div className="nav nav-tabs text-light food-menu-nav style-two" id="nav-tab" role="tablist">

                                <h4 className="sub-heading">Food menu</h4>
                                <h2 className="title">Our Specials Menu</h2>

                                <button className="nav-link active" id="nav-id-1" data-bs-toggle="tab" data-bs-target="#tab1" type="button" role="tab" aria-controls="tab1" aria-selected="true">
                                    Main Dishes
                                    <Image src="/assets/img/icon/9.png" alt="Image Not Found" width={32} height={32} />
                                </button>
                                <button className="nav-link" id="nav-id-2" data-bs-toggle="tab" data-bs-target="#tab2" type="button" role="tab" aria-controls="tab2" aria-selected="false">
                                    Desserts
                                    <Image src="/assets/img/icon/10.png" alt="Image Not Found" width={32} height={32} />
                                </button>
                                <button className="nav-link" id="nav-id-3" data-bs-toggle="tab" data-bs-target="#tab3" type="button" role="tab" aria-controls="tab3" aria-selected="false">
                                    Sea Food
                                    <Image src="/assets/img/icon/11.png" alt="Image Not Found" width={32} height={32} />
                                </button>
                                <button className="nav-link" id="nav-id-4" data-bs-toggle="tab" data-bs-target="#tab4" type="button" role="tab" aria-controls="tab4" aria-selected="false">
                                    Beverage
                                    <Image src="/assets/img/icon/12.png" alt="Image Not Found" width={32} height={32} />
                                </button>
                            </div>
                        </div>
                        <div className="col-lg-7 offset-lg-1">
                            <div className="tab-content food-menu-tab-content style-two" id="nav-tabContent">
                                {FoodCartV4Data.map(food =>
                                    <div className={`tab-pane fade ${food.tabClass}`} id={food.tabId} role="tabpanel" key={food.id}>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                {food.tabContent.slice(0, 1).map(list =>
                                                    <FoodMenuTabV2 list={list} key={list.id} />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FoodMenuV2;