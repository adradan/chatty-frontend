import { ChatStateActions, ChatStates } from '@/types/chat.ts';

export interface ChatStateAction {
    type: ChatStateActions | 'state/reset';
}

const initializing = (): ChatStateAction => ({
    type: ChatStateActions.Initializing,
});

const inviting = (): ChatStateAction => ({
    type: ChatStateActions.InvitingUser,
});

const receivingInvite = (): ChatStateAction => ({
    type: ChatStateActions.ReceivingInvite,
});

const rejectingInvite = (): ChatStateAction => ({
    type: ChatStateActions.RejectingInvite,
});

const sendingSynAck = (): ChatStateAction => ({
    type: ChatStateActions.SendingSynAck,
});

const receivingAck = (): ChatStateAction => ({
    type: ChatStateActions.ReceivingAck,
});

const noAck = (): ChatStateAction => ({
    type: ChatStateActions.NoAck,
});

const receivingSynAck = (): ChatStateAction => ({
    type: ChatStateActions.ReceivingSynAck,
});

const noSynAck = (): ChatStateAction => ({
    type: ChatStateActions.NoSynAck,
});

const noRecipient = (): ChatStateAction => ({
    type: ChatStateActions.NoRecipient,
});

const disconnecting = (): ChatStateAction => ({
    type: ChatStateActions.Disconnecting,
});

const resetting = (): ChatStateAction => ({ type: 'state/reset' });

export const chatStateActions = {
    initializing,
    inviting,
    receivingInvite,
    rejectingInvite,
    sendingSynAck,
    receivingAck,
    noAck,
    receivingSynAck,
    noSynAck,
    noRecipient,
    disconnecting,
    resetting,
};

const initialState = ChatStates.Uninitialized;

export default function chatStateReducer(
    state = initialState,
    action: ChatStateAction
) {
    if (
        action.type === ChatStateActions.Initializing &&
        state === ChatStates.Uninitialized
    ) {
        return ChatStates.Waiting;
    } else if (
        action.type === ChatStateActions.InvitingUser &&
        state === ChatStates.Waiting
    ) {
        return ChatStates.Inviting;
    } else if (
        action.type === ChatStateActions.ReceivingInvite &&
        state === ChatStates.Waiting
    ) {
        return ChatStates.Invited;
    } else if (
        action.type === ChatStateActions.RejectingInvite &&
        state === ChatStates.Invited
    ) {
        return ChatStates.Waiting;
    } else if (
        action.type === ChatStateActions.SendingSynAck &&
        state === ChatStates.Invited
    ) {
        return ChatStates.WaitingForAck;
    } else if (
        action.type === ChatStateActions.ReceivingAck &&
        state === ChatStates.WaitingForAck
    ) {
        return ChatStates.Chatting;
    } else if (
        action.type === ChatStateActions.NoAck &&
        ChatStates.WaitingForAck
    ) {
        return ChatStates.Waiting;
    } else if (
        action.type === ChatStateActions.ReceivingSynAck &&
        state === ChatStates.Inviting
    ) {
        return ChatStates.Chatting;
    } else if (
        action.type === ChatStateActions.NoSynAck &&
        state === ChatStates.Inviting
    ) {
        return ChatStates.Waiting;
    } else if (
        action.type === ChatStateActions.NoRecipient &&
        state === ChatStates.Chatting
    ) {
        return ChatStates.Waiting;
    } else if (
        action.type === ChatStateActions.Disconnecting &&
        state === ChatStates.Chatting
    ) {
        return ChatStates.Waiting;
    } else if (action.type === 'state/reset') {
        return ChatStates.Uninitialized;
    } else {
        return state;
    }
}
