export async function generateKeyPair(): Promise<CryptoKeyPair> {
    // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey
    return await window.crypto.subtle.generateKey(
        {
            name: 'RSA-OAEP',
            modulusLength: 4096,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: 'SHA-256',
        },
        true,
        ['encrypt', 'decrypt']
    );
}

function encodeMessage(message: string) {
    const byteStreamEncoder = new TextEncoder();
    return byteStreamEncoder.encode(message);
}

export async function encryptMessage(
    message: string,
    publicKey: CryptoKey
): Promise<ArrayBuffer> {
    const byteStream = encodeMessage(message);
    return await window.crypto.subtle.encrypt(
        {
            name: 'RSA-OAEP',
        },
        publicKey,
        byteStream
    );
}

export async function decryptMessage(
    message: BufferSource,
    privateKey: CryptoKey
): Promise<ArrayBuffer> {
    return await window.crypto.subtle.decrypt(
        {
            name: 'RSA-OAEP',
        },
        privateKey,
        message
    );
}
