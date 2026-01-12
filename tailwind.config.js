/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0f172a', // slate-900
                    light: '#2563eb', // blue-600
                },
                slate: {
                    100: '#f1f5f9',
                    900: '#0f172a',
                },
                blue: {
                    600: '#2563eb',
                },
                green: {
                    600: '#16a34a',
                },
                red: {
                    600: '#dc2626',
                }
            },
            fontFamily: {
                sans: ['Cairo', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
