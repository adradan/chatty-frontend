import { BrowserRouter } from 'react-router-dom';
import { KeyPairContext } from '@/context/keyPair.ts';
import { useEffect, useState } from 'react';
import { UsernameContext } from '@/context/username.ts';
import { keyDB } from '@/lib/db.ts';
import { SocketProvider } from '@/providers/socketProvider.tsx';

type AppProviderTypes = {
    children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderTypes) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [keyPair, setKeyPair] = useState<CryptoKeyPair>(null);
    const [username, setUsername] = useState<string>('');

    useEffect(() => {
        const getUsername = async () => {
            const usr = await keyDB.usernames.orderBy('timestamp').last();

            if (!usr) return;
            setUsername(usr.username);
        };
        const getKeyPair = async () => {
            const privateKey = await keyDB.privateKeys
                .orderBy('timestamp')
                .last();
            const publicKey = await keyDB.publicKeys
                .orderBy('timestamp')
                .last();

            if (!privateKey || !publicKey) return;

            setKeyPair({
                publicKey: publicKey.key,
                privateKey: privateKey.key,
            });
        };
        getUsername();
        getKeyPair();
    }, []);

    return (
        <SocketProvider>
            <UsernameContext.Provider value={{ username, setUsername }}>
                <KeyPairContext.Provider value={{ keyPair, setKeyPair }}>
                    <div className="flex h-full flex-col dark:bg-gray-800">
                        <BrowserRouter>{children}</BrowserRouter>
                    </div>
                </KeyPairContext.Provider>
            </UsernameContext.Provider>
        </SocketProvider>
    );
};
