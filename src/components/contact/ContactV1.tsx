import ContactForm from '../form/ContactForm';
import Image from 'next/image';

const ContactV1 = () => {
    return (
        <>
            <div className="contact-style-one-area default-padding overflow-hidden">
                <div className="container">
                    <div className="row align-center">
                        {/* <div className="col-lg-10 offset-lg-1">
                            <div className="contact-style-one-info">
                                <ul>
                                    <li data-aos="fade-up" data-aos-delay="100">
                                        <div className="icon">
                                            <Image src="/assets/img/icon/phone.png" alt="Icon" width={256} height={222} />
                                        </div>
                                        <div className="content">
                                            <h5 className="title">Hotline</h5>
                                            <a href="">+4733378901</a>
                                        </div>
                                    </li>
                                    <li data-aos="fade-up" data-aos-delay="300">
                                        <div className="icon">
                                            <Image src="/assets/img/icon/placeholder.png" alt="Icon" width={237} height={236} />
                                        </div>
                                        <div className="info">
                                            <h5 className="title">Our Location</h5>
                                            <p>
                                                55 Main Street, The Grand Avenue 2nd Block, New York City
                                            </p>
                                        </div>
                                    </li>
                                    <li data-aos="fade-up" data-aos-delay="500">
                                        <div className="icon">
                                            <Image src="/assets/img/icon/email.png" alt="Icon" width={256} height={218} />
                                        </div>
                                        <div className="info">
                                            <h5 className="title">Official Email</h5>
                                            <a href="mailto:info@restan.com.com">info@restan.com</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div> */}
                        <div className="col-lg-10 offset-lg-1">
                            <div className="contact-form-style-one">
                                <div className="heading text-center">
                                    <h5 className="sub-title">Keep in touch</h5>
                                    <h2 className="heading">Send us a Massage</h2>
                                </div>
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactV1;