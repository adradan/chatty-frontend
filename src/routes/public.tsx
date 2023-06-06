import { RouteObject } from 'react-router-dom';
import { UserRoutes } from '@/features/user/routes';

const Test = () => {
    return <div>User</div>;
};

export const publicRoutes: RouteObject[] = [
    {
        path: '/user',
        element: <Test />,
        children: UserRoutes,
    },
];
