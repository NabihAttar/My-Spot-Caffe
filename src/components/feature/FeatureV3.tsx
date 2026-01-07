"use client";
import BookingTableForm from '../form/BookingTableForm';
import FoodCartData from '@/assets/jsonData/food/FoodCartData.json'
import { Swiper, SwiperSlide } from 'swiper/react';
import SingleFoodCategory from '../food/SingleFoodCategory';
import { Keyboard, Autoplay, Navigation } from 'swiper/modules';
import Image from 'next/image';

const FeatureV3 = () => {
    return (
        <>
            <div className="feature-style-three-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 pr-80 pr-md-15 pr-xs-15">
                            <div className="reservation-form light">
                                <i className="fas fa-utensils"></i>
                                <h3>Book a table</h3>
                                <BookingTableForm />
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="relative default-padding-top">
                                <div className="food-swiper-nav">
                                    <div className="food-cat-prev"></div>
                                    <div className="food-cat-next"></div>
                                </div>
                                <div className="food-cat-items">
                                    <h2 className="flex-title mb-35">
                                        <Image src="/assets/img/shape/fire.png" alt="Image Not Found" width={45} height={45} /> Our Popular category
                                    </h2>
                                    <Swiper
                                        modules={[Keyboard, Autoplay, Navigation]}
                                        className="food-cat-carousel"
                                        loop={true}
                                        slidesPerView={1}
                                        spaceBetween={30}
                                        autoplay={true}
                                        pagination={{
                                            el: ".swiper-pagination",
                                            clickable: true,
                                        }}
                                        // Navigation arrows
                                        navigation={{
                                            nextEl: ".food-cat-next",
                                            prevEl: ".food-cat-prev"
                                        }}

                                        breakpoints={{
                                            768: {
                                                slidesPerView: 2,
                                                spaceBetween: 30,
                                            },
                                            992: {
                                                slidesPerView: 3,
                                                spaceBetween: 30,
                                            }
                                        }}
                                    >
                                        {FoodCartData.map(food =>
                                            <SwiperSlide key={food.id}>
                                                <SingleFoodCategory food={food} />
                                            </SwiperSlide>
                                        )}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default FeatureV3;