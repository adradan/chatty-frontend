import ContentBackdrop from 'src/components/Elements/ContentBackdrop';
import Button from '@/components/Elements/Button';
import TextInput from '@/components/Elements/TextInput';
import { useState } from 'react';
import clsx from 'clsx';

const inputState = {
    Ok: 'ok',
    Error: 'error',
    Loading: 'loading',
    Connected: 'connected',
} as const;

type InputStateKey = keyof typeof inputState;
type InputStateCode = (typeof inputState)[InputStateKey];

export const Login = () => {
    const [username, setUsername] = useState('');
    const [state, setState] = useState<InputStateCode>(inputState.Ok);
    const [error, setError] = useState('');

    const connect = () => {
        if (!username) {
            setError('Username required.');
            setState(inputState.Error);
        }
        setError('');
        setState(inputState.Loading);
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const username = event.target.value.trim();
        setUsername(username);
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
                                value={username}
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
