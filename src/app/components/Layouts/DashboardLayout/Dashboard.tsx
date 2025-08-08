import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { DashboardLayoutProps } from './Types';
import { ToastContainer } from 'react-toastify';

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    return (
        <div className="flex h-screen flex-col bg-gray-50">
            <div className="flex flex-1 overflow-hidden">
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <div className="w-full">
                    <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
                    <main className="overflow-y-auto px-6 sm:px-8 py-8 bg-gray-100 h-screen">{children}</main>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default DashboardLayout;
