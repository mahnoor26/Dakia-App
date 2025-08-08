import { useState, useRef, useEffect } from 'react';
import { IconLogout, IconUser } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useLogout } from '../../../shared/helpers/Logout';

const ProfileDropdown = () => {
    const { user } = useSelector((state: RootState) => state.auth) || {};
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const userLogout = useLogout();

    if (!user) {
        return null;
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white" onClick={() => setIsOpen(!isOpen)}>
                <span>{user.name?.charAt(0).toUpperCase()}</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b">
                        <p className="text-sm font-medium text-gray-900">{user.name || 'No name'}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email || 'No email'}</p>
                    </div>

                    <div className="py-1">
                        <a
                            href="#"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={(e) => {
                                e.preventDefault();
                                userLogout();
                                setIsOpen(false);
                            }}
                        >
                            <IconLogout className="h-4 w-4 mr-2" />
                            Log out
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
