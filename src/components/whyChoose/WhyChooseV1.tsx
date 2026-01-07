import WhyChooseData from '@/assets/jsonData/whyChoose/WhyChooseData.json'
import SingleChooseV1 from './SingleChooseV1';

const WhyChooseV1 = () => {
    return (
        <>
            <div className="choose-us-style-one-one-area default-padding">
                <div className="container">
                    <div className="choose-us-style-one-items">
                        <div className="row">
                            {WhyChooseData.map(choose =>
                                <div className="col-lg-4 col-md-6 choose-us-style-one" key={choose.id}>
                                    <SingleChooseV1 choose={choose} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WhyChooseV1;