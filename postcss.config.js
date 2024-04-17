// postcss.config.js

const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = {
  plugins: [
    // connect autoprefixer
    autoprefixer,
    // pass an object with options upon connecting cssnano:
    cssnano({ preset: "default" }), // set default minification settings
  ],
};
