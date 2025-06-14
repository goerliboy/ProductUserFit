/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          light: '#f9fafb',
          dark: '#111827'
        },
        card: {
          light: '#ffffff',
          dark: '#1f2937'
        },
        text: {
          primary: '#374151',
          secondary: '#6b7280'
        },
        indigo: {
          light: '#e0e7ff',
          DEFAULT: '#6366f1',
          dark: '#4f46e5'
        }
      }
    },
  },
  plugins: [],
};