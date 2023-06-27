type Props = {
    myId: string;
    sender: string;
    message: string;
};

export const ChatMessage = ({ myId, sender, message }: Props) => {
    const isFromMe = sender === myId;
    return (
        <div className="h-14 w-full overflow-auto">
            <div className="text-sm font-semibold">
                {!isFromMe && sender}
                {isFromMe && 'Me'}
            </div>
            <div>{message}</div>
        </div>
    );
};
