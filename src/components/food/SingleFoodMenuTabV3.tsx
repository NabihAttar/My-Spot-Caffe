import Link from "next/link";
import Image from "next/image";

interface DataType {
  id: number;
  thumb: string;
  name: string;
  price: number;
  priceFull: number;
  leftInfo: string;
  rightInfo: string;
}

const SingleFoodMenuTabV3 = ({ data }: { data: DataType }) => {
  const { id, thumb, name, price, priceFull, leftInfo, rightInfo } = data;

  const showPrice = Number(price) > 0;
  const showPriceFull = Number(priceFull) > 0;

  return (
    <li>
      <div className="thumbnail">
        {/* <Image
          src={`/assets/img/food/${thumb}`}
          alt="Image Not Found"
          width={200}
          height={200}
        /> */}
      </div>

      <div className="content">
        <div className="top">
          <div className="title">
            <h4>
              <Link href={`/shop-single/${id}`}>{name}</Link>
            </h4>
          </div>

          {(showPrice || showPriceFull) && (
            <div className="price">
              {showPrice && <span>${price}</span>}
              {showPriceFull && <span>${priceFull}</span>}
            </div>
          )}
        </div>

        <div className="bottom">
          <div className="left">
            <p>{leftInfo}</p>
          </div>
          <div className="right">
            <p>{rightInfo}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default SingleFoodMenuTabV3;
