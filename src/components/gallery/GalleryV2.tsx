"use client";
import dynamic from 'next/dynamic';

const GalleryV2 = () => {

    // Dynamically import the IsotopeGallery component with SSR disabled
    const IsotopeGallery = dynamic(() => import('./IsotopeGallery'), { ssr: false });

    return (
        <div className="gallery-style-two-area default-padding">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <div className="site-heading text-center">
                            <h4 className="sub-title">Food Item</h4>
                            <h2 className="title">Our Food Gallery</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <IsotopeGallery />
                </div>
            </div>
        </div>
    );
};

export default GalleryV2;