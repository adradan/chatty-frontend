import ContentBackdrop from 'src/components/Elements/ContentBackdrop';
import { useState } from 'react';
import TextInput from '@/components/Elements/TextInput';
import Button from '@/components/Elements/Button';
import clsx from 'clsx';
import { useSocket } from '@/lib/socketService.ts';
import { useAppDispatch, useAppSelector } from '@/hooks/store.ts';
import { ChatStates } from '@/types/chat.ts';
import { erroring } from '@/lib/store/error.ts';
import { Dialog } from '@headlessui/react';
import { keys } from '@/lib/store/keys.ts';
import { recipientAction } from '@/lib/store/user.ts';
import { chatStateActions } from '@/lib/store/chatState.ts';
import { ChatBox } from '@/features/chat/components/ChatBox.tsx';

export const Chat = () => {
    const [recipient, setRecipient] = useState('');

    const socketService = useSocket();
    const dispatch = useAppDispatch();
    const error = useAppSelector((state) => state.error);
    const userInfo = useAppSelector((state) => state.user);
    const chatState = useAppSelector((state) => state.chatState);
    const recipientKeys = useAppSelector((state) => state.keys.dmKey);

    const invitedModalOpen =
        chatState === ChatStates.Invited && !!recipientKeys;

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
        // dispatch(chatStateActions.)
        socketService.invite(recipient);
    };

    const rejectInvite = () => {
        dispatch(keys());
        dispatch(recipientAction(''));
        dispatch(chatStateActions.rejectingInvite());
    };

    const acceptInvite = () => {
        socketService.acceptInvite();
    };

    return (
        <div className="flex h-full flex-col">
            <h1 className="text-4xl font-bold">Chat</h1>
            <h3 className="text-2xl font-bold">
                Your User ID: {userInfo.userId}
            </h3>
            <div className="mt-8 flex grow justify-center">
                <ContentBackdrop className="flex h-full w-full p-8">
                    {[
                        ChatStates.Waiting,
                        ChatStates.Inviting,
                        ChatStates.WaitingForAck,
                        ChatStates.Invited,
                    ].includes(chatState) && (
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
                                size="sm"
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
                    {chatState === ChatStates.Chatting && <ChatBox />}
                    <Dialog
                        open={invitedModalOpen}
                        onClose={rejectInvite}
                        className="relative z-50"
                    >
                        <div
                            className="fixed inset-0 bg-gray-700/40"
                            aria-hidden={true}
                        ></div>
                        <div className="fixed inset-0 flex items-center justify-center">
                            <Dialog.Panel as={ContentBackdrop} className="p-4">
                                <Dialog.Title className="text-2xl font-bold">
                                    New DM Invite
                                </Dialog.Title>
                                <Dialog.Description>
                                    From User ID: {userInfo.recipient}
                                </Dialog.Description>
                                <div className="flex justify-between pt-5">
                                    <Button
                                        size="sm"
                                        variant="reject"
                                        onClick={rejectInvite}
                                    >
                                        Reject
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="accept"
                                        onClick={acceptInvite}
                                    >
                                        Accept
                                    </Button>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </Dialog>
                </ContentBackdrop>
            </div>
        </div>
    );
};
