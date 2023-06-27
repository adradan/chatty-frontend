import { useAppSelector } from '@/hooks/store.ts';
import TextareaAutosize from 'react-textarea-autosize';
import Button from '@/components/Elements/Button';
import { ChatMessage } from '@/features/chat/components/ChatMessage.tsx';

export const ChatBox = () => {
    const messages = [
        {
            sender: '16005720529792198519',
            message: 'Hello, World!',
        },
        {
            sender: '16005720529792198510',
            message: 'Hello, World!',
        },
        {
            sender: '16005720529792198519',
            message: 'Hello, World!',
        },
        {
            sender: '16005720529792198510',
            message: 'Hello, World!',
        },
        {
            sender: '16005720529792198519',
            message: 'Hello, World!',
        },
        {
            sender: '16005720529792198510',
            message: 'Hello, World!',
        },
        {
            sender: '16005720529792198510',
            message: 'Hello, World!',
        },
        {
            sender: '16005720529792198510',
            message: 'Hello, World!',
        },
        {
            sender: '16005720529792198510',
            message: 'Hello, World!',
        },
        {
            sender: '16005720529792198510',
            message: 'Hello, World!',
        },
        {
            sender: '16005720529792198510',
            message: 'Hello, World!',
        },
        {
            sender: '16005720529792198510',
            message: 'Hello, World!',
        },
        {
            sender: '16005720529792198510',
            message: 'Hello, World!',
        },
        {
            sender: '16005720529792198510',
            message: 'Hello, World!',
        },
        {
            sender: '16005720529792198510',
            message: 'Hello, World!',
        },
        {
            sender: '16005720529792198510',
            message: 'Hello, World!',
        },
        {
            sender: '16005720529792198510',
            message: 'Hello, World!',
        },
        {
            sender: '16005720529792198510',
            message: 'Hello, World!',
        },
    ];
    // const messages = useAppSelector((state) => state.messages);
    const recipient = useAppSelector((state) => state.user.recipient);
    const myId = useAppSelector((state) => state.user.userId);

    return (
        <div className="h-full w-full">
            <h4 className="font-semibold">Chatting with: {recipient}</h4>
            <div className="flex h-full w-full flex-col justify-between gap-3 py-4">
                <div
                    className="min-h-0 min-w-0 overflow-auto rounded-sm bg-gray-800 p-4"
                    style={{ flex: '1 1 1px' }}
                >
                    {messages.map((message) => {
                        return (
                            <ChatMessage
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
                        maxLength={1000}
                    />
                    <div className="flex justify-end">
                        <Button variant="accept">Send</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
