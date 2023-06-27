import { createContext, useContext } from 'react';
import {
    ServerMessage,
    ServerMessageCommands,
    SynCommand,
} from '@/types/socket.ts';
import { observeStore, RootState, selectFn, store } from '@/lib/store/store.ts';

const selectKeys: selectFn<CryptoKey | undefined> = (state: RootState) => {
    return state.keys.publicKey;
};

class SocketService {
    private _socket: WebSocket | undefined;
    private _userId = '';
    private publicKey: JsonWebKey | undefined;

    constructor() {
        observeStore(store, selectKeys, (keys) => {
            console.log(keys);
        });
    }

    handleSyn = (serverMessage: ServerMessage) => {
        const { sender } = serverMessage;
        console.log(serverMessage);
    };

    connect = (publicKey: JsonWebKey): Promise<boolean> => {
        return new Promise((resolve) => {
            this._socket = new WebSocket('ws://localhost:3000/ws/');
            this._socket.onmessage = (event: MessageEvent) => {
                const { data } = event;
                const serverMessage = JSON.parse(data) as ServerMessage;
                switch (serverMessage.command) {
                    case ServerMessageCommands.MessageSent:
                        break;
                    case ServerMessageCommands.StartedSession:
                        this._userId = serverMessage.sender;
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
                        break;
                    default:
                        break;
                }
            };
            this._socket.onerror = () => {
                resolve(false);
            };
            this._socket.onopen = () => {
                this.publicKey = publicKey;
                resolve(true);
            };
        });
    };

    close = () => {
        if (!this._socket) return;
        this._socket.close(1000, 'Client leaving.');
    };

    invite = (recipient: string) => {
        if (!this.publicKey || !this._socket) return false;
        const body: SynCommand = {
            Syn: {
                inviterKey: JSON.stringify(this.publicKey),
                recipient: BigInt(recipient).toString(),
            },
        };
        this._socket.send(JSON.stringify(body));
        this._lastSentCommand = ServerMessageCommands.Syn;
    };

    get socket(): WebSocket | undefined {
        return this._socket;
    }

    get userId(): string {
        return this._userId;
    }

    get lastSentCommand(): ServerMessageCommands | undefined {
        return this._lastSentCommand;
    }
}

export const socketService = new SocketService();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const SocketContext = createContext<SocketService>(socketService);

export const useSocket = () => {
    return useContext(SocketContext);
};
