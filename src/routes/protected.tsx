import { RouteObject } from 'react-router-dom';
import { UserRoutes } from '@/features/user/routes';

export const publicRoutes: RouteObject[] = [
    {
        path: '/chat/*',
        element: <UserRoutes />,
    },
];
