type keyType = 'dmKey';

export interface KeyAction {
    type: keyType;
    payload?: JsonWebKey;
}

export type KeyState = {
    dmKey?: JsonWebKey;
};

const initialState: KeyState = {};

export const keys = (key?: JsonWebKey): KeyAction => {
    return {
        type: 'dmKey',
        payload: key,
    };
};

export default function keyReducer(state = initialState, action: KeyAction) {
    switch (action.type) {
        case 'dmKey':
            return {
                ...state,
                dmKey: action.payload,
            };
        default:
            return state;
    }
}
