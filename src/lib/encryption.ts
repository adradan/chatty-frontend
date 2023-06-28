const KEY_TYPE = 'RSA-OAEP';
const HASH = 'SHA-256';

export async function generateKeyPair(): Promise<CryptoKeyPair> {
    // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey
    return await window.crypto.subtle.generateKey(
        {
            name: KEY_TYPE,
            modulusLength: 4096,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: HASH,
        },
        true,
        ['encrypt', 'decrypt']
    );
}

function encodeMessage(message: string) {
    const byteStreamEncoder = new TextEncoder();
    return byteStreamEncoder.encode(message);
}

export function bufferToString(buffer: ArrayBuffer) {
    return new TextDecoder('utf-8', { fatal: true }).decode(buffer);
}

export async function importKey(publicKey: JsonWebKey) {
    return await window.crypto.subtle.importKey(
        'jwk',
        publicKey,
        { name: KEY_TYPE, hash: HASH },
        true,
        ['encrypt']
    );
}

export async function encryptMessage(
    message: string,
    publicKey: CryptoKey
): Promise<string> {
    const byteStream = encodeMessage(message);
    const encryptedBuffer = await window.crypto.subtle.encrypt(
        {
            name: KEY_TYPE,
        },
        publicKey,
        byteStream
    );
    return arrayBufferToBase64(encryptedBuffer);
}

// https://stackoverflow.com/questions/9267899/arraybuffer-to-base64-encoded-string
export function arrayBufferToBase64(buffer: ArrayBuffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

// https://stackoverflow.com/questions/21797299/convert-base64-string-to-arraybuffer
export function base64ToArrayBuffer(base64: string) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

export async function decryptMessage(
    message: string,
    privateKey: CryptoKey
): Promise<string | boolean> {
    try {
        const decryptedBuffer = await window.crypto.subtle.decrypt(
            {
                name: KEY_TYPE,
            },
            privateKey,
            base64ToArrayBuffer(message)
        );
        return bufferToString(decryptedBuffer);
    } catch (err) {
        console.log(err, message);
        return false;
    }
}
