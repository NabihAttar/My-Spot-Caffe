import LayoutV6 from '@/components/layouts/LayoutV6';
import NotFoundContent from '@/components/notFound/NotFoundContent';

export const metadata = {
    title: "Restan - Not Found"
};

const NotFoundPage = () => {
    return (
        <>
            <LayoutV6 breadCrumb="not-found" title="Error Page">
                <NotFoundContent />
            </LayoutV6>
        </>
    );
};

export default NotFoundPage;