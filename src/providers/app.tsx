import { BrowserRouter } from 'react-router-dom';
import { KeyPairContext } from '@/context/keyPair.ts';
import { useEffect, useRef, useState } from 'react';
import { UsernameContext } from '@/context/username.ts';
import { useDb } from '@/lib/db.ts';
import { SocketProvider } from '@/providers/socketProvider.tsx';
import { DbProvider } from '@/providers/dbProvider.tsx';
import { useSocket } from '@/lib/socketService.ts';
import { Provider } from 'react-redux';
import { store } from '@/lib/store.ts';

type AppProviderTypes = {
    children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderTypes) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [keyPair, setKeyPair] = useState<CryptoKeyPair>(null);
    const [username, setUsername] = useState<string>('');

    const dbService = useDb();
    const socketService = useSocket();

    const disableStrictModeRef = useRef(false);

    useEffect(() => {
        if (disableStrictModeRef.current) return;

        dbService.getCache().then(async (cached) => {
            if (!cached) return;
            setUsername(cached.username);
            setKeyPair({
                publicKey: cached.keyPair.publicKey.key,
                privateKey: cached.keyPair.privateKey.key,
            });
            const exported = await window.crypto.subtle.exportKey(
                'jwk',
                cached.keyPair.publicKey.key
            );
            const isConnected = await socketService.connect(
                cached.username,
                exported
            );
            if (isConnected) return;

            setUsername('');
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setKeyPair(null);
        });

        disableStrictModeRef.current = true;
    }, []);

    return (
        <Provider store={store}>
            <DbProvider>
                <SocketProvider>
                    <UsernameContext.Provider value={{ username, setUsername }}>
                        <KeyPairContext.Provider
                            value={{ keyPair, setKeyPair }}
                        >
                            <div className="flex h-full flex-col dark:bg-gray-800">
                                <BrowserRouter>{children}</BrowserRouter>
                            </div>
                        </KeyPairContext.Provider>
                    </UsernameContext.Provider>
                </SocketProvider>
            </DbProvider>
        </Provider>
    );
};
