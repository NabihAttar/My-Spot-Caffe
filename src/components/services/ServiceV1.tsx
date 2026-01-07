"use client";
import ServiceV1Data from "@/assets/jsonData/services/ServiceV1Data.json"
import SingleServiceV1 from './SingleServiceV1';
import { Autoplay, Keyboard, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const ServiceV1 = () => {
    return (
        <>
            <div className="services-style-one-area default-padding bg-gray"
                style={{ backgroundImage: 'url(/assets/img/shape/22.png)' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="site-heading">
                                <h4 className="sub-heading">Our Services</h4>
                                <h2 className="title">Types of our Services</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="services-style-one-items">
                    <div className="container">
                        <div className="relative">
                            <div className="services-swiper-nav">
                                <div className="services-cat-prev"></div>
                                <div className="services-cat-next"></div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <Swiper
                                        modules={[Keyboard, Autoplay, Navigation]}
                                        className="services-style-one-carousel"
                                        loop={true}
                                        freeMode={true}
                                        grabCursor={true}
                                        slidesPerView={1}
                                        spaceBetween={50}
                                        autoplay={true}
                                        navigation={{
                                            nextEl: ".services-cat-next",
                                            prevEl: ".services-cat-prev"
                                        }}
                                        breakpoints={{
                                            768: {
                                                slidesPerView: 2,
                                            },
                                            1200: {
                                                slidesPerView: 3,
                                            },
                                        }}
                                    >
                                        {ServiceV1Data.map(service =>
                                            <SwiperSlide key={service.id}>
                                                <SingleServiceV1 service={service} />
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

export default ServiceV1;