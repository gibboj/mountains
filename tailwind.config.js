module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        center: "100px minmax(300px, auto) 100px",
      },
      gridTemplateRows: {
        // Complex site-specific row configuration
        layout: "40px auto 500px",
      },
      minWidth: {
        "min-w-400": "400px",
      },
      transitionProperty: {
        height: "height, visibility",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
