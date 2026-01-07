import NotFoundContent from './NotFoundContent';
import LayoutV6 from '../layouts/LayoutV6';

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