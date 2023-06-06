import { Route, Routes } from 'react-router-dom';
import { Login } from '@/features/user/routes/Login.tsx';

export const UserRoutes = () => {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
        </Routes>
    );
};
