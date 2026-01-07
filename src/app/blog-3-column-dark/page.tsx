import Blog3ColumnContent from "@/components/blog/Blog3ColumnContent";
import BodyDark from "@/components/classes/BodyDark";
import LayoutV6 from "@/components/layouts/LayoutV6";
import Loading from "@/components/preloader/Loading";
import { Suspense } from "react";

export const metadata = {
    title: "Restan - Blog 3 Column Dark"
};

const Blog3ColumnPageDark = () => {
    return (
        <>
            <LayoutV6 breadCrumb="blog-3-column-dark" title="Blog 3 Column" logoWhite={true}>
                <Suspense fallback={<Loading />}>
                    <Blog3ColumnContent />
                </Suspense>
                <BodyDark />
            </LayoutV6>
        </>
    );
};

export default Blog3ColumnPageDark;