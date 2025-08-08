import { Navigate, useLocation } from 'react-router-dom';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    const token = localStorage.getItem('token');

    const currentPath = location.pathname;

    const publicPaths = ['/', '/auth/verify-email'];
    const isPublicRoute = publicPaths.some((path) => path === currentPath || currentPath.startsWith('/auth/verify-email'));

    if (token && isPublicRoute) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default PublicRoute;
