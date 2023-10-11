/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{html,js,tsx,jsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        muni: "#0000dcff",
        secondary: "#dcdc00",
        danger: "#dc0000",
        success: "#00dc00",
      },
    },
  },
};
