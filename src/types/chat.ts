export interface ChatMessage {
    sender: string;
    message: string;
    timestamp: number;
}

export enum ChatStates {
    Uninitialized = 'Uninitialized',
    Waiting = 'Waiting',
    Inviting = 'Inviting',
    Invited = 'Invited',
    WaitingForAck = 'WaitingForAck',
    Chatting = 'Chatting',
}

export enum ChatStateActions {
    Initializing = 'Initializing',

    InvitingUser = 'InvitingUser',
    ReceivingInvite = 'ReceivingInvite',

    // BEGIN Receiving Invite
    RejectingInvite = 'RejectingInvite',
    SendingSynAck = 'SendingSynAck',

    ReceivingAck = 'ReceivingAck',
    NoAck = 'NoAck',
    // END Receiving Invite

    // BEGIN Inviting User
    ReceivingSynAck = 'ReceivingSynAck',
    NoSynAck = 'NoSynAck',
    // END Inviting User

    // BEGIN Chat
    NoRecipient = 'NoRecipient',
    Disconnecting = 'Disconnecting',
    // END Chat
}
