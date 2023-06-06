import { Button, Dropdown, Menu, Navbar } from 'react-daisyui';

export default function NavBar() {
    return (
        <div>
            <Navbar>
                <Navbar.Start>
                    <Dropdown>
                        <Dropdown.Toggle color="ghost" className="lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                stroke="#fff"
                                viewBox="0 0 24 24"
                                className="h-5 w-5"
                            >
                                <g strokeLinecap="round" strokeWidth="2">
                                    <path d="M4 18h16M4 12h16M4 6h16"></path>
                                </g>
                            </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="w-52 menu-compact mt-3">
                            <Dropdown.Item>Item 1</Dropdown.Item>
                            <li tabIndex={0}>
                                <a className="justify-between">
                                    Parent
                                    <svg
                                        className="fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                                    </svg>
                                </a>
                                <ul className="p-2 bg-base-100">
                                    <li>
                                        <a>Submenu 1</a>
                                    </li>
                                    <li>
                                        <a>Submenu 2</a>
                                    </li>
                                </ul>
                            </li>
                            <Dropdown.Item>Item 3</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button
                        color="ghost"
                        tabIndex={0}
                        className="normal-case text-xl"
                    >
                        Chatty
                    </Button>
                </Navbar.Start>
                <Navbar.Center className="hidden lg:flex">
                    <Menu horizontal className="p-0">
                        <Menu.Item>
                            <a>Item 1</a>
                        </Menu.Item>
                        <Menu.Item>
                            <a>
                                Parent
                                <svg
                                    className="fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={20}
                                    height={20}
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                                </svg>
                            </a>
                            <Menu className="p-2 bg-base-100">
                                <Menu.Item>
                                    <a>Submenu 1</a>
                                </Menu.Item>
                                <Menu.Item>
                                    <a>Submenu 2</a>
                                </Menu.Item>
                            </Menu>
                        </Menu.Item>
                        <Menu.Item>
                            <a>Item 3</a>
                        </Menu.Item>
                    </Menu>
                </Navbar.Center>
                <Navbar.End>
                    <Button>Get started</Button>
                </Navbar.End>
            </Navbar>
        </div>
    );
}
