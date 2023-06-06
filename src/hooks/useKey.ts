import { useState } from 'react';

type UseKeysType = {
    keyPair: CryptoKeyPair;
    setKeyPair: React.Dispatch<React.SetStateAction<CryptoKeyPair>>;
};

export function useKeys(): UseKeysType {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [keyPair, setKeyPair] = useState<CryptoKeyPair>(null);
    return { keyPair, setKeyPair };
}
