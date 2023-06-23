export type JoinCommand = {
    Join: {
        recipient: number;
    };
};

export type MessageCommand = {
    Message: {
        message: string;
    };
};

export type SynCommand = {
    Syn: {
        inviterKey: string;
        recipient: string;
    };
};

export type SynAckCommand = {
    SynAck: {
        inviterKey: string;
        recipientKey: string;
        recipient: number;
    };
};

export type AckCommand = {
    Ack: {
        recipientKey: string;
        recipient: number;
    };
};

export const ServerMessageCommands = {
    Syn: 'Syn',
    SynAck: 'SynAck',
    Ack: 'Ack',
    NoRecipient: 'NoRecipient',
    ChatMessage: 'ChatMessage',
    MessageSent: 'MessageSent',
    StartedSession: 'StartedSession',
    Success: 'Success',
    Unknown: 'Unknown',
} as const;

export type ServerMessageCommands =
    (typeof ServerMessageCommands)[keyof typeof ServerMessageCommands];

export function isServerMessageCommand(x: string): x is ServerMessageCommands {
    return Object.keys(ServerMessageCommands).includes(x);
}

export type ServerMessage = {
    sender: string;
    message: string;
    command: ServerMessageCommands;
};

export type Command =
    | JoinCommand
    | MessageCommand
    | SynCommand
    | SynAckCommand
    | AckCommand;
