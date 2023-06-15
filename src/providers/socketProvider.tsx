import { createContext, useContext } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketService {
    getSocket(): Socket;
    connect(username: string, publicKey: JsonWebKey): void;
}

type SocketProviderTypes = {
    children: React.ReactNode;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const SocketContext = createContext<SocketService>(null);

export const SocketProvider = (props: SocketProviderTypes) => {
    let socket: Socket | undefined;

    const socketService: SocketService = {
        connect(username: string, publicKey: JsonWebKey): void {
            socket = io(`${import.meta.env.VITE_BACKEND_URL}`, {
                transports: ['websocket'],
                path: '/ws',
                upgrade: false,
            });
        },
        getSocket() {
            if (!socket) throw new Error('Socket was never created.');
            return socket;
        },
        // connect: () => {
        //     socket = io(import.meta.env.VITE_BACKEND_URL + '/ws');
        // },
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
