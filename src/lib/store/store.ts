import { combineReducers, configureStore } from '@reduxjs/toolkit';
import commandReducer, { CommandAction } from './commands.ts';
import keyReducer, { KeyAction } from '@/lib/store/keys.ts';
import messageReducer, { ChatAction } from '@/lib/store/messages.ts';
import chatStateReducer, { ChatStateAction } from '@/lib/store/chatState.ts';
import userReducer, { UserAction } from '@/lib/store/user.ts';
import errorReducer, { ErrorAction } from '@/lib/store/error.ts';

const rootReducer = combineReducers({
    lastCommands: commandReducer,
    keys: keyReducer,
    messages: messageReducer,
    chatState: chatStateReducer,
    user: userReducer,
    error: errorReducer,
});

export type RootAction =
    | CommandAction
    | KeyAction
    | ChatAction
    | ChatStateAction
    | UserAction
    | ErrorAction;

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
