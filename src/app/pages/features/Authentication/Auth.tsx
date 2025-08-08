import AuthForm from '../../../components/Authentication/UserForm';
import { useState } from 'react';
import AuthSideImage from '../../../components/Authentication/AuthSideImage';
import bg from '../../../assets/Auth/authBg.png';

export default function AuthPage() {
    const [isSignIn, setIsSignIn] = useState<boolean>(true);
    const toggleAuthMode = () => {
        setIsSignIn(!isSignIn);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-center max-w-7xl xl:mx-auto bg-cover bg-center px-5" style={{ backgroundImage: `url(${bg})` }}>
            <AuthForm isSignIn={isSignIn} onToggleMode={toggleAuthMode} />
            <div className="hidden md:block">
                <AuthSideImage />
            </div>
        </div>
    );
}
