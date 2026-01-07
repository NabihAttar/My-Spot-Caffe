import BlogStandardContent from "@/components/blog/BlogStandardContent";
import LayoutV6 from "@/components/layouts/LayoutV6";
import Loading from "@/components/preloader/Loading";
import { Suspense } from "react";

export const metadata = {
    title: "Restan - Blog Standard"
};

const BlogStandardPage = () => {
    return (
        <>
            <LayoutV6 breadCrumb="blog-standard" title="Blog Standard">
                <Suspense fallback={<Loading />}>
                    <BlogStandardContent />
                </Suspense>
            </LayoutV6>
        </>
    );
};

export default BlogStandardPage;