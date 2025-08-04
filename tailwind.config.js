/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e1e9fe',
          200: '#c7d6fd',
          300: '#a5b8fb',
          400: '#8191f7',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#001E56', // RVB(0,30,86)
          950: '#001742', // Plus foncé
        },
        accent: {
          50: '#fefbf3',
          100: '#fef5e0',
          200: '#fdeabd',
          300: '#fbdb8e',
          400: '#f8c857',
          500: '#D29F13', // RVB(210,159,19)
          600: '#ca8b0a',
          700: '#a8720a',
          800: '#885b0f',
          900: '#714a10',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        scaleIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
      },
    },
  },
  plugins: [],
};