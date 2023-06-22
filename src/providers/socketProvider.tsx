import { SocketContext, socketService } from '@/lib/socketService.ts';

type SocketProviderTypes = {
    children: React.ReactNode;
};

export const SocketProvider = (props: SocketProviderTypes) => {
    const service = socketService;
    return (
        <SocketContext.Provider value={service}>
            {props.children}
        </SocketContext.Provider>
    );
};
