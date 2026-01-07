import Blog3ColumnContent from '@/components/blog/Blog3ColumnContent';
import LayoutV6 from '@/components/layouts/LayoutV6';
import Loading from '@/components/preloader/Loading';
import { Suspense } from 'react';

export const metadata = {
    title: "Restan - Blog 3 Column"
};

const Blog3ColumnPage = () => {
    return (
        <>
            <LayoutV6 breadCrumb="blog-3-column" title="Blog 3 Column">
                <Suspense fallback={<Loading />}>
                    <Blog3ColumnContent />
                </Suspense>
            </LayoutV6>
        </>
    );
};

export default Blog3ColumnPage;