import ContentBackdrop from 'src/components/Elements/ContentBackdrop';
import Button from '@/components/Elements/Button';
import { useContext, useEffect, useState } from 'react';
import { initKeys } from '@/lib/encryption.ts';
import { useNavigate } from 'react-router-dom';
import { KeyPairContext } from '@/context/keyPair.ts';
import { useDb } from '@/lib/db.ts';
import Loading from '@/heroicons/Loading.tsx';
import { useAppDispatch, useAppSelector } from '@/hooks/store.ts';
import { erroring } from '@/lib/store/error.ts';

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
    const { keyPair, setKeyPair } = useContext(KeyPairContext);
    const [state, setState] = useState<InputStateCode>(inputState.Ok);

    const dbService = useDb();
    const error = useAppSelector((state) => state.error);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (keyPair) {
            navigate('/chat/dm');
        }
    }, []);

    const connect = async () => {
        setState(inputState.Loading);
        dispatch(erroring('error/clear'));
        const isConnected = await initKeys(dbService, setKeyPair);
        if (isConnected) {
            navigate('/chat/dm');
            return;
        } else {
            setState(inputState.Ok);
        }
    };

    return (
        <div className="flex h-full flex-col">
            <h1 className="text-4xl font-bold">Login</h1>
            <div className="mt-8 flex grow justify-center">
                <ContentBackdrop className="flex h-2/4 w-2/4 p-8">
                    <form className="gap flex w-52 flex-col">
                        <Button
                            size="sm"
                            onClick={connect}
                            icon={
                                <Loading
                                    loading={state === inputState.Loading}
                                />
                            }
                        >
                            Connect
                        </Button>
                        <div className="mt-4">{error}</div>
                    </form>
                </ContentBackdrop>
            </div>
        </div>
    );
};
