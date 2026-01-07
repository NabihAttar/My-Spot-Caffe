"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Autoplay, Navigation, EffectFade } from 'swiper/modules';

const BannerV5 = () => {
    return (
        <>
            <div className="banner-area banner-style-five text-center zoom-effect text-light">
                <div className="banner-style-five-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 offset-lg-1">
                                <div className="info">
                                    <div className="text-end">
                                        <h1>Dixor</h1>
                                        <h3>Restaurant</h3>
                                    </div>
                                    <div className="bottom">
                                        <p>
                                            ESTD <strong>1759</strong>
                                        </p>
                                        <span className="marker"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Swiper
                    modules={[Keyboard, Autoplay, Navigation, EffectFade]}
                    className='banner-fade'
                    direction={'horizontal'}
                    loop={true}
                    effect="fade"
                    fadeEffect={{
                        crossFade: true
                    }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}

                    // Navigation arrows
                    navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev"
                    }}

                >
                    <SwiperSlide>
                        <div className="banner-thumb bg-cover" style={{ background: "url(/assets/img/banner/19.jpg)" }}></div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="banner-thumb bg-cover" style={{ background: "url(/assets/img/banner/18.jpg)" }}></div>
                    </SwiperSlide>
                </Swiper>
                <div className="swiper-nav-left">
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
                </div>
            </div >
        </>
    );
};

export default BannerV5;