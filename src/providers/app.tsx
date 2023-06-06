import { BrowserRouter } from 'react-router-dom';

type AppProviderTypes = {
    children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderTypes) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <BrowserRouter>{children}</BrowserRouter>;
};
