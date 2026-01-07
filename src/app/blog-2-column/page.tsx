import Blog2ColumnContent from "@/components/blog/Blog2ColumnContent";
import LayoutV6 from "@/components/layouts/LayoutV6";
import Loading from "@/components/preloader/Loading";
import { Suspense } from "react";

export const metadata = {
    title: "Restan - Blog 2 Column"
};

const Blog2ColumnPage = () => {
    return (
        <>
            <LayoutV6 breadCrumb="blog-2-column" title="Blog 2 Column">
                <Suspense fallback={<Loading />}>
                    <Blog2ColumnContent />
                </Suspense>
            </LayoutV6>
        </>
    );
};

export default Blog2ColumnPage;