export type JoinCommand = {
    Join: {
        recipient: string;
    };
};

export type MessageCommand = {
    Message: {
        message: string;
    };
};

export type ResetIDCommand = {
    ResetId: {
        id: string;
    };
};

export type SynMessage = {
    inviterKey: string;
    recipient: string;
};

export type SynCommand = {
    Syn: SynMessage;
};

export type SynAckMessage = {
    inviterKey: string;
    recipientKey: string;
    recipient: string;
};

export type SynAckCommand = {
    SynAck: SynAckMessage;
};

export type AckMessage = {
    recipientKey: string;
    recipient: string;
};

export type AckCommand = {
    Ack: AckMessage;
};

export type ChatMessage = {
    message: string;
    timestamp: number;
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
    ResetID: 'ResetID',
} as const;

export type ServerMessageCommands =
    (typeof ServerMessageCommands)[keyof typeof ServerMessageCommands];

export function isServerMessageCommand(x: string): x is ServerMessageCommands {
    return Object.keys(ServerMessageCommands).includes(x);
}

export type ServerMessage = {
    sender: string;
    message: string | SynMessage | SynAckMessage | AckMessage | ChatMessage;
    command: ServerMessageCommands;
};

export type Command =
    | JoinCommand
    | MessageCommand
    | SynCommand
    | SynAckCommand
    | AckCommand;
