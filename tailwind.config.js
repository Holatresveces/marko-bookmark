module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
        Inconsolata: ["Inconsolata", "monospace"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
