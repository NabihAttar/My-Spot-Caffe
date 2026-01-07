import Link from 'next/link';
import handleSmoothScroll from '../utilities/handleSmoothScroll';

const PaginationV2 = () => {
    return (
        <>
            <li><Link className="previous page-numbers" href="#" onClick={handleSmoothScroll}><i className="fas fa-angle-left"></i></Link></li>
            <li><span aria-current="page" className="page-numbers current">1</span></li>
            <li><Link className="page-numbers" href="#" onClick={handleSmoothScroll}>2</Link></li>
            <li><Link className="next page-numbers" href="#" onClick={handleSmoothScroll}><i className="fas fa-angle-right"></i></Link></li>
        </>
    );
};

export default PaginationV2;