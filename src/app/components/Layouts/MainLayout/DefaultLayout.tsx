import { ToastContainer } from 'react-toastify';
import Footer from './Footer';
import Header from './Header/Header';
import { MainLayoutProps } from './Types';

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden">
            <div className="relative z-10">
                <Header />
            </div>
            <main className="flex-1 relative z-10">{children}</main>
            <div className="relative z-10">
                <Footer />
            </div>
            <ToastContainer />
        </div>
    );
}
