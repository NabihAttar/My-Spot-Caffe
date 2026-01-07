import BlogWithSidebarContent from "@/components/blog/BlogWithSidebarContent";
import BodyDark from "@/components/classes/BodyDark";
import LayoutV6 from "@/components/layouts/LayoutV6";
import Loading from "@/components/preloader/Loading";
import { Suspense } from "react";

export const metadata = {
    title: "Restan - Blog With Sidebar Dark"
};

const BlogWithSidebarPageDark = () => {
    return (
        <>
            <LayoutV6 breadCrumb="blog-with-sidebar-dark" title="Blog With Sidebar" logoWhite={true}>
                <Suspense fallback={<Loading />}>
                    <BlogWithSidebarContent />
                </Suspense>
                <BodyDark />
            </LayoutV6>
        </>
    );
};

export default BlogWithSidebarPageDark;