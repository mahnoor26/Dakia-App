import { FC } from 'react';
import DakiaLogo from '../../../shared/components/DakiaLogo';
import { HeaderProps } from './Types';
import ProfileDropdown from './ProfileDropdown';

const Header: FC<HeaderProps> = ({ onMenuClick }) => {
    return (
        <header className="flex items-center border-b bg-white px-4 sm:px-8  shadow-sm justify-between h-16">
            <div className="flex items-center md:hidden gap-3">
                <button className="md:hidden" onClick={onMenuClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary bg-gray-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <DakiaLogo />
            </div>
            <div className="relative hidden sm:block ">
                <input
                    type="text"
                    placeholder="Search here..."
                    className="rounded-xl border-none px-6 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ background: '#F0F8F6' }}
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <ProfileDropdown />
        </header>
    );
};

export default Header;
