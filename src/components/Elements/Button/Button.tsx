// type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {};
import * as React from 'react';
import clsx from 'clsx';

const sizes = {
    sm: 'py-1 px-2 text-sm',
    md: 'py-2 px-4 text-md',
    lg: 'py-4 px-6 text-lg',
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    variant?: keyof typeof sizes;
    icon?: JSX.Element;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'md', icon, ...props }: ButtonProps, ref) => {
        return (
            <button
                ref={ref}
                type="button"
                className={clsx(
                    'flex items-center justify-center gap-1 rounded-md border-2 border-solid border-transparent bg-gray-900 hover:bg-gray-700 disabled:opacity-60',
                    sizes[variant],
                    className
                )}
                {...props}
            >
                {icon}
                {props.children}
            </button>
        );
    }
);

export default Button;
