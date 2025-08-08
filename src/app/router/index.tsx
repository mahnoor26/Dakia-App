import { createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';
import MainLayout from '../components/Layouts/MainLayout/DefaultLayout';
import DashboardLayout from '../components/Layouts/DashboardLayout/Dashboard';

const finalRoutes = routes.map((route) => {
    let element = route.element;

    if (route.layout === 'default') {
        element = <MainLayout>{element}</MainLayout>;
    } else if (route.layout === 'dashboard') {
        element = <DashboardLayout>{element}</DashboardLayout>;
    }

    return {
        path: route.path,
        element,
    };
});

const router = createBrowserRouter(finalRoutes);

export default router;
