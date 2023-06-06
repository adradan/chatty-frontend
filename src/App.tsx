import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useKeys } from '@/hooks';
import {
    decryptMessage,
    encryptMessage,
    generateKeyPair,
} from '@/lib/encryption.ts';

function App() {
    const [count, setCount] = useState(0);
    const [keys, setKeys] = useKeys();

    useEffect(() => {
        generateKeyPair().then(async (pair) => {
            const enc = await encryptMessage('HELLO, WORLD!', pair.publicKey);
            const dec = await decryptMessage(enc, pair.privateKey);
            console.log(new TextDecoder().decode(dec));
        });
    }, []);

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    );
}

export default App;
