import ReservationForm from '../form/ReservationForm';

interface DataType {
    btnClass?: string;
    sectionClass?: string;
}

const ReservationV1 = ({ btnClass, sectionClass }: DataType) => {
    return (
        <>
            <div className={`reservation-area default-padding-top bg-cover shadow dark ${sectionClass}`}
                style={{ backgroundImage: 'url(/assets/img/banner/reservation.png)' }}
                >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="reservation-info text-light">
                                <h4 className="sub-heading">Reservation</h4>
                                <h2 className="title">Reserve Your Favorite Table</h2>
                                <p>
                                    {`My Spot Café is your cozy corner in Baalbek for specialty coffee, fresh bites, and calm moments. Book your table in advance and enjoy your time—whether it’s a morning coffee, a sweet break, or a late-night hangout.`}
                                </p>
                                <div className="reservation-time">
                                    <ul>
                                        <li>
                                            <h4>Coffee & Drinks</h4>
                                            <p>
                                                60+ items
                                            </p>
                                        </li>
                                        <li>
                                            <h4>Desserts & Shisha</h4>
                                            <p>
                                                50+ items
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 offset-lg-1">
                            <div className="reservation-form animate" data-aos="fade-up" data-aos-delay="300">
                                <ReservationForm btnClass={btnClass} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReservationV1;
