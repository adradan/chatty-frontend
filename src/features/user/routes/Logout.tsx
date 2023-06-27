import ContentBackdrop from 'src/components/Elements/ContentBackdrop';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyPairContext } from '@/context/keyPair.ts';
import Button from '@/components/Elements/Button';
import { useDb } from '@/lib/db.ts';
import { useSocket } from '@/lib/socketService.ts';

export const Logout = () => {
    const navigate = useNavigate();
    const { keyPair, setKeyPair } = useContext(KeyPairContext);
    const socketService = useSocket();
    const dbService = useDb();

    useEffect(() => {
        if (!keyPair) {
            navigate('/');
        }
    }, []);

    const logout = async () => {
        await dbService.resetDb();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setKeyPair(null);
        socketService.close();
        navigate('/');
    };

    return (
        <div className="flex h-full flex-col">
            <h1 className="text-4xl font-bold">Logout</h1>
            <div className="mt-8 flex grow justify-center">
                <ContentBackdrop className="flex h-2/4 w-2/4 p-8">
                    <form className="flex flex-col gap-2">
                        <Button size="lg" onClick={logout}>
                            Logout
                        </Button>
                    </form>
                </ContentBackdrop>
            </div>
        </div>
    );
};
