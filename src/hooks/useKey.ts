import { useState } from 'react';

export function useKeys() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [keys, setKeys] = useState<CryptoKeyPair>(null);
    return [keys, setKeys];
}
