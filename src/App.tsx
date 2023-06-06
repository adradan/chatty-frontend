import { useEffect } from 'react';
import './App.css';
import {
    decryptMessage,
    encryptMessage,
    generateKeyPair,
} from '@/lib/encryption.ts';
import { AppProvider } from '@/providers/app.tsx';
import { useKeys } from '@/hooks';
import { AppRoutes } from '@/routes';
import NavBar from '@/components/NavBar/NavBar.tsx';

function App() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { keyPair, setKeyPair } = useKeys();

    useEffect(() => {
        generateKeyPair().then(async (pair) => {
            const enc = await encryptMessage('HELLO, WORLD!', pair.publicKey);
            const dec = await decryptMessage(enc, pair.privateKey);
            console.log(new TextDecoder().decode(dec));
        });
    }, []);

    return (
        <AppProvider>
            <NavBar />
            <AppRoutes />
        </AppProvider>
    );
}

export default App;
