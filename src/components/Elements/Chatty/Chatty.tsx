import React from 'react';
import clsx from 'clsx';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    className?: string;
};

const Chatty = React.forwardRef<HTMLDivElement>(
    ({ className = '', ...props }: Props, ref) => {
        return (
            <div
                ref={ref}
                className={clsx('inline-block font-semibold', className)}
                {...props}
            >
                chatty
            </div>
        );
    }
);

export default Chatty;
