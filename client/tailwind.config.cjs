const forms = require('@tailwindcss/forms');

const base = require('./style/base.cjs');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#00ab55',
      },
      animation: {
        ripple: '0.3s ease 1 forwards rippleEffect',
        ripple2: 'ripple 600ms linear',
        enter: 'enter 200ms ease-out',
        leave: 'leave 150ms ease-in forwards',
        skeleton: 'skeletonLoading 1s linear infinite alternate',
      },
      keyframes: {
        rippleEffect: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '25%': { transform: 'scale(10)', opacity: '0.375' },
          '100%': { transform: 'scale(35)', opacity: '0' },
        },
        rippleEffect2: {
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        enter: {
          '0%': { transform: 'scale(0.9) translateX(100%)', opacity: 0 },
          '100%': { transform: 'scale(1) translateX(0px)', opacity: 1 },
        },
        leave: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '100%': { transform: 'scale(0.9)', opacity: 0 },
        },
        skeletonLoading: {
          '0%': { backgroundColor: 'hsl(200, 20%, 20%)', opacity: 0.7 },
          '100%': { backgroundColor: 'hsl(200, 20%, 20%)', opacity: 0.7 },
        },
      },
    },
  },
  variants: {
    extend: {
      // animation: ['active', 'hover', 'focus'],
      transitionProperty: ['hover', 'focus'],
      backgroundColor: ['active', 'hover', 'focus'],
    },
  },
  plugins: [forms, base],
};
