type ActionType = 'user/setId' | 'user/setRecipient';

export interface UserAction {
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

export const userAction = (id: string): UserAction => ({
    type: 'user/setId',
    payload: id,
});

export const recipientAction = (id: string): UserAction => ({
    type: 'user/setRecipient',
    payload: id,
});

export default function userReducer(state = initialState, action: UserAction) {
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
