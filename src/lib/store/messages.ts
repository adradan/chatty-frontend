import { ChatMessage } from '@/types/chat.ts';

type ChatType = 'messages/clear' | 'messages/add';

export interface ChatAction {
    type: ChatType;
    payload?: ChatMessage;
}

const initialState: ChatMessage[] = [];

export const messaging = (type: ChatType, payload?: ChatMessage) => {
    return {
        type,
        payload,
    };
};

export default function messageReducer(
    state = initialState,
    action: ChatAction
) {
    switch (action.type) {
        case 'messages/clear':
            return [];
        case 'messages/add':
            if (!action.payload) return state;
            return [...state, action.payload].sort(
                (a, b) => a.timestamp - b.timestamp
            );
        default:
            return state;
    }
}
