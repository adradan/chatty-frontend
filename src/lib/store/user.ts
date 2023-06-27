interface KeyAction {
    type: 'set';
    payload: string;
}

export type UserState = string;

const initialState: UserState = '';

export default function userReducer(state = initialState, action: KeyAction) {
    switch (action.type) {
        case 'set':
            return action.payload;
        default:
            return state;
    }
}
