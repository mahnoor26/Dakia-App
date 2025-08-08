import AuthPage from '../pages/features/Authentication/Auth';
import VerifyEmail from '../pages/Verification/verify';
import RolesCrud from '../pages/features/RolesManagement/RolesCrud';
import UserCrud from '../pages/features/UserManagement/UserCrud';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from '../shared/components/ProtectedRoute';
import { ReactNode } from 'react';

type LayoutType = 'default' | 'dashboard';

interface AppRoute {
    path: string;
    element: ReactNode;
    layout: LayoutType;
}

export const routes: AppRoute[] = [
    {
        path: '/',
        element: <AuthPage />,
        layout: 'default',
    },
    {
        path: '/auth/verify-email/:id/:hash',
        element: <VerifyEmail />,
        layout: 'default',
    },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        ),
        layout: 'dashboard',
    },
    {
        path: '/dashboard/user',
        element: (
            <ProtectedRoute>
                <UserCrud />
            </ProtectedRoute>
        ),
        layout: 'dashboard',
    },
    {
        path: '/dashboard/roles',
        element: (
            <ProtectedRoute>
                <RolesCrud />
            </ProtectedRoute>
        ),
        layout: 'dashboard',
    },
];
