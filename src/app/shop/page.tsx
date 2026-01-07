import LayoutV6 from '@/components/layouts/LayoutV6';
import Loading from '@/components/preloader/Loading';
import ShopPageContent from '@/components/shop/ShopPageContent';
import { Suspense } from 'react';

export const metadata = {
    title: "Restan - Shop"
};

const ShopPage = () => {
    return (
        <>
            <LayoutV6 breadCrumb="shop" title="Special Food">
                <Suspense fallback={<Loading />}>
                    <ShopPageContent />
                </Suspense>
            </LayoutV6>
        </>
    );
};

export default ShopPage;