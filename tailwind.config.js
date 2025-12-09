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
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#7B61FF',
          600: '#6d51e6',
          700: '#5b3fd9',
          800: '#4a32b3',
          900: '#3a258c',
        },
        accent: {
          cyan: {
            DEFAULT: '#2ED3C8',
            light: '#d1f5f2',
            dark: '#1fb5ab',
          },
          gold: {
            DEFAULT: '#E2A500',
            light: '#fef8e6',
            dark: '#c99000',
          },
          blue: {
            DEFAULT: '#3A5AFF',
            light: '#e8ecff',
            dark: '#2a45e6',
          },
        },
        semantic: {
          success: '#16a34a',
          successLight: '#dcfce7',
          error: '#dc2626',
          errorLight: '#fee2e2',
          warning: '#E2A500',
          warningLight: '#fef8e6',
        },
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
