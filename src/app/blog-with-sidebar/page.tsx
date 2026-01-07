import BlogWithSidebarContent from "@/components/blog/BlogWithSidebarContent";
import LayoutV6 from "@/components/layouts/LayoutV6";
import Loading from "@/components/preloader/Loading";
import { Suspense } from "react";

export const metadata = {
    title: "Restan - Blog With Sidebar"
};

const BlogWithSidebarPage = () => {
    return (
        <>
            <LayoutV6 breadCrumb="blog-with-sidebar" title="Blog With Sidebar">
                <Suspense fallback={<Loading />}>
                    <BlogWithSidebarContent />
                </Suspense>
            </LayoutV6>
        </>
    );
};

export default BlogWithSidebarPage;