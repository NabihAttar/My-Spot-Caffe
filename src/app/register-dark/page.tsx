import BodyDark from "@/components/classes/BodyDark";
import LayoutV6 from "@/components/layouts/LayoutV6";
import RegisterContent from "@/components/register/RegisterContent";

export const metadata = {
    title: "Restan - Register Dark"
};

const RegisterPageDark = () => {
    return (
        <>
            <LayoutV6 title="Register Page" breadCrumb="register-dark" logoWhite={true}>
                <RegisterContent />
                <BodyDark />
            </LayoutV6>
        </>
    );
};

export default RegisterPageDark;