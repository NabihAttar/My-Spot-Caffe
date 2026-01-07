"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Autoplay, EffectFade, Navigation } from 'swiper/modules';
import BannerV2Data from '@/assets/jsonData/banner/BannerV2Data.json'
import SingleBannerV2 from './SingleBannerV2';

const BannerV2 = () => {
    return (
        <>
            <div className="banner-area banner-style-two navigation-circle text-center zoom-effect text-light">
                <div className="banner-fade">
                    <Swiper
                        modules={[Keyboard, Autoplay, Navigation, EffectFade]}
                        direction={'horizontal'}
                        loop={true}
                        effect={"fade"}
                        fadeEffect={{
                            crossFade: true
                        }}
                        speed={3000}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        navigation={{
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev"
                        }}
                    >
                        {BannerV2Data.map(banner =>
                            <SwiperSlide key={banner.id}>
                                <SingleBannerV2 banner={banner} />
                            </SwiperSlide>
                        )}
                    </Swiper>
                    <div className="swiper-nav-left">
                        <div className="swiper-button-prev"></div>
                        <div className="swiper-button-next"></div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default BannerV2;