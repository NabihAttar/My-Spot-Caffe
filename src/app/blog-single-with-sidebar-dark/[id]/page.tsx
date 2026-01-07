import BlogSingleWithSidebarContent from "@/components/blog/BlogSingleWithSidebarContent";
import BodyDark from "@/components/classes/BodyDark";
import LayoutV6 from "@/components/layouts/LayoutV6";
import blogData from '@/assets/jsonData/blog/BlogData.json';

export const metadata = {
    title: "Restan - Blog Single With Sidebar Dark"
};

interface Params {
    id: string;
}

interface PageProps {
    params: Promise<Params>;
}

const BlogSingleWithSidebarPageDark = async ({ params }: PageProps) => {

    const { id } = await params;
    const data = blogData.find(blog => blog.id === parseInt(id))

    return (
        <>
            <LayoutV6 breadCrumb="blog-single-with-sidebar-dark" title="Blog Single With Sidebar" logoWhite={true}>
                {data && <BlogSingleWithSidebarContent blogInfo={data} />}
                <BodyDark />
            </LayoutV6>
        </>
    );
};

export default BlogSingleWithSidebarPageDark;