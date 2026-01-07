import ContactV1 from './ContactV1';
import ContactMap from './ContactMap';
import BusinessHours from '../hours/BusinessHours';

const ContactPageContent = () => {
    return (
        <>
            <ContactV1 />
            <ContactMap />
            <BusinessHours />
        </>
    );
};

export default ContactPageContent;