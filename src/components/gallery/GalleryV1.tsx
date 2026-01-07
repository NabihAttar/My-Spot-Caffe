"use client";
import GalleryV1Data from '@/assets/jsonData/gallery/GalleryV1Data.json'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Autoplay, Pagination } from 'swiper/modules';
import SingleGalleryV1 from './SingleGalleryV1';

const GalleryV1 = () => {
    return (
        <>
            <div className="gallery-style-one-area overflow-hidden default-padding">

                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <div className="site-heading text-center">
                            <h4 className="sub-title">Food Item</h4>
                            <h2 className="title">Our Food Gallery</h2>
                        </div>
                    </div>
                </div>

                <div className="container-full">
                    <div className="row">
                        <div className="col-lg-12">
                            <Swiper
                                modules={[Keyboard, Autoplay, Pagination]}
                                className="gallery-style-one-carousel"
                                loop={true}
                                freeMode={true}
                                grabCursor={true}
                                slidesPerView={1}
                                spaceBetween={50}
                                autoplay={true}
                                pagination={{
                                    el: ".swiper-pagination",
                                    clickable: true,
                                }}
                                breakpoints={{
                                    778: {
                                        slidesPerView: 2,
                                    },
                                    1200: {
                                        slidesPerView: 2.5,
                                        centeredSlides: true,
                                    },
                                }}
                            >
                                {GalleryV1Data.map(gallery =>
                                    <SwiperSlide key={gallery.id} >
                                        <SingleGalleryV1 gallery={gallery} />
                                    </SwiperSlide>
                                )}
                                <div className="swiper-pagination"></div>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default GalleryV1;