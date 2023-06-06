import { Route, RouteObject, Routes } from 'react-router-dom';
import { Login } from '@/features/user/routes/Login.tsx';

export const UserRoutes: RouteObject[] = [
    {
        path: 'login',
        element: <Login />,
    },
];
