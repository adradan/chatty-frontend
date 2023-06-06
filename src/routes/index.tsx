import { createBrowserRouter, useRoutes } from 'react-router-dom';
import { useContext } from 'react';
import { KeyPairContext } from '@/context/keyPair.ts';
import { publicRoutes } from '@/routes/public.tsx';
import { Landing } from '@/features/dashboard';
import { useKeys } from '@/hooks';

export const AppRouter = () => {
    const [keyPair] = useKeys();
    const addProtectedRoutes = keyPair ? [] : publicRoutes;

    console.log(addProtectedRoutes);
    const element = useRoutes([
        ...addProtectedRoutes,
        {
            path: '/',
            element: <Landing />,
        },
    ]);

    return <>{element}</>;
};
