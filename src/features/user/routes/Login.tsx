import ContentBackdrop from 'src/components/Elements/ContentBackdrop';
import Button from '@/components/Elements/Button';
import TextInput from '@/components/Elements/TextInput';
import { useContext, useState } from 'react';
import clsx from 'clsx';
import { generateKeyPair } from '@/lib/encryption.ts';
import { useNavigate } from 'react-router-dom';
import { KeyPairContext } from '@/context/keyPair.ts';
import { Key, keyDB } from '@/lib/db.ts';
import { UsernameContext } from '@/context/username.ts';

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
    const { setUsername } = useContext(UsernameContext);
    const [usr, setUsr] = useState('');
    const [state, setState] = useState<InputStateCode>(inputState.Ok);
    const [error, setError] = useState('');

    const connect = async () => {
        if (!usr.length) {
            setError('Username required.');
            setState(inputState.Error);
            return;
        }
        setError('');
        setState(inputState.Loading);
        const newKeyPair = await generateKeyPair();
        // Save in IndexDB
        const userId = await keyDB.usernames.add({
            username: usr,
        });
        await keyDB.privateKeys.add({
            key: newKeyPair.privateKey,
            timestamp: new Date(),
            userId,
        } as Key);
        await keyDB.publicKeys.add({
            key: newKeyPair.publicKey,
            timestamp: new Date(),
            userId,
        } as Key);
        setUsername(usr);
        setKeyPair(newKeyPair);

        navigate('/');
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const username = event.target.value.trim();
        setUsr(username);
    };

    return (
        <div className="flex h-full flex-col">
            <h1 className="text-4xl font-bold">Login</h1>
            <div className="mt-8 flex grow justify-center">
                <ContentBackdrop className="flex h-2/4 w-2/4 p-8">
                    <form className="flex flex-col gap-2">
                        <div>
                            <TextInput
                                label="Create a username:"
                                id="username"
                                maxLength={15}
                                value={usr}
                                onChange={onChange}
                                error={error}
                            />
                        </div>
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
