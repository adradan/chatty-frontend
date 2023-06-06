import { useNavigate } from 'react-router-dom';

export const Landing = () => {
    const navigate = useNavigate();

    return (
        <>
            <div onClick={() => navigate('user/login')}>Test</div>
        </>
    );
};
