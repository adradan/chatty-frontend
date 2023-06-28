import ContentBackdrop from 'src/components/Elements/ContentBackdrop';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyPairContext } from '@/context/keyPair.ts';
import Button from '@/components/Elements/Button';
import { useDb } from '@/lib/db.ts';
import { useSocket } from '@/lib/socketService.ts';
import { useAppDispatch, useAppSelector } from '@/hooks/store.ts';
import clsx from 'clsx';
import { initKeys } from '@/lib/encryption.ts';
import { chatStateActions } from '@/lib/store/chatState.ts';

export const Settings = () => {
    const THREE_SECONDS = 3000;

    const navigate = useNavigate();
    const { keyPair, setKeyPair } = useContext(KeyPairContext);
    const socketService = useSocket();
    const dbService = useDb();
    const [status, setStatus] = useState('');

    const dispatch = useAppDispatch();
    const stateError = useAppSelector((state) => state.error);
    const timeout = useRef<number | null>(null);

    const statusMessage = stateError || status;

    useEffect(() => {
        if (!keyPair) {
            navigate('/');
        }
        return () => {
            clearTimeout(timeout.current || 0);
        };
    }, []);

    const resetKeys = async () => {
        socketService.close();
        await dbService.resetDb();
        dispatch(chatStateActions.resetting());

        const isConnected = await initKeys(dbService, setKeyPair);

        if (isConnected) {
            setStatus('Successfully reset keys.');
            timeout.current = setTimeout(() => {
                setStatus('');
            }, THREE_SECONDS);
            return;
        }
    };

    return (
        <div className="flex h-full flex-col">
            <h1 className="text-4xl font-bold">Settings</h1>
            <div className="mt-8 flex grow justify-center">
                <ContentBackdrop className="flex h-2/4 w-2/4 flex-col gap-5 p-8">
                    <form className="flex w-fit flex-col gap-2">
                        <Button size="sm" variant="reject" onClick={resetKeys}>
                            Reset Keys
                        </Button>
                    </form>
                    <div
                        className={clsx(
                            stateError && 'text-rose-600',
                            'font-bold',
                            'text-xl'
                        )}
                    >
                        {statusMessage}
                    </div>
                </ContentBackdrop>
            </div>
        </div>
    );
};
