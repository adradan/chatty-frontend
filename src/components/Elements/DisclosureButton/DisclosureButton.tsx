// type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {};
import * as React from 'react';
import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import ChevronDown from '@/heroicons/ChevronDown.tsx';
import ChevronUp from '@/heroicons/ChevronUp.tsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    open: boolean;
};

const DisclosureButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', open, ...props }: ButtonProps, ref) => {
        return (
            <Disclosure.Button
                ref={ref}
                className={clsx(
                    'text-left',
                    'bg-gray-300/20',
                    'p-2',
                    'rounded-md',
                    'flex',
                    'justify-between',
                    'w-full',
                    className
                )}
                {...props}
            >
                <div>{props.children}</div>
                {open && <ChevronDown />}
                {!open && <ChevronUp />}
            </Disclosure.Button>
        );
    }
);

export default DisclosureButton;
