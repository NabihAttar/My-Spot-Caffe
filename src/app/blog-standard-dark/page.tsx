import BlogStandardContent from "@/components/blog/BlogStandardContent";
import BodyDark from "@/components/classes/BodyDark";
import LayoutV6 from "@/components/layouts/LayoutV6";
import Loading from "@/components/preloader/Loading";
import { Suspense } from "react";

export const metadata = {
    title: "Restan - Blog Standard Dark"
};

const BlogStandardPageDark = () => {
    return (
        <>
            <LayoutV6 breadCrumb="blog-standard-dark" title="Blog Standard" logoWhite={true}>
                <Suspense fallback={<Loading />}>
                    <BlogStandardContent />
                </Suspense>
                <BodyDark />
            </LayoutV6>
        </>
    );
};

export default BlogStandardPageDark;