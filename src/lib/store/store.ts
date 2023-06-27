import { ServerMessageCommands } from '@/types/socket.ts';
import { ChatMessage, ChatStates } from '@/types/chat.ts';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import commandReducer from './commands.ts';
import keyReducer, { KeyState } from '@/lib/store/keys.ts';
import messageReducer from '@/lib/store/messages.ts';
import chatStateReducer from '@/lib/store/chatState.ts';
import userReducer from '@/lib/store/user.ts';

interface AppState {
    lastCommands: {
        lastSentCommand: ServerMessageCommands;
        lastReceivedCommand: ServerMessageCommands;
    };
    keys: KeyState;
    userId: string;
    messages: ChatMessage[];
    chatState: ChatStates;
}

const rootReducer = combineReducers({
    lastCommands: commandReducer,
    keys: keyReducer,
    messages: messageReducer,
    chatState: chatStateReducer,
    user: userReducer,
});

export const store = configureStore({
    reducer: rootReducer,
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
