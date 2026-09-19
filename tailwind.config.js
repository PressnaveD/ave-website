/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F7F5F0',
        ink: '#111111',
        charcoal: '#2A2A2A',
        beige: '#D8CFC2',
        olive: '#626653',
        maroon: '#4B1F26',
        forest: '#00594C',
        muted: '#8A8578',
        line: '#E5E1D8',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.22em',
        widest3: '0.32em',
      },
      transitionTimingFunction: {
        lux: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        reveal: {
          '0%': { transform: 'scale(1.06)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        drawerIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both',
        fadeIn: 'fadeIn 0.6s ease both',
        reveal: 'reveal 1.1s cubic-bezier(0.22,1,0.36,1) both',
        drawerIn: 'drawerIn 0.4s cubic-bezier(0.22,1,0.36,1) both',
      },
    },
  },
  plugins: [],
};