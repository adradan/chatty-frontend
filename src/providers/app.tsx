import { useState } from 'react';
import { KeyPairContext } from '@/context/keyPair.ts';
import { BrowserRouter, Router, RouterProvider } from 'react-router-dom';
import { AppRouter } from '@/routes';
import { useKeys } from '@/hooks';

type AppProviderTypes = {
    children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderTypes) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <BrowserRouter>{children}</BrowserRouter>;
};
