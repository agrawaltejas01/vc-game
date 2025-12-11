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
          50: '#F0F6FE',
          100: '#E3EDFE',
          200: '#B8D5FC',
          300: '#8CBDFA',
          400: '#61A5F8',
          500: '#1B6DF1',
          600: '#1557C1',
          700: '#0F3E8A',
          800: '#0A2B5C',
          900: '#051A35',
        },
        accent: {
          cyan: {
            DEFAULT: '#A8B0B5',
            light: '#E8EAEC',
            dark: '#7A8489',
          },
          gold: {
            DEFAULT: '#C8A951',
            light: '#F5EFD9',
            dark: '#9B8240',
          },
          blue: {
            DEFAULT: '#1B6DF1',
            light: '#E3EDFE',
            dark: '#1557C1',
          },
          orange: {
            DEFAULT: '#FF6A00',
            light: '#FFE8D6',
            dark: '#CC5500',
          },
          beige: {
            DEFAULT: '#D7C49E',
            light: '#F3EFE5',
            dark: '#B8A57E',
          },
        },
        semantic: {
          success: '#08EF08',
          successLight: '#E0FCE0',
          error: '#FF6961',
          errorLight: '#FFE5E3',
          warning: '#C8A951',
          warningLight: '#F5EFD9',
          info: '#A8B0B5',
          infoLight: '#E8EAEC',
        },
      },
      boxShadow: {
        'btn': '0 1px 3px 0 rgba(192, 192, 192, 0.4)',
        'chip': '0 1px 2px 0 rgba(192, 192, 192, 0.3)',
        'sm': '0 1px 2px 0 rgba(192, 192, 192, 0.25)',
        'md': '0 4px 6px -1px rgba(192, 192, 192, 0.3)',
        'lg': '0 10px 15px -3px rgba(192, 192, 192, 0.35)',
        '2xl': '0 25px 50px -12px rgba(192, 192, 192, 0.4)',
      },
      fontFamily: {
        sans: ['Exo 2', 'sans-serif'],
        heading: ['Orbitron', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
