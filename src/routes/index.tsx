import { useRoutes } from 'react-router-dom';
import { publicRoutes } from '@/routes/public.tsx';
import { Landing } from '@/features/dashboard';
import { useKeys } from '@/hooks';

export const AppRoutes = () => {
    const { keyPair } = useKeys();
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
