import * as React from 'react';
import clsx from 'clsx';

type BackdropProps = React.HTMLAttributes<HTMLDivElement> & {
    className?: string;
};

const ContentBackdrop = React.forwardRef<HTMLDivElement, BackdropProps>(
    ({ className = '', ...props }: BackdropProps, ref) => {
        return (
            <div
                ref={ref}
                className={clsx(
                    'rounded-md bg-gray-600 drop-shadow-md',
                    className
                )}
                {...props}
            >
                {props.children}
            </div>
        );
    }
);

export default ContentBackdrop;
