module.exports = {
  presets: [["@babel/preset-env"]],
  // plugins: [["@babel/plugin-transform-runtime"]],  // 因为是打包成一个 js  所以 并不需要 将 helpers 函数进行 模块处理
};
