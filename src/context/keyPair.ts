import { createContext } from 'react';

interface KeyPairContext {
    keyPair: CryptoKeyPair;
    setKeyPair: React.Dispatch<React.SetStateAction<CryptoKeyPair>>;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const KeyPairContext = createContext<KeyPairContext>(null);
