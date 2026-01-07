import BodyDark from "@/components/classes/BodyDark";
import ContactPageContent from "@/components/contact/ContactPageContent";
import LayoutV6 from "@/components/layouts/LayoutV6";

export const metadata = {
    title: "Restan - Contact Dark"
};

const ContactPageDark = () => {
    return (
        <>
            <LayoutV6 title="Contact Us" breadCrumb="contact-dark" logoWhite={true}>
                <ContactPageContent />
                <BodyDark />
            </LayoutV6>
        </>
    );
};

export default ContactPageDark;