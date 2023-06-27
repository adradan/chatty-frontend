// type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {};
import * as React from 'react';
import clsx from 'clsx';

const sizes = {
    sm: 'py-1 px-2 text-sm',
    md: 'py-2 px-4 text-md',
    lg: 'py-4 px-6 text-lg',
};

const variants = {
    accept: 'bg-green-600',
    reject: 'bg-red-600',
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    size?: keyof typeof sizes;
    icon?: JSX.Element;
    variant?: keyof typeof variants;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { className = '', size = 'md', icon, variant, ...props }: ButtonProps,
        ref
    ) => {
        return (
            <button
                ref={ref}
                type="button"
                className={clsx(
                    'flex items-center justify-center gap-1 rounded-md border-2 border-solid border-transparent hover:bg-gray-700 disabled:opacity-60',
                    sizes[size],
                    className,
                    variant && variants[variant],
                    !variant && 'bg-gray-900'
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
