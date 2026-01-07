"use client";
import BannerV6Data from "@/assets/jsonData/banner/BannerV6Data.json";
import SingleBannerV6 from "./SingleBannerV6";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, EffectFade } from 'swiper/modules';

const BannerV6 = () => {
    return (
        <>
            <div className="banner-area banner-style-six bg-dark navigation-circle overflow-hidden text-light bg-cover"
                style={{ backgroundImage: 'url(/assets/img/banner/9.jpg)' }}>
                <div className="banner-fade">
                    <Swiper
                        modules={[Keyboard, Navigation, EffectFade]}
                        direction={'horizontal'}
                        loop={true}
                        effect={"fade"}
                        fadeEffect={{
                            crossFade: true
                        }}
                        navigation={{
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev"
                        }}
                    >
                        {BannerV6Data.map(banner =>
                            <SwiperSlide key={banner.id}>
                                <SingleBannerV6 banner={banner} />
                            </SwiperSlide>
                        )}
                    </Swiper>
                    <div className="swiper-nav-left">
                        <div className="swiper-button-prev" />
                        <div className="swiper-button-next" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default BannerV6;