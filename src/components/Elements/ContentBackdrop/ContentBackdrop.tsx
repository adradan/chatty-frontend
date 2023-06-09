import * as React from 'react';
import clsx from 'clsx';

type BackdropProps = React.HTMLAttributes<HTMLDivElement> & {
    className?: string;
};

const ContentBackdrop = ({ className = '', ...props }: BackdropProps) => {
    return (
        <div
            className={clsx('rounded-md bg-gray-600 drop-shadow-md', className)}
            {...props}
        >
            {props.children}
        </div>
    );
};

export default ContentBackdrop;
