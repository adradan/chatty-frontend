import { Link, useNavigate } from 'react-router-dom';
import Button from '@/components/Elements/Button';
import BurgerMenu from '@/heroicons/BurgerMenu.tsx';
import { Menu, Transition } from '@headlessui/react';
import { useContext, useEffect } from 'react';
import { KeyPairContext } from '@/context/keyPair.ts';

export default function NavBar() {
    const navigate = useNavigate();
    const { keyPair } = useContext(KeyPairContext);
    useEffect(() => {
        console.log(keyPair);
    }, [keyPair]);
    const goHome = () => {
        navigate('/');
    };

    return (
        <div className="flex w-full items-center justify-between gap-2 p-4">
            <div>
                <Menu as="div" className="relative text-left">
                    <Menu.Button as={Button}>
                        <BurgerMenu />
                    </Menu.Button>
                    <Transition enter="transition duration-100">
                        <Menu.Items className="absolute z-50 mt-2 w-32 divide-y divide-solid divide-gray-600 rounded-md bg-gray-700">
                            <Menu.Item>
                                <Link
                                    to="/"
                                    className="inline-block w-full px-3 py-2"
                                >
                                    Home
                                </Link>
                            </Menu.Item>
                            {!keyPair && (
                                <Menu.Item>
                                    <Link
                                        to="/user/login"
                                        className="inline-block w-full px-3 py-2"
                                    >
                                        Login
                                    </Link>
                                </Menu.Item>
                            )}
                            {keyPair && (
                                <>
                                    <Menu.Item>
                                        <Link
                                            to="/chat/dm"
                                            className="inline-block w-full px-3 py-2"
                                        >
                                            DMs
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Link
                                            to="/user/settings"
                                            className="inline-block w-full px-3 py-2"
                                        >
                                            Settings
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Link
                                            to="/user/logout"
                                            className="inline-block w-full px-3 py-2"
                                        >
                                            Logout
                                        </Link>
                                    </Menu.Item>
                                </>
                            )}
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
            <div className="cursor-pointer text-2xl font-bold" onClick={goHome}>
                chatty
            </div>
            <div className="hidden md:flex">Notifications</div>
        </div>
    );
}
