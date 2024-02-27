module.exports = {
  sourceType: "module",
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          ios: "9",
          android: "5",
        },
      },
    ],
  ],
  //  plugins: [["@babel/plugin-transform-runtime"]], // 因为是打包成一个 js  所以 并不需要 将 helpers 函数进行 模块处理
};
