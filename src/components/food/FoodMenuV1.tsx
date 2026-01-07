"use client";
import FoodMenuV1Data from '@/assets/jsonData/food/FoodMenuV1Data.json'
import SingleFoodMenuV1 from './SingleFoodMenuV1';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Autoplay, Navigation, EffectFade } from 'swiper/modules';

const FoodMenuV1 = () => {
    return (
        <>
            <div className="food-menu-area default-padding-top overflow-hidden">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="site-heading text-center text-light">
                                <h4 className="sub-title">Food Menu</h4>
                                <h2 className="title">Our Specials Menu</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <Swiper
                                className="food-menu-carousel product-style-two"
                                modules={[Keyboard, Autoplay, Navigation, EffectFade]}
                                loop={true}
                                slidesPerView={1}
                                spaceBetween={30}
                                autoplay={false}
                                pagination={{
                                    el: ".swiper-pagination",
                                    clickable: true,
                                }}
                                // Navigation arrows
                                navigation={{
                                    nextEl: ".swiper-button-next",
                                    prevEl: ".swiper-button-prev"
                                }}
                                breakpoints={{
                                    768: {
                                        slidesPerView: 2,
                                        spaceBetween: 30,
                                    },
                                    992: {
                                        slidesPerView: 3,
                                        spaceBetween: 30,
                                    },
                                    1400: {
                                        slidesPerView: 4,
                                        spaceBetween: 30,
                                    },
                                }}
                            >
                                {FoodMenuV1Data.map(food =>
                                    <SwiperSlide key={food.id}>
                                        <SingleFoodMenuV1 food={food} />
                                    </SwiperSlide>
                                )}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default FoodMenuV1;