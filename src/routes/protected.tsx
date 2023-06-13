import { RouteObject } from 'react-router-dom';
import { ChatRoutes } from '@/features/chat/routes';

export const privateRoutes: RouteObject[] = [
    {
        path: '/chat/*',
        element: <ChatRoutes />,
    },
];
