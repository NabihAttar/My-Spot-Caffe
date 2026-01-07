import ContactPageContent from "@/components/contact/ContactPageContent";
import LayoutV6 from "@/components/layouts/LayoutV6";

export const metadata = {
    title: "Restan - Contact"
};

const ContactPage = () => {
    return (
        <>
            <LayoutV6 title="Contact Us" breadCrumb="contact">
                <ContactPageContent />
            </LayoutV6>
        </>
    );
};

export default ContactPage;