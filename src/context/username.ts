import { createContext } from 'react';

interface UsernameContext {
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const UsernameContext = createContext<UsernameContext>('');
