import BodyDark from '@/components/classes/BodyDark';
import LayoutV6 from '@/components/layouts/LayoutV6';
import LoginContent from '@/components/register/LoginContent';

export const metadata = {
    title: "Restan - Login Dark"
};

const LoginPageDark = () => {
    return (
        <>
            <LayoutV6 logoWhite={true} title='Login Page' breadCrumb='login-dark'>
                <LoginContent />
                <BodyDark />
            </LayoutV6>
        </>
    );
};

export default LoginPageDark;