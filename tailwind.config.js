/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        'node_modules/daisyui/dist/**/*.js',
        'node_modules/react-daisyui/dist/**/*.js',
    ],
    darkMode: 'class',
    theme: {
        extend: {},
    },
    plugins: [require('@headlessui/tailwindcss')],
    daisyui: {
        themes: [
            {
                dark: {
                    primary: '#793ef9',
                    'primary-focus': '#570df8',
                    'primary-content': '#ffffff',

                    secondary: '#f000b8',
                    'secondary-focus': '#bd0091',
                    'secondary-content': '#ffffff',

                    accent: '#37cdbe',
                    'accent-focus': '#2ba69a',
                    'accent-content': '#ffffff',

                    neutral: '#2a2e37',
                    'neutral-focus': '#16181d',
                    'neutral-content': '#ffffff',

                    'base-100': '#3b424e',
                    'base-200': '#2a2e37',
                    'base-300': '#16181d',
                    'base-content': '#ebecf0',

                    info: '#66c7ff',
                    success: '#87cf3a',
                    warning: '#e1d460',
                    error: '#ff6b6b',

                    '--rounded-box': '1rem',
                    '--rounded-btn': '.5rem',
                    '--rounded-badge': '1.9rem',

                    '--animation-btn': '.25s',
                    '--animation-input': '.2s',

                    '--btn-text-case': 'uppercase',
                    '--navbar-padding': '.5rem',
                    '--border-btn': '1px',
                },
            },
            {
                dracula: {
                    primary: '#ffb3d9',
                    'primary-focus': '#ff80bf',
                    'primary-content': '#1b1c22',

                    secondary: '#b9ffb3',
                    'secondary-focus': '#8aff80',
                    'secondary-content': '#1b1c22',

                    accent: '#ffffb3',
                    'accent-focus': '#ffff80',
                    'accent-content': '#1b1c22',

                    neutral: '#22212c',
                    'neutral-focus': '#1b1c22',
                    'neutral-content': '#d5ccff',

                    'base-100': '#302f3d',
                    'base-200': '#22212c',
                    'base-300': '#1b1c22',
                    'base-content': '#d5ccff',

                    info: '#1c92f2',
                    success: '#009485',
                    warning: '#ff9900',
                    error: '#ff5724',

                    '--rounded-box': '1rem',
                    '--rounded-btn': '.5rem',
                    '--rounded-badge': '1.9rem',

                    '--animation-btn': '.25s',
                    '--animation-input': '.2s',

                    '--btn-text-case': 'uppercase',
                    '--navbar-padding': '.5rem',
                    '--border-btn': '1px',
                },
            },
        ],
    },
};
