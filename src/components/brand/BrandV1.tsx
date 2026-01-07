"use client";
import BrandV1Data from '@/assets/jsonData/brand/BrandV1Data.json'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Autoplay } from 'swiper/modules';
import Image from 'next/image';

const BrandV1 = () => {
    return (
        <>
            <div className="brand-area overflow-hidden default-padding bg-cover text-center bg-gray" style={{ backgroundImage: "url(/assets/img/shape/1.png)" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h4 className="sub-title">OUR TRUSTED 8K HAPPY PARTNER</h4>
                            <Swiper
                                className="brand-style-one-carousel mt-40"
                                modules={[Keyboard, Autoplay]}
                                loop={true}
                                slidesPerView={2}
                                spaceBetween={30}
                                autoplay={true}
                                breakpoints={{
                                    768: {
                                        slidesPerView: 3,
                                        spaceBetween: 30,
                                    },
                                    992: {
                                        slidesPerView: 4,
                                        spaceBetween: 30,
                                    },
                                    1400: {
                                        slidesPerView: 5,
                                        spaceBetween: 30,
                                    }
                                }}
                            >
                                {BrandV1Data.map(brand =>
                                    <SwiperSlide key={brand.id}>
                                        <Image src={`/assets/img/brand/${brand.thumb}`} alt="Thumb" width={500} height={300} />
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

export default BrandV1;