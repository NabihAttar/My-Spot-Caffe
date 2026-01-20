import SingleFoodMenuTabV3 from './SingleFoodMenuTabV3';

interface DataType {
    id: number;
    tabData: {
        id: number;
        thumb: string;
        name: string;
        price: number;
        priceFull: number;
        leftInfo: string;
        rightInfo: string;
    }[];
}

const FoodMenuTabV3 = ({ list }: { list: DataType }) => {
    return (
        <>
            <div className="info">
                {/* <ul className="meal-type">
                    <li>Half</li>
                    <li>Full</li>
                </ul> */}
                <ul className="meal-items">
                    {list.tabData.map(data =>
                        <SingleFoodMenuTabV3 data={data} key={data.id} />
                    )}
                </ul>
            </div>
        </>
    );
};

export default FoodMenuTabV3;