module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        center: '100px minmax(300px, auto) 100px',
      },
      gridTemplateRows: {
        // Complex site-specific row configuration
        layout: '50px auto 400px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
