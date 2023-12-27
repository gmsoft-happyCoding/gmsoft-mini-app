module.exports = {
  presets: [["@babel/preset-env", { modules: "cjs" }], "@linaria"],
  plugins: ["@babel/plugin-transform-runtime"],
};
