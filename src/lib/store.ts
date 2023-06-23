import { ServerMessageCommands } from '@/types/socket.ts';
import { ChatMessage } from '@/types/chat.ts';
import { AnyAction, configureStore } from '@reduxjs/toolkit';

interface AppState {
    lastSentCommand: ServerMessageCommands;
    lastReceivedCommand: ServerMessageCommands;
    privateKey?: CryptoKey;
    publicKey?: CryptoKey;
    username?: string;
    userId?: string;
    messages: ChatMessage[];
}

interface CommandAction {
    type: 'lastSendCommand' | 'lastReceivedCommand';
    value: ServerMessageCommands;
}

interface KeyAction extends AnyAction {
    type: 'privateKey' | 'publicKey';
    value?: CryptoKey;
}

interface UserAction extends AnyAction {
    type: 'username' | 'userId';
    value: string;
}

interface ChatAction extends AnyAction {
    type: 'clear' | 'add';
    value?: ChatMessage;
}

type RootActions = CommandAction | KeyAction | UserAction | ChatAction;

const initialState: AppState = {
    lastSentCommand: ServerMessageCommands.Unknown,
    lastReceivedCommand: ServerMessageCommands.Unknown,
    messages: [],
};

const commandReducer = (state = initialState, action: RootActions) => {
    switch (action.type) {
        case 'lastSendCommand':
            return {
                ...state,
                lastSentCommand: action.value,
            };
        case 'lastReceivedCommand':
            return {
                ...state,
                lastReceivedCommand: action.value,
            };
        default:
            return state;
    }
};

const keyReducer = (state = initialState, action: RootActions) => {
    switch (action.type) {
        case 'privateKey':
            return {
                ...state,
                privateKey: action.value,
            };
        case 'publicKey':
            return {
                ...state,
                publicKey: action.value,
            };
        default:
            return state;
    }
};

const userReducer = (state = initialState, action: RootActions) => {
    switch (action.type) {
        case 'username':
            return {
                ...state,
                username: action.value,
            };
        case 'userId':
            return {
                ...state,
                userId: action.value,
            };
        default:
            return state;
    }
};

const chatReducer = (state = initialState, action: RootActions) => {
    switch (action.type) {
        case 'clear':
            return {
                ...state,
                messages: [],
            };
        case 'add':
            if (!action.value) return state;
            return {
                ...state,
                messages: [...state.messages, action.value],
            };
        default:
            return state;
    }
};

export const store = configureStore({
    reducer: {
        commands: commandReducer,
        keys: keyReducer,
        user: userReducer,
        chat: chatReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type selectFn<T> = (state: RootState) => T;

export function observeStore<T>(
    s: typeof store,
    select: selectFn<T>,
    onChange: (state: T) => void
) {
    let currentState: T;

    function handleChange() {
        const nextState = select(s.getState());
        if (nextState !== currentState) {
            currentState = nextState;
            onChange(currentState);
        }
    }

    const unsubscribe = store.subscribe(handleChange);
    handleChange();
    return unsubscribe;
}
