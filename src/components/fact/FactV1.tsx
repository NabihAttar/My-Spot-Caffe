import FactV1Data from '@/assets/jsonData/fact/FactV1Data.json'
import SingleFact from './SingleFact';

const FactV1 = () => {
    return (
        <>
            <div className="fun-facts-area text-center bg-dark text-light default-padding">
                <div className="container">
                    <div className="item-inner">
                        <div className="row">
                            {FactV1Data.map(fact =>
                                <div className="col-lg-3 col-md-6 item" key={fact.id}>
                                    <SingleFact fact={fact} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FactV1;