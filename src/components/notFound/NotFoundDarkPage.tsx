import NotFoundContent from './NotFoundContent';
import BodyDark from '../classes/BodyDark';
import LayoutV6 from '../layouts/LayoutV6';

const NotFoundDarkPage = () => {
    return (
        <>
            <LayoutV6 breadCrumb="not-found" title="Error Page">
                <NotFoundContent />
                <BodyDark />
            </LayoutV6>
        </>
    );
};

export default NotFoundDarkPage;