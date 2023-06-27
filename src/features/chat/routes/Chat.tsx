import ContentBackdrop from 'src/components/Elements/ContentBackdrop';
import { useState } from 'react';
import TextInput from '@/components/Elements/TextInput';
import Button from '@/components/Elements/Button';
import clsx from 'clsx';
import { useSocket } from '@/lib/socketService.ts';
import { useAppDispatch, useAppSelector } from '@/hooks/store.ts';
import { ChatStates } from '@/types/chat.ts';
import { erroring } from '@/lib/store/error.ts';

export const Chat = () => {
    const [recipient, setRecipient] = useState('');

    const socketService = useSocket();
    const dispatch = useAppDispatch();
    const error = useAppSelector((state) => state.error);
    const userId = useAppSelector((state) => state.user);
    const chatState = useAppSelector((state) => state.chatState);

    const onRecipientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const rec = event.target.value.trim();
        setRecipient(rec);
    };

    const invite = async () => {
        if (!recipient.length || !/^\d+$/g.test(recipient)) {
            dispatch(erroring('error/set', 'Enter a valid recipient ID.'));
            return;
        }
        dispatch(erroring('error/clear'));

        socketService.invite(recipient);
    };

    return (
        <div className="flex h-full flex-col">
            <h1 className="text-4xl font-bold">Chat</h1>
            <h3 className="text-2xl font-bold">Your User ID: {userId}</h3>
            <div className="mt-8 flex grow justify-center">
                <ContentBackdrop className="flex h-full w-full p-8">
                    {(chatState == ChatStates.Waiting ||
                        chatState == ChatStates.Inviting) && (
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
                                            chatState === ChatStates.Inviting &&
                                                'animate-spin',
                                            'h-4',
                                            'w-4',
                                            chatState !== ChatStates.Inviting &&
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
