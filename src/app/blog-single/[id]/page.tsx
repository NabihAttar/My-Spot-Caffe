import BlogSingleContent from "@/components/blog/BlogSingleContent";
import LayoutV6 from "@/components/layouts/LayoutV6";
import blogData from '@/assets/jsonData/blog/BlogData.json';

export const metadata = {
    title: "Restan - Blog Single"
};

interface Params {
    id: string;
}

interface PageProps {
    params: Promise<Params>;
}

const BlogSinglePage = async ({ params }: PageProps) => {

    const { id } = await params;
    const data = blogData.find(blog => blog.id === parseInt(id))

    return (
        <>
            <LayoutV6 breadCrumb="blog-single" title="Blog Single">
                {data && <BlogSingleContent blogInfo={data} />}
            </LayoutV6>
        </>
    );
};

export default BlogSinglePage;