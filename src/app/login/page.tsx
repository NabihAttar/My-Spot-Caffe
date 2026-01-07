import LayoutV6 from "@/components/layouts/LayoutV6";
import LoginContent from "@/components/register/LoginContent";

export const metadata = {
    title: "Restan - Login"
};

const LoginPage = () => {
    return (
        <>
            <LayoutV6 title='Login Page' breadCrumb='login'>
                <LoginContent />
            </LayoutV6>
        </>
    );
};

export default LoginPage;