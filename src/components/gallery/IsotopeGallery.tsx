import { useEffect, useRef, useState } from 'react';
import Isotope from 'isotope-layout';
import Link from 'next/link';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import GalleryV2Data from '@/assets/jsonData/gallery/GalleryV2Data.json';
import Image from 'next/image';

const IsotopeGallery = () => {

    const galleryRef = useRef(null);
    const [loadedImagesCount, setLoadedImagesCount] = useState(0);
    const totalImages = GalleryV2Data.length;

    const handleImageLoad = () => {
        setLoadedImagesCount((prevCount) => prevCount + 1);
    };

    useEffect(() => {
        if (loadedImagesCount === totalImages && galleryRef.current) {
            const iso = new Isotope(galleryRef.current, {
                itemSelector: '.gallery-item',
                layoutMode: 'masonry',
            });

            setTimeout(() => {
                iso.layout();
            }, 500);

            return () => {
                iso.destroy();
            };
        }
    }, [loadedImagesCount, totalImages]);

    return (
        <>
            <div className="gallery-content-items">
                <PhotoProvider
                    speed={() => 800}
                    easing={(type) =>
                        type === 2
                            ? 'cubic-bezier(0.36, 0, 0.66, -0.56)'
                            : 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }
                >
                    <div
                        id="gallery-masonary"
                        className="gallery-items gallery-style-two colums-3"
                        ref={galleryRef}
                    >
                        {GalleryV2Data.map((item) => (
                            <div className={`gallery-item`} key={item.id}>
                                <div className="gallery-style-one">
                                    <div className="item">
                                        <PhotoView src={`/assets/img/portfolio/${item.thumb}`} width={800} height={1010}>
                                            <Link href="#" className="popup-gallery" scroll={false}>
                                                <Image
                                                    src={`/assets/img/portfolio/${item.thumb}`}
                                                    alt="Image Not Found"
                                                    onLoad={handleImageLoad}
                                                    width={800} height={1010}
                                                />
                                                <div className="overlay">
                                                    <span>{item.subTitle}</span>
                                                    <h4>{item.title}</h4>
                                                </div>
                                            </Link>
                                        </PhotoView>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </PhotoProvider>
            </div>
        </>
    );
};

export default IsotopeGallery;