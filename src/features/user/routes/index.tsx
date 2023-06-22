import { Route, Routes } from 'react-router-dom';
import { Login } from '@/features/user/routes/Login.tsx';
import { Logout } from '@/features/user/routes/Logout.tsx';

export const UserRoutes = () => {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
        </Routes>
    );
};
