import { BrowserRouter } from 'react-router-dom';
import { KeyPairContext } from '@/context/keyPair.ts';
import { useState } from 'react';
import { UsernameContext } from '@/context/username.ts';

type AppProviderTypes = {
    children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderTypes) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [keyPair, setKeyPair] = useState<CryptoKeyPair>(null);
    const [username, setUsername] = useState<string>('');

    return (
        <UsernameContext.Provider value={{ username, setUsername }}>
            <KeyPairContext.Provider value={{ keyPair, setKeyPair }}>
                <div className="flex h-full flex-col dark:bg-gray-800">
                    <BrowserRouter>{children}</BrowserRouter>
                </div>
            </KeyPairContext.Provider>
        </UsernameContext.Provider>
    );
};
