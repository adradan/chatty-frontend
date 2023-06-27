import ContentBackdrop from 'src/components/Elements/ContentBackdrop';
import Button from '@/components/Elements/Button';
import { useContext, useState } from 'react';
import clsx from 'clsx';
import { generateKeyPair } from '@/lib/encryption.ts';
import { useNavigate } from 'react-router-dom';
import { KeyPairContext } from '@/context/keyPair.ts';
import { useDb } from '@/lib/db.ts';
import { useSocket } from '@/lib/socketService.ts';
import { useAppDispatch } from '@/hooks/store.ts';
import { chatStateActions } from '@/lib/store/chatState.ts';

const inputState = {
    Ok: 'ok',
    Error: 'error',
    Loading: 'loading',
    Connected: 'connected',
} as const;

type InputStateKey = keyof typeof inputState;
type InputStateCode = (typeof inputState)[InputStateKey];

export const Login = () => {
    const navigate = useNavigate();
    const { setKeyPair } = useContext(KeyPairContext);
    const [state, setState] = useState<InputStateCode>(inputState.Ok);
    const [, setError] = useState('');

    const socketService = useSocket();
    const dbService = useDb();
    const dispatch = useAppDispatch();

    const connect = async () => {
        setError('');
        setState(inputState.Loading);
        const newKeyPair = await generateKeyPair();
        // Save in IndexDB
        await dbService.login(newKeyPair);
        setKeyPair(newKeyPair);
        const exportedPublic = await window.crypto.subtle.exportKey(
            'jwk',
            newKeyPair.publicKey
        );
        const isConnected = await socketService.connect(
            newKeyPair.publicKey,
            newKeyPair.privateKey,
            exportedPublic
        );
        if (isConnected) {
            dispatch(chatStateActions.initializing());
            navigate('/');
            return;
        }
        await dbService.resetDb();
        setError("Couldn't connect to server.");
        setState(inputState.Error);
    };

    return (
        <div className="flex h-full flex-col">
            <h1 className="text-4xl font-bold">Login</h1>
            <div className="mt-8 flex grow justify-center">
                <ContentBackdrop className="flex h-2/4 w-2/4 p-8">
                    <form className="flex flex-col gap-2">
                        <Button
                            variant="sm"
                            onClick={connect}
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className={clsx(
                                        state == inputState.Loading &&
                                            'animate-spin',
                                        'h-4',
                                        'w-4',
                                        state != inputState.Loading && 'hidden'
                                    )}
                                >
                                    <path
                                        stroke="#000"
                                        strokeLinecap="round"
                                        strokeWidth="3.556"
                                        d="M20 12a8 8 0 01-11.76 7.061"
                                    ></path>
                                </svg>
                            }
                        >
                            Connect
                        </Button>
                    </form>
                </ContentBackdrop>
            </div>
        </div>
    );
};
