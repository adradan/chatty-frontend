import { createContext, useContext } from 'react';
import { Socket } from 'socket.io-client';
import { ServerMessage, ServerMessageCommands } from '@/types/socket.ts';

interface SocketService {
    socket: WebSocket | undefined;
    userId: number;
    getSocket(): Socket | WebSocket;
    connect(username: string, publicKey: JsonWebKey): void;
}

type SocketProviderTypes = {
    children: React.ReactNode;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const SocketContext = createContext<SocketService>(null);

const startedSession = (id: number) => {};

const handleMessage = (event: MessageEvent) => {
    const { data } = event;
    const serverMessage = JSON.parse(data) as ServerMessage;
    switch (serverMessage.command) {
        case ServerMessageCommands.MessageSent:
            break;
        case ServerMessageCommands.StartedSession:
            break;
        case ServerMessageCommands.NoRecipient:
            break;
        case ServerMessageCommands.ChatMessage:
            break;
        case ServerMessageCommands.Ack:
            break;
        case ServerMessageCommands.Syn:
            break;
        case ServerMessageCommands.Success:
            break;
        case ServerMessageCommands.SynAck:
            break;
        default:
            break;
    }
};

export const SocketProvider = (props: SocketProviderTypes) => {
    const socketService: SocketService = {
        socket: undefined,
        userId: 0,
        connect(username: string, publicKey: JsonWebKey): void {
            this.socket = new WebSocket('ws://localhost:3000/ws/');
            this.socket.onmessage = (event: MessageEvent) => {
                const { data } = event;
                const serverMessage = JSON.parse(data) as ServerMessage;
                switch (serverMessage.command) {
                    case ServerMessageCommands.MessageSent:
                        break;
                    case ServerMessageCommands.StartedSession:
                        this.userId = serverMessage.sender;
                        break;
                    case ServerMessageCommands.NoRecipient:
                        break;
                    case ServerMessageCommands.ChatMessage:
                        break;
                    case ServerMessageCommands.Ack:
                        break;
                    case ServerMessageCommands.Syn:
                        break;
                    case ServerMessageCommands.Success:
                        break;
                    case ServerMessageCommands.SynAck:
                        break;
                    default:
                        break;
                }
            };
        },
        getSocket() {
            if (!socket) throw new Error('Socket was never created.');
            return socket;
        },
    };
    return (
        <SocketContext.Provider value={socketService}>
            {props.children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    return useContext(SocketContext);
};
