type ActionType = 'user/setId' | 'user/setRecipient';

interface KeyAction {
    type: ActionType;
    payload: string;
}

export type UserState = {
    userId: string;
    recipient: string;
};

const initialState: UserState = {
    userId: '',
    recipient: '',
};

export const userAction = (id: string): KeyAction => ({
    type: 'user/setId',
    payload: id,
});

export const recipientAction = (id: string): KeyAction => ({
    type: 'user/setRecipient',
    payload: id,
});

export default function userReducer(state = initialState, action: KeyAction) {
    switch (action.type) {
        case 'user/setRecipient':
            return {
                ...state,
                recipient: action.payload,
            };
        case 'user/setId':
            return {
                ...state,
                userId: action.payload,
            };
        default:
            return state;
    }
}
