let defaultConfig = require("tailwindcss/defaultConfig")();

let theme = {
  transparent: "transparent",
  muni: "#0000dc",
  secondary: "#dcdc00",
  danger: "#dc0000",
  success: "#00dc00"
};

const colors = Object.assign({}, theme, defaultConfig.colors);

module.exports = {
  colors: colors,
  textColors: colors,
  backgroundColors: colors
};
