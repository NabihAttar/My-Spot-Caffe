import Blog2ColumnContent from "@/components/blog/Blog2ColumnContent";
import BodyDark from "@/components/classes/BodyDark";
import LayoutV6 from "@/components/layouts/LayoutV6";
import Loading from "@/components/preloader/Loading";
import { Suspense } from "react";

export const metadata = {
    title: "Restan - Blog 2 Column Dark"
};

const Blog2ColumnPageDark = () => {
    return (
        <>
            <LayoutV6 breadCrumb="blog-2-column-dark" title="Blog 2 Column" logoWhite={true}>
                <Suspense fallback={<Loading />}>
                    <Blog2ColumnContent />
                </Suspense>
                <BodyDark />
            </LayoutV6>
        </>
    );
};

export default Blog2ColumnPageDark;