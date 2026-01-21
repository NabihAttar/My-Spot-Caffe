// import FoodCartV4Data from '@/assets/jsonData/food/FoodCartV4Data.json'
// import FoodMenuTabV3 from './FoodMenuTabV3';

// interface DataType {
//     sectionClass?: string;
//     hasTitle?: boolean;
// }

// const FoodMenuV3 = ({ sectionClass, hasTitle }: DataType) => {
//     return (
//         <>
//             <div className={`food-menu-area default-padding-top ${sectionClass}`}>
//                 <div className="container">

//                     {hasTitle &&
//                         <div className="row">
//                             <div className="col-lg-8 offset-lg-2">
//                                 <div className="site-heading text-center text-light">
//                                     <h4 className="sub-title">Food Menu</h4>
//                                     <h2 className="title">Our Specials Menu</h2>
//                                 </div>
//                             </div>
//                         </div>
//                     }

//                     <div className="food-menu-items text-light">
//                         <div className="row">

//                             <div className="col-lg-12 text-center">
//                                 <div className="nav nav-tabs food-menu-nav" id="nav-tab" role="tablist">
//                                     <button className="nav-link active" id="nav-id-1" data-bs-toggle="tab" data-bs-target="#tab1" type="button" role="tab" aria-controls="tab1" aria-selected="true">
//                                         Coffee
//                                     </button>
//                                     <button className="nav-link" id="nav-id-2" data-bs-toggle="tab" data-bs-target="#tab2" type="button" role="tab" aria-controls="tab2" aria-selected="false">
//                                         Hot non-Coffee 
//                                     </button>
//                                     <button className="nav-link" id="nav-id-3" data-bs-toggle="tab" data-bs-target="#tab3" type="button" role="tab" aria-controls="tab3" aria-selected="false">
//                                         Cold Coffee
//                                     </button>
//                                     <button className="nav-link" id="nav-id-4" data-bs-toggle="tab" data-bs-target="#tab4" type="button" role="tab" aria-controls="tab4" aria-selected="false">
//                                         Cold non-Coffee
//                                     </button>
//                                     <button className="nav-link" id="nav-id-5" data-bs-toggle="tab" data-bs-target="#tab5" type="button" role="tab" aria-controls="tab5" aria-selected="false">
//                                         Sandwishes 
//                                     </button>
//                                     <button className="nav-link" id="nav-id-6" data-bs-toggle="tab" data-bs-target="#tab6" type="button" role="tab" aria-controls="tab6" aria-selected="false">
//                                         Desserts
//                                     </button>
//                                     <button className="nav-link" id="nav-id-7" data-bs-toggle="tab" data-bs-target="#tab7" type="button" role="tab" aria-controls="tab7" aria-selected="false">
//                                         Shisha
//                                     </button>
//                                 </div>
//                             </div>

//                             <div className="col-lg-12">
//                                 <div className="tab-content food-menu-tab-content" id="nav-tabContent">
//                                     {FoodCartV4Data.map(food =>
//                                         <div className={`tab-pane fade ${food.tabClass}`} id={food.tabId} role="tabpanel" key={food.id}>
//                                             <div className="row">
//                                                 <div className="col-xl-5 thumb" style={{ background: `url(/assets/img/thumb/${food.tabThumb})` }}>
//                                                     <div className="discount-badge">
//                                                         <strong>{food.discount}%</strong> Discount
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-xl-7">
//                                                     {food.tabContent.slice(0, 1).map(list =>
//                                                         <FoodMenuTabV3 list={list} key={list.id} />
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default FoodMenuV3;

import MenuQRCode from "@/components/QRCode/page";

import FoodCartV4Data from "@/assets/jsonData/food/FoodCartV4Data.json";
import FoodMenuTabV3 from "./FoodMenuTabV3";

interface DataType {
  sectionClass?: string;
  hasTitle?: boolean;
}

const FoodMenuV3 = ({ sectionClass, hasTitle }: DataType) => {
  return (
    <div className={`food-menu-area default-padding-top ${sectionClass}`}>
      <div className="container">
        {hasTitle && (
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="site-heading text-center text-light">
                <h4 className="sub-title"> Menu</h4>
                <h2 className="title">Our Specials Menu</h2>
              </div>
            </div>
          </div>
        )}
      {/* <MenuQRCode /> */}

        <div className="food-menu-items text-light">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="nav nav-tabs food-menu-nav" id="nav-tab" role="tablist">
                {FoodCartV4Data.map((tab, idx) => {
                  const isActive = tab.tabClass?.includes("active") || idx === 0;
                  return (
                    <button
                      key={tab.id}
                      className={`nav-link ${isActive ? "active" : ""}`}
                      id={`nav-${tab.tabId}`}
                      data-bs-toggle="tab"
                      data-bs-target={`#${tab.tabId}`}
                      type="button"
                      role="tab"
                      aria-controls={tab.tabId}
                      aria-selected={isActive}
                    >
                      {tab.tabTitle}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="col-lg-12">
              <div className="tab-content food-menu-tab-content" id="nav-tabContent">
                {FoodCartV4Data.map((food) => (
                  <div
                    className={`tab-pane fade ${food.tabClass}`}
                    id={food.tabId}
                    role="tabpanel"
                    key={food.id}
                  >
                    <div className="row">
                      <div
                        className="col-xl-5 thumb"
                        style={{ background: `url(/assets/img/thumb/${food.tabThumb})` }}
                      >
                        {/* optional: hide badge if 0 */}
                        <div className="discount-badge">
                          <strong>{food.discount}%</strong> Discount
                        </div>
                      </div>

                      <div className="col-xl-7">
                        {food.tabContent.map((list) => (
                          <FoodMenuTabV3 list={list} key={list.id} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodMenuV3;
