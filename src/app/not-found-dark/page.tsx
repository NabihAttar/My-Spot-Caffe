import BodyDark from "@/components/classes/BodyDark";
import LayoutV6 from "@/components/layouts/LayoutV6";
import NotFoundContent from "@/components/notFound/NotFoundContent";

export const metadata = {
    title: "Restan - 404 Not Found Dark"
};

const NotFoundDarkPage = () => {
    return (
        <>
            <LayoutV6 breadCrumb="not-found-dark" title="Error Page" logoWhite={true}>
                <NotFoundContent />
                <BodyDark />
            </LayoutV6>
        </>
    );
};

export default NotFoundDarkPage;