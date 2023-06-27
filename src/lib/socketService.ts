import { createContext, useContext } from 'react';
import {
    AckCommand,
    ServerMessage,
    ServerMessageCommands,
    SynAckMessage,
    SynCommand,
} from '@/types/socket.ts';
import { observeStore, RootState, selectFn, store } from '@/lib/store/store.ts';
import { ChatStates } from '@/types/chat.ts';
import { chatStateActions } from '@/lib/store/chatState.ts';
import { user } from '@/lib/store/user.ts';
import { erroring } from '@/lib/store/error.ts';

const selectState: selectFn<ChatStates> = (state: RootState) => {
    return state.chatState;
};

class SocketService {
    private _socket?: WebSocket;
    private _userId = '';
    private _publicKey?: CryptoKey;
    private _recipientKey?: JsonWebKey;
    private _privateKey?: CryptoKey;
    private _exportedPublic?: JsonWebKey;
    private chatState: ChatStates = store.getState().chatState;

    constructor() {
        observeStore(store, selectState, (state) => {
            this.chatState = state;
        });
    }

    handleSyn = (serverMessage: ServerMessage) => {
        const { sender } = serverMessage;
        console.log(serverMessage, this.chatState);
        this.sendSynAck();
    };

    handleSynAck = (serverMessage: ServerMessage) => {
        store.dispatch(chatStateActions.receivingSynAck());
        const message = serverMessage.message as SynAckMessage;
        console.log(serverMessage);
        if (message.inviterKey !== JSON.stringify(this._exportedPublic)) {
            // Display some message here
            console.log('no match.');
            return;
        }
        this._recipientKey = JSON.parse(message.recipientKey) as JsonWebKey;
        this.sendAck(serverMessage);
    };

    handleAck = (serverMessage: ServerMessage) => {
        store.dispatch(chatStateActions.receivingAck());
        console.log('todo!');
    };

    connect = (
        publicKey: CryptoKey,
        privateKey: CryptoKey,
        exportedPublic: JsonWebKey
    ): Promise<boolean> => {
        return new Promise((resolve) => {
            this._socket = new WebSocket('ws://localhost:3000/ws/');
            this._socket.onmessage = (event: MessageEvent) => {
                const { data } = event;
                const serverMessage = JSON.parse(data) as ServerMessage;
                console.log(serverMessage);
                switch (serverMessage.command) {
                    case ServerMessageCommands.MessageSent:
                        break;
                    case ServerMessageCommands.StartedSession:
                        this._userId = serverMessage.sender;
                        store.dispatch(user(this._userId));
                        break;
                    case ServerMessageCommands.NoRecipient:
                        break;
                    case ServerMessageCommands.ChatMessage:
                        break;
                    case ServerMessageCommands.Ack:
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
                this._publicKey = publicKey;
                this._privateKey = privateKey;
                this._exportedPublic = exportedPublic;
                resolve(true);
            };
        });
    };

    close = () => {
        if (!this._socket) return;
        this._socket.close(1000, 'Client leaving.');
    };

    invite = (recipient: string) => {
        if (!this._publicKey || !this._socket) return false;
        const body: SynCommand = {
            Syn: {
                inviterKey: JSON.stringify(this._exportedPublic),
                recipient: BigInt(recipient).toString(),
            },
        };
        this._socket.send(JSON.stringify(body));
        store.dispatch(chatStateActions.inviting());
        const THIRTY_SEC = 30000;
        setTimeout(() => {
            if (this.chatState === ChatStates.Inviting) {
                store.dispatch(chatStateActions.noSynAck());
                store.dispatch(
                    erroring('error/set', "Recipient didn't respond.")
                );
            }
        }, THIRTY_SEC);
    };

    sendAck = (serverMessage: ServerMessage) => {
        const { sender } = serverMessage;
        console.log(serverMessage);
        const message = serverMessage.message as SynAckMessage;
        const body: AckCommand = {
            Ack: {
                recipient: sender,
                recipientKey: message.recipientKey,
            },
        };
        this._socket?.send(JSON.stringify(body));
        console.log('todo!');
    };

    sendSynAck = () => {
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
