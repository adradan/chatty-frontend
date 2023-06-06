import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import {
    decryptMessage,
    encryptMessage,
    generateKeyPair,
} from '@/lib/encryption.ts';
import { KeyPairContext } from '@/context/keyPair.ts';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { AppProvider } from '@/providers/app.tsx';
import { useKeys } from '@/hooks';
import { RouterProvider } from 'react-router-dom';
import { AppRouter } from '@/routes';

function App() {
    const [count, setCount] = useState(0);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [keyPair, setKeyPair] = useKeys();

    useEffect(() => {
        generateKeyPair().then(async (pair) => {
            const enc = await encryptMessage('HELLO, WORLD!', pair.publicKey);
            const dec = await decryptMessage(enc, pair.privateKey);
            console.log(new TextDecoder().decode(dec));
        });
    }, []);

    return <RouterProvider router={AppRouter()} />;
}

export default App;
