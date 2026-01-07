import BlogSingleContent from '@/components/blog/BlogSingleContent';
import BodyDark from '@/components/classes/BodyDark';
import LayoutV6 from '@/components/layouts/LayoutV6';
import blogData from '@/assets/jsonData/blog/BlogData.json';

export const metadata = {
    title: "Restan - Blog Single Dark"
};

interface Params {
    id: string;
}

interface PageProps {
    params: Promise<Params>;
}

const BlogSinglePageDark = async ({ params }: PageProps) => {

    const { id } = await params;
    const data = blogData.find(blog => blog.id === parseInt(id))

    return (
        <>
            <LayoutV6 breadCrumb="blog-single-dark" title="Blog Single" logoWhite={true}>
                {data && <BlogSingleContent blogInfo={data} />}
                <BodyDark />
            </LayoutV6>
        </>
    );
};

export default BlogSinglePageDark;