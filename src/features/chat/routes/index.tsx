import { Route, Routes } from 'react-router-dom';
import { Chat } from '@/features/chat/routes/Chat.tsx';

export const ChatRoutes = () => {
    return (
        <Routes>
            <Route path="dm" element={<Chat />} />
        </Routes>
    );
};
