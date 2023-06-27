interface KeyAction {
    type: 'user/set';
    payload: string;
}

export type UserState = string;

const initialState: UserState = '';

export const user = (id: string): KeyAction => ({
    type: 'user/set',
    payload: id,
});

export default function userReducer(state = initialState, action: KeyAction) {
    switch (action.type) {
        case 'user/set':
            return action.payload;
        default:
            return state;
    }
}
