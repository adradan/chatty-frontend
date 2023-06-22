import ContentBackdrop from 'src/components/Elements/ContentBackdrop';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import TextInput from '@/components/Elements/TextInput';
import Button from '@/components/Elements/Button';
import clsx from 'clsx';
import { useSocket } from '@/lib/socketService.ts';
import { sleep } from '@/lib/time.ts';
import { ServerMessageCommands } from '@/types/socket.ts';

const chatStates = {
    Ok: 'ok',
    Error: 'error',
    Loading: 'loading',
    Connected: 'connected',
    Waiting: 'waiting',
    Invited: 'invited',
} as const;

type ChatStateKey = keyof typeof chatStates;
type ChatStateCode = (typeof chatStates)[ChatStateKey];

export const Chat = () => {
    const navigate = useNavigate();
    const [recipient, setRecipient] = useState('');
    const [error, setError] = useState('');
    const [state, setState] = useState<ChatStateCode>(chatStates.Waiting);

    const socketService = useSocket();

    const onRecipientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const rec = event.target.value.trim();
        setRecipient(rec);
    };

    const invite = async () => {
        console.log(recipient, 'asdf');
        if (!recipient.length || !/^\d+$/g.test(recipient)) {
            setError('Enter a valid recipient ID.');
            return;
        }
        setError('');
        setState(chatStates.Invited);
        socketService.invite(recipient);
        await sleep();
        if (socketService.lastSentCommand == ServerMessageCommands.Syn) {
            setError("Recipient didn't respond.");
            setState(chatStates.Waiting);
            return;
        }
        // setState(chatStates.Loading);
    };

    return (
        <div className="flex h-full flex-col">
            <h1 className="text-4xl font-bold">Chat</h1>
            <h3 className="text-2xl font-bold">
                Your User ID: {socketService.userId}
            </h3>
            <div className="mt-8 flex grow justify-center">
                <ContentBackdrop className="flex h-full w-full p-8">
                    {(state == chatStates.Waiting ||
                        state == chatStates.Invited) && (
                        <form className="flex flex-col gap-2">
                            <div>
                                <TextInput
                                    label="Enter recipient ID:"
                                    id="recipient"
                                    maxLength={20}
                                    value={recipient}
                                    onChange={onRecipientChange}
                                    error={error}
                                />
                            </div>
                            <Button
                                variant="sm"
                                onClick={invite}
                                icon={
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className={clsx(
                                            state == chatStates.Invited &&
                                                'animate-spin',
                                            'h-4',
                                            'w-4',
                                            state != chatStates.Invited &&
                                                'hidden'
                                        )}
                                    >
                                        <path
                                            stroke="#000"
                                            strokeLinecap="round"
                                            strokeWidth="3.556"
                                            d="M20 12a8 8 0 01-11.76 7.061"
                                        ></path>
                                    </svg>
                                }
                            >
                                Invite
                            </Button>
                        </form>
                    )}
                </ContentBackdrop>
            </div>
        </div>
    );
};
