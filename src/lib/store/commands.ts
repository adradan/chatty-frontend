import { ServerMessageCommands } from '@/types/socket.ts';

export interface CommandAction {
    type: 'commands/lastSendCommand' | 'commands/lastReceivedCommand';
    payload: ServerMessageCommands;
}

type State = {
    lastSentCommand: ServerMessageCommands;
    lastReceivedCommand: ServerMessageCommands;
};

const initialState: State = {
    lastSentCommand: ServerMessageCommands.Unknown,
    lastReceivedCommand: ServerMessageCommands.Unknown,
};

export default function commandReducer(
    state = initialState,
    action: CommandAction
) {
    switch (action.type) {
        case 'commands/lastSendCommand':
            return {
                ...state,
                lastSentCommand: action.payload,
            };
        case 'commands/lastReceivedCommand':
            return {
                ...state,
                lastReceivedCommand: action.payload,
            };
        default:
            return state;
    }
}
