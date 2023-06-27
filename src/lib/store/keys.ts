interface KeyAction {
    type: 'privateKey' | 'publicKey';
    payload: CryptoKey;
}

export type KeyState = {
    privateKey?: CryptoKey;
    publicKey?: CryptoKey;
};

const initialState: KeyState = {};

export default function keyReducer(state = initialState, action: KeyAction) {
    switch (action.type) {
        case 'privateKey':
            return {
                ...state,
                privateKey: action.payload,
            };
        case 'publicKey':
            return {
                ...state,
                publicKey: action.payload,
            };
        default:
            return state;
    }
}
