// type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {};
import * as React from 'react';
import clsx from 'clsx';

const sizes = {
    sm: 'py-1 px-2 text-sm',
    md: 'py-2 px-4 text-md',
    lg: 'py-4 px-6 text-lg',
};

type TextInputProps = React.HTMLAttributes<HTMLInputElement> & {
    className?: string;
    label?: string;
    id: string;
    variant?: keyof typeof sizes;
    inline?: boolean;
    maxLength?: number;
    value: string;
    onChange: (a: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    disabled?: boolean;
};

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
    (
        {
            className = '',
            variant = 'md',
            label,
            id,
            inline = false,
            maxLength = 2048,
            onChange,
            value,
            error,
            disabled,
            ...props
        }: TextInputProps,
        ref
    ) => {
        return (
            <div className={clsx(!inline && 'flex flex-col gap-1')}>
                {label && <label htmlFor={id}>{label}</label>}
                {error && <div className="text-rose-600">{error}</div>}
                <input
                    id={id}
                    ref={ref}
                    className={clsx('', sizes[variant], className)}
                    type="text"
                    maxLength={maxLength}
                    onChange={onChange}
                    value={value}
                    disabled={disabled}
                    {...props}
                />
            </div>
        );
    }
);

export default TextInput;
