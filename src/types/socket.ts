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
        recipient: number;
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
} as const;

export type ServerMessageCommands =
    (typeof ServerMessageCommands)[keyof typeof ServerMessageCommands];

export type ServerMessage = {
    sender: number;
    message: string;
    command: ServerMessageCommands;
};

export type Command =
    | JoinCommand
    | MessageCommand
    | SynCommand
    | SynAckCommand
    | AckCommand;
