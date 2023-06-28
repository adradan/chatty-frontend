import { Disclosure } from '@headlessui/react';
import Chatty from '@/components/Elements/Chatty/Chatty.tsx';
import ContentBackdrop from '@/components/Elements/ContentBackdrop';
import DisclosureButton from '@/components/Elements/DisclosureButton';
import DisclosurePanel from '@/components/Elements/DisclosurePanel';
import Button from '@/components/Elements/Button';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { KeyPairContext } from '@/context/keyPair.ts';

export const Landing = () => {
    const navigate = useNavigate();
    const { keyPair } = useContext(KeyPairContext);

    const getStarted = () => {
        if (keyPair) {
            navigate('/chat/dm');
        } else {
            navigate('/user/login');
        }
    };

    return (
        <div>
            <h1 className="mb-4 text-4xl">
                Welcome to <Chatty />.
            </h1>
            <ContentBackdrop className="flex w-1/2 w-fit flex-col p-4">
                <Disclosure as="div" className="mb-1 mt-2">
                    {({ open }) => {
                        return (
                            <>
                                <DisclosureButton open={open}>
                                    Who are we?
                                </DisclosureButton>
                                <DisclosurePanel>
                                    <Chatty /> is an end-to-end encrypted chat
                                    messenger.
                                </DisclosurePanel>
                            </>
                        );
                    }}
                </Disclosure>
                <Disclosure as="div" className="my-1">
                    {({ open }) => {
                        return (
                            <>
                                <DisclosureButton open={open}>
                                    What's End-to-End Encryption?
                                </DisclosureButton>
                                <DisclosurePanel>
                                    End-to-End encryption helps keep your
                                    messages secret from prying eyes! No one,
                                    not even <Chatty />, can read your messages;
                                    except you and your recipient :).
                                </DisclosurePanel>
                            </>
                        );
                    }}
                </Disclosure>
                <Disclosure as="div" className="my-1">
                    {({ open }) => {
                        return (
                            <>
                                <DisclosureButton open={open}>
                                    How does this End-to-End Encryption work?
                                </DisclosureButton>
                                <DisclosurePanel>
                                    To put it simply, think of the encryption as
                                    a mailbox. Anyone can put in any piece of
                                    mail into the box, but only you, the owner,
                                    can open it up and read everything! For a
                                    more detailed explanation, look below!
                                </DisclosurePanel>
                            </>
                        );
                    }}
                </Disclosure>
                <Disclosure as="div" className="my-1">
                    {({ open }) => {
                        return (
                            <>
                                <DisclosureButton open={open}>
                                    So what information can <Chatty /> see?
                                </DisclosureButton>
                                <DisclosurePanel>
                                    The only information <Chatty /> can see are:
                                    <ol className="list-inside list-decimal px-4 py-1">
                                        <li>User public keys</li>
                                        <li>The encrypted message</li>
                                        <li>Sender/Recipient IDs</li>
                                    </ol>
                                    Apart from that, <Chatty /> can't see
                                    anything nor does it store any logs with
                                    user info.
                                </DisclosurePanel>
                            </>
                        );
                    }}
                </Disclosure>
                <Disclosure as="div" className="mb-2 mt-1">
                    {({ open }) => {
                        return (
                            <>
                                <DisclosureButton open={open}>
                                    So how, really, does <Chatty />
                                    's End-to-End Encryption work?
                                </DisclosureButton>
                                <DisclosurePanel>
                                    <Chatty /> uses RSA-OAEP to achieve
                                    End-to-End encryption (For a detailed
                                    explanation on how this works, click{' '}
                                    <a
                                        href="https://security.stackexchange.com/questions/183179/what-is-rsa-oaep-rsa-pss-in-simple-terms"
                                        target="_blank"
                                        className="font-semibold"
                                    >
                                        here
                                    </a>
                                    ). When inviting and upon accepting a DM,
                                    users will exchange public keys. This public
                                    key allows a user to encrypt their message
                                    before it is sent to <Chatty />
                                    's server. Once the recipient receives the
                                    message, only their private key will be able
                                    to decrypt the message.
                                </DisclosurePanel>
                            </>
                        );
                    }}
                </Disclosure>
                <Button size="lg" className="my-4" onClick={getStarted}>
                    Get Started
                </Button>
            </ContentBackdrop>
        </div>
    );
};
