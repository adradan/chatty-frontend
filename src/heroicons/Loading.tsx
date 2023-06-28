import clsx from 'clsx';

const variants = {
    white: 'bg-green-600',
    black: 'bg-red-600',
};

type Props = {
    loading: boolean;
    variant?: keyof typeof variants;
};

export default function Loading({ loading, variant = 'white' }: Props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className={clsx(
                loading && 'animate-spin',
                'h-4',
                'w-4',
                !loading && 'hidden'
            )}
        >
            <path
                stroke={variant}
                strokeLinecap="round"
                strokeWidth="3.556"
                d="M20 12a8 8 0 01-11.76 7.061"
            ></path>
        </svg>
    );
}
