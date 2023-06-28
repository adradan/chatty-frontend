type ErrorType = 'error/set' | 'error/clear';

export interface ErrorAction {
    type: ErrorType;
    payload?: string;
}

export type ErrorState = string;

const initialState: ErrorState = '';

export const erroring = (type: ErrorType, message?: string): ErrorAction => ({
    type,
    payload: message,
});

export default function errorReducer(
    state = initialState,
    action: ErrorAction
) {
    switch (action.type) {
        case 'error/clear':
            return '';
        case 'error/set':
            return action.payload;
        default:
            return state;
    }
}
