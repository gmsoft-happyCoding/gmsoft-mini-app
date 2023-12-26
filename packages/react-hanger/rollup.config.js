const commonjs = require("@rollup/plugin-commonjs");

const typescript = require("@rollup/plugin-typescript");

const babel = require("@rollup/plugin-babel");

module.exports = {
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "cjs",
    sourcemap: true,
  },
  external: ["lodash", "react", "redux", "react-redux", "lodash/debounce"],
  plugins: [commonjs(), typescript(), babel({ babelHelpers: "bundled" })],
};
