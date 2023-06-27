import { ChatMessage } from '@/types/chat.ts';

interface ChatAction {
    type: 'messages/clear' | 'messages/add';
    payload?: ChatMessage;
}

const initialState: ChatMessage[] = [];

export default function messageReducer(
    state = initialState,
    action: ChatAction
) {
    switch (action.type) {
        case 'messages/clear':
            return {
                ...state,
                messages: [],
            };
        case 'messages/add':
            if (!action.payload) return state;
            return {
                ...state,
                messages: [...state, action.payload],
            };
        default:
            return state;
    }
}
