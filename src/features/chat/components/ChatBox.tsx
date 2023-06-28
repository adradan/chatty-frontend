import { useAppDispatch, useAppSelector } from '@/hooks/store.ts';
import TextareaAutosize from 'react-textarea-autosize';
import Button from '@/components/Elements/Button';
import { ChatMessage } from '@/features/chat/components/ChatMessage.tsx';
import { useState } from 'react';
import { useSocket } from '@/lib/socketService.ts';
import { messaging } from '@/lib/store/messages.ts';
import { chatStateActions } from '@/lib/store/chatState.ts';

export const ChatBox = () => {
    // const messages = [
    //     {
    //         sender: '16005720529792198519',
    //         message: 'Hello, World!',
    //     },
    // ];
    const MAX_LENGTH = 100;
    const [newMessage, setNewMessage] = useState('');
    const messages = useAppSelector((state) => state.messages);
    const recipient = useAppSelector((state) => state.user.recipient);
    const myId = useAppSelector((state) => state.user.userId);
    const error = useAppSelector((state) => state.error);
    const socketService = useSocket();
    const dispatch = useAppDispatch();

    const sendMessage = () => {
        if (newMessage.length > MAX_LENGTH || newMessage.length === 0) {
            return;
        }
        socketService.sendMessage(newMessage);
        dispatch(
            messaging('messages/add', {
                sender: myId,
                message: newMessage,
                timestamp: Date.now(),
            })
        );
        setNewMessage('');
    };

    const disconnect = () => {
        socketService.resetId();
        dispatch(chatStateActions.disconnecting());
    };

    return (
        <div className="h-full w-full">
            <div className="flex h-full w-full flex-col justify-between gap-3 py-4">
                <div>
                    <h4 className="pb-2 font-semibold">
                        Chatting with: {recipient}
                    </h4>
                    <Button size="sm" variant="reject" onClick={disconnect}>
                        Disconnect
                    </Button>
                </div>
                <div
                    className="min-h-0 min-w-0 overflow-auto rounded-sm bg-gray-800 p-4"
                    style={{ flex: '1 1 1px' }}
                >
                    {messages.map((message, idx) => {
                        return (
                            <ChatMessage
                                key={idx}
                                myId={myId}
                                sender={message.sender}
                                message={message.message}
                            />
                        );
                    })}
                </div>
                <div>
                    <TextareaAutosize
                        className="w-full resize-none rounded-sm p-2"
                        minRows={1}
                        maxRows={3}
                        maxLength={MAX_LENGTH}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <div className="flex justify-between">
                        <div>{error}</div>
                        <Button variant="accept" onClick={sendMessage}>
                            Send
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
