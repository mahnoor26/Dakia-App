import { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DakiaLogo from '../../../shared/components/DakiaLogo';
import { SidebarProps } from './Types';
import { NavItem } from '../../../shared/data/types';
import { navItems } from '../../../shared/data/NavItems';
import sidebarPic from '../../../assets/Sidebar/sidebarPic.png';

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleItemClick = (item: NavItem) => {
        const targetPath = location.pathname.startsWith(item.baseLink) ? item.activeLink : item.baseLink;

        navigate(targetPath);
        onClose();
    };

    const isItemActive = (item: NavItem) => {
        return location.pathname.startsWith(item.baseLink) || location.pathname.startsWith(item.activeLink);
    };

    return (
        <aside
            className={`${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            } fixed inset-y-0 left-0 z-40 w-64 transform overflow-y-auto bg-white shadow-lg transition duration-200 ease-in-out md:relative md:translate-x-0`}
        >
            <div className="flex h-16 items-center md:justify-center border-b p-4">
                <DakiaLogo />
                <button onClick={onClose} className="ml-auto md:hidden rounded-md p-1 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="pt-8 px-4 flex flex-col gap-36">
                <nav>
                    <ul className="space-y-4">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <button
                                    onClick={() => handleItemClick(item)}
                                    className={`w-full rounded-md text-sm font-semibold px-4 py-2 text-left ${
                                        isItemActive(item) ? 'bg-primary text-white' : 'text-secondary hover:bg-gray-50 hover:text-primary'
                                    }`}
                                >
                                    {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
                <img src={sidebarPic} alt="dakia" className="w-full" />
            </div>
        </aside>
    );
};

export default Sidebar;
