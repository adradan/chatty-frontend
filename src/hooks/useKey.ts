import { useState } from 'react';

export function useKeys() {
    const [keys, setKeys] = useState<CryptoKeyPair>();
    return [keys, setKeys];
}
