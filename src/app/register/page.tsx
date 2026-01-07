import LayoutV6 from '@/components/layouts/LayoutV6';
import RegisterContent from '@/components/register/RegisterContent';

export const metadata = {
    title: "Restan - Register"
};

const RegisterPage = () => {
    return (
        <>
            <LayoutV6 title="Register Page" breadCrumb="register">
                <RegisterContent />
            </LayoutV6>
        </>
    );
};

export default RegisterPage;