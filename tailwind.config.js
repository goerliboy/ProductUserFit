/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Windows 98 color palette with teal gradient
        win98: {
          gray: '#c0c0c0',
          'gray-light': '#dfdfdf',
          'gray-dark': '#808080',
          'gray-darker': '#404040',
          teal: '#008080',
          'teal-light': '#20b2aa',
          'teal-dark': '#006666',
          'teal-darker': '#004d4d',
          black: '#000000',
          white: '#ffffff',
          'button-face': '#c0c0c0',
          'button-shadow': '#808080',
          'button-dark-shadow': '#404040',
          'button-light': '#dfdfdf',
          'button-highlight': '#ffffff',
          'window-frame': '#c0c0c0',
          'title-bar': '#008080',
          'title-bar-inactive': '#808080',
        },
        background: {
          light: '#c0c0c0',
          dark: '#c0c0c0'
        },
        card: {
          light: '#c0c0c0',
          dark: '#c0c0c0'
        },
        text: {
          primary: '#000000',
          secondary: '#404040'
        }
      },
      fontFamily: {
        'win98': ['MS Sans Serif', 'Tahoma', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'win98-inset': 'inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff',
        'win98-outset': 'inset -1px -1px #808080, inset 1px 1px #ffffff, inset -2px -2px #404040, inset 2px 2px #dfdfdf',
        'win98-pressed': 'inset -1px -1px #ffffff, inset 1px 1px #808080, inset -2px -2px #dfdfdf, inset 2px 2px #404040',
        'win98-window': '2px 2px 4px rgba(0,0,0,0.3)',
      },
      backgroundImage: {
        'win98-gradient': 'linear-gradient(90deg, #008080 0%, #20b2aa 50%, #008080 100%)',
        'win98-gradient-vertical': 'linear-gradient(180deg, #008080 0%, #20b2aa 50%, #008080 100%)',
      },
      animation: {
        'win98-blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        }
      }
    },
  },
  plugins: [],
};