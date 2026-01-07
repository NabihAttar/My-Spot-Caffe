import BodyDark from '@/components/classes/BodyDark';
import LayoutV6 from '@/components/layouts/LayoutV6';
import Loading from '@/components/preloader/Loading';
import ShopPageContent from '@/components/shop/ShopPageContent';
import React, { Suspense } from 'react';

export const metadata = {
    title: "Restan - Shop Dark"
};

const ShopPageDark = () => {
    return (
        <>
            <LayoutV6 breadCrumb="shop-dark" title="Special Food" logoWhite={true}>
                <Suspense fallback={<Loading />}>
                    <ShopPageContent />
                </Suspense>
                <BodyDark />
            </LayoutV6>
        </>
    );
};

export default ShopPageDark;