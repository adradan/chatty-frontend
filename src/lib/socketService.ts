import { createContext, useContext } from 'react';
import {
    AckCommand,
    AckMessage,
    ChatMessage,
    MessageCommand,
    ResetIDCommand,
    ServerMessage,
    ServerMessageCommands,
    SynAckCommand,
    SynAckMessage,
    SynCommand,
    SynMessage,
} from '@/types/socket.ts';
import {
    observeStore,
    RootAction,
    RootState,
    selectFn,
    store,
} from '@/lib/store/store.ts';
import { ChatStates } from '@/types/chat.ts';
import { chatStateActions } from '@/lib/store/chatState.ts';
import { recipientAction, userAction } from '@/lib/store/user.ts';
import { erroring } from '@/lib/store/error.ts';
import { keys } from '@/lib/store/keys.ts';
import { messaging } from '@/lib/store/messages.ts';
import { decryptMessage, encryptMessage, importKey } from '@/lib/encryption.ts';

const selectState: selectFn<ChatStates> = (state: RootState) => {
    return state.chatState;
};

const THIRTY_SEC = 30000;

class SocketService {
    private _socket?: WebSocket;
    private _userId = '';
    private _publicKey?: CryptoKey;
    private _recipientKey?: CryptoKey;
    private _recipientWebKey?: JsonWebKey;
    private _chatBuddy?: string;
    private _privateKey?: CryptoKey;
    private _exportedPublic?: JsonWebKey;
    private chatState: ChatStates = store.getState().chatState;

    constructor() {
        observeStore(store, selectState, (state) => {
            this.chatState = state;
        });
    }

    handleSyn = (serverMessage: ServerMessage) => {
        const message = serverMessage.message as SynMessage;
        const publicKey = JSON.parse(message.inviterKey) as JsonWebKey;
        importKey(publicKey).then((k) => {
            this._recipientKey = k;
        });
        console.log(publicKey);

        this._recipientWebKey = publicKey;
        this._chatBuddy = serverMessage.sender;
        store.dispatch(recipientAction(this._chatBuddy));
        store.dispatch(keys(publicKey));
        store.dispatch(chatStateActions.receivingInvite());

        setTimeout(() => {
            if (this.chatState === ChatStates.Invited) {
                this.rejectInvite();
            }
        }, THIRTY_SEC);
    };

    handleSynAck = (serverMessage: ServerMessage) => {
        const message = serverMessage.message as SynAckMessage;
        console.log(serverMessage);
        if (message.inviterKey !== JSON.stringify(this._exportedPublic)) {
            this.handleError(
                'Recipient sent a bad response. Aborting...',
                chatStateActions.disconnecting()
            );
            return;
        }
        const publicKey = JSON.parse(message.recipientKey) as JsonWebKey;
        importKey(publicKey).then((k) => {
            this._recipientKey = k;
        });
        this._recipientWebKey = publicKey;
        store.dispatch(keys(publicKey));
        store.dispatch(chatStateActions.receivingSynAck());
        store.dispatch(recipientAction(serverMessage.sender));
        this.sendAck(serverMessage);
    };

    handleAck = (serverMessage: ServerMessage) => {
        console.log('ack');
        const message = serverMessage.message as AckMessage;
        console.log(
            message.recipientKey === JSON.stringify(this._exportedPublic),
            message.recipientKey,
            JSON.stringify(this._exportedPublic)
        );
        store.dispatch(chatStateActions.receivingAck());
    };

    reset = () => {
        this._recipientKey = undefined;
        this._recipientWebKey = undefined;
        this._chatBuddy = undefined;
        store.dispatch(recipientAction(''));
        store.dispatch(messaging('messages/clear'));
        store.dispatch(keys());
    };

    rejectInvite = () => {
        store.dispatch(keys());
        store.dispatch(recipientAction(''));
        store.dispatch(chatStateActions.rejectingInvite());
    };

    connect = (
        publicKey: CryptoKey,
        privateKey: CryptoKey,
        exportedPublic: JsonWebKey
    ): Promise<boolean> => {
        return new Promise((resolve) => {
            this._socket = new WebSocket(
                `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${
                    import.meta.env.VITE_BACKEND_URL
                }/ws/`
            );
            this._socket.onmessage = (event: MessageEvent) => {
                const { data } = event;
                const serverMessage = JSON.parse(data) as ServerMessage;
                console.log(serverMessage);
                switch (serverMessage.command) {
                    case ServerMessageCommands.MessageSent:
                        break;
                    case ServerMessageCommands.StartedSession:
                        this._userId = serverMessage.sender;
                        store.dispatch(userAction(this._userId));
                        break;
                    case ServerMessageCommands.NoRecipient:
                        this.handleNoRecipient();
                        break;
                    case 'Unknown':
                        break;
                    case ServerMessageCommands.ChatMessage:
                        this.handleMessage(serverMessage);
                        break;
                    case 'ResetID':
                        this.handleResetID(serverMessage);
                        break;
                    case ServerMessageCommands.Ack:
                        this.handleAck(serverMessage);
                        break;
                    case ServerMessageCommands.Syn:
                        this.handleSyn(serverMessage);
                        break;
                    case ServerMessageCommands.Success:
                        break;
                    case ServerMessageCommands.SynAck:
                        this.handleSynAck(serverMessage);
                        break;
                    default:
                        break;
                }
            };
            this._socket.onerror = () => {
                resolve(false);
            };
            this._socket.onopen = () => {
                console.log('open', 'mykey: ', exportedPublic);
                this._publicKey = publicKey;
                this._privateKey = privateKey;
                this._exportedPublic = exportedPublic;
                resolve(true);
            };
        });
    };

    handleResetID = (serverMessage: ServerMessage) => {
        this._userId = serverMessage.sender;
        store.dispatch(userAction(this._userId));
    };

    resetId = () => {
        const body: ResetIDCommand = {
            ResetId: {
                id: this._userId,
            },
        };
        this._socket?.send(JSON.stringify(body));
    };

    close = () => {
        if (!this._socket) return;
        this._socket.close(1000, 'Client leaving.');
        this.reset();
    };

    invite = (recipient: string) => {
        if (!this._publicKey || !this._socket) return false;
        const body: SynCommand = {
            Syn: {
                inviterKey: JSON.stringify(this._exportedPublic),
                recipient: recipient,
            },
        };
        this._socket.send(JSON.stringify(body));
        store.dispatch(chatStateActions.inviting());
        setTimeout(() => {
            if (this.chatState === ChatStates.Inviting) {
                this.handleError(
                    "Recipient didn't respond.",
                    chatStateActions.noSynAck()
                );
            }
        }, THIRTY_SEC);
    };

    acceptInvite = () => {
        console.log('accepting.');
        store.dispatch(chatStateActions.sendingSynAck());
        this.sendSynAck();
        setTimeout(() => {
            if (this.chatState === ChatStates.WaitingForAck) {
                this.handleError(
                    "Recipient didn't respond/Not found.",
                    chatStateActions.noAck()
                );
            }
        }, THIRTY_SEC);
    };

    handleError = (errMessage: string, dispatchAction: RootAction) => {
        store.dispatch(erroring('error/set', errMessage));
        const FIVE_SECONDS = 5000;
        setTimeout(() => {
            this.reset();
            store.dispatch(erroring('error/clear'));
            store.dispatch(dispatchAction);
            this.resetId();
        }, FIVE_SECONDS);
    };

    handleNoRecipient = () => {
        this.handleError(
            'Recipient Disconnected/Not found. Disconnecting...',
            chatStateActions.noRecipient()
        );
    };

    handleMessage = async (serverMessage: ServerMessage) => {
        if (!this._privateKey) {
            this.handleError(
                'Private Key not found. Signing out...',
                chatStateActions.disconnecting()
            );
            return;
        }
        const message = serverMessage.message as ChatMessage;
        const decrypted = await decryptMessage(
            message.message,
            this._privateKey
        );
        if (typeof decrypted === 'boolean') {
            return;
        }
        store.dispatch(
            messaging('messages/add', {
                sender: serverMessage.sender,
                timestamp: message.timestamp,
                message: decrypted,
            })
        );
    };

    sendMessage = async (message: string) => {
        if (!this._recipientKey) {
            this.handleError(
                'Recipient Public Key not found. Disconnecting...',
                chatStateActions.disconnecting()
            );
            return;
        }
        const encryptedMessage = await encryptMessage(
            message,
            this._recipientKey
        );
        const body: MessageCommand = {
            Message: {
                message: encryptedMessage,
            },
        };
        this._socket?.send(JSON.stringify(body));
    };

    sendAck = (serverMessage: ServerMessage) => {
        const { sender } = serverMessage;
        const body: AckCommand = {
            Ack: {
                recipient: sender,
                recipientKey: JSON.stringify(this._recipientWebKey),
            },
        };
        this._socket?.send(JSON.stringify(body));
    };

    sendSynAck = () => {
        if (!this._chatBuddy || !this._recipientKey) return;
        const body: SynAckCommand = {
            SynAck: {
                recipient: this._chatBuddy,
                recipientKey: JSON.stringify(this._exportedPublic),
                inviterKey: JSON.stringify(this._recipientWebKey),
            },
        };
        console.log(body);
        this._socket?.send(JSON.stringify(body));
        console.log('todo!');
    };

    get socket(): WebSocket | undefined {
        return this._socket;
    }

    get userId(): string {
        return this._userId;
    }
}

export const socketService = new SocketService();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const SocketContext = createContext<SocketService>(socketService);

export const useSocket = () => {
    return useContext(SocketContext);
};
