// type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {};
import * as React from 'react';
import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLDivElement> & {
    className?: string;
};

const DisclosurePanel = React.forwardRef<HTMLDivElement, ButtonProps>(
    ({ className = '', ...props }: ButtonProps, ref) => {
        return (
            <Disclosure.Panel
                ref={ref}
                className={clsx('text-left', 'p-2', className)}
                {...props}
            >
                {props.children}
            </Disclosure.Panel>
        );
    }
);

export default DisclosurePanel;
