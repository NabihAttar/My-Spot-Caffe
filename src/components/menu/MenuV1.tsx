import MenuV1Data from '@/assets/jsonData/menu/MenuV1Data.json'
import SingleMenuV1 from './SingleMenuV1';

const MenuV1 = () => {
    return (
        <>
            <div className="menu-type-area overflow-hidden default-padding bg-dark bg-cover"
                style={{ backgroundImage: "url(/assets/img/shape/2.jpg)" }}>
                <div className="container">
                    <div className="row">
                        {MenuV1Data.map(menu =>
                            <div className="col-xl-4 col-md-6 menu-type-single" key={menu.id}>
                                <SingleMenuV1 menu={menu} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MenuV1;