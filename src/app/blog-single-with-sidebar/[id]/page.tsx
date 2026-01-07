import BlogSingleWithSidebarContent from "@/components/blog/BlogSingleWithSidebarContent";
import LayoutV6 from "@/components/layouts/LayoutV6";
import blogData from '@/assets/jsonData/blog/BlogData.json';

export const metadata = {
    title: "Restan - Blog Single With Sidebar"
};

interface Params {
    id: string;
}

interface PageProps {
    params: Promise<Params>;
}

const BlogSingleWithSidebarPage = async ({ params }: PageProps) => {

    const { id } = await params;
    const data = blogData.find(blog => blog.id === parseInt(id))

    return (
        <>
            <LayoutV6 breadCrumb="blog-single-with-sidebar" title="Blog Single With Sidebar">
                {data && <BlogSingleWithSidebarContent blogInfo={data} />}
            </LayoutV6>
        </>
    );
};

export default BlogSingleWithSidebarPage;