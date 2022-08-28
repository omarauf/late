const plugin = require('tailwindcss/plugin');

const base = plugin(({ addBase, theme }) => {
  addBase({
    html: {
      margin: '0',
      padding: '0',
      boxSizing: 'border-box',
      fontFamily: 'Public Sans,sans-serif',
    },
    p: { fontSize: theme('fontSize.sm') },
    h1: { fontSize: theme('fontSize.2xl') },
    h2: { fontSize: theme('fontSize.xl') },
    h3: { fontSize: theme('fontSize.lg') },
    h4: { fontSize: theme('fontSize.base') },
    h5: { fontSize: theme('fontSize.sm') },
    h6: { fontSize: theme('fontSize.xs') },
  });
});

module.exports = base;
