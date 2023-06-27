import { ChatMessage } from '@/types/chat.ts';

interface ChatAction {
    type: 'clear' | 'add';
    payload?: ChatMessage;
}

const initialState: ChatMessage[] = [];

export default function messageReducer(
    state = initialState,
    action: ChatAction
) {
    switch (action.type) {
        case 'clear':
            return {
                ...state,
                messages: [],
            };
        case 'add':
            if (!action.payload) return state;
            return {
                ...state,
                messages: [...state, action.payload],
            };
        default:
            return state;
    }
}
