module.exports = {
  plugins: [
    require("tailwindcss")("./tailwind.theme.js"),
    require("autoprefixer"),
    require("postcss-import"),
    require("postcss-nested"),
    require("postcss-custom-properties"),
    require("postcss-preset-env")({ stage: 1 })
  ]
};
