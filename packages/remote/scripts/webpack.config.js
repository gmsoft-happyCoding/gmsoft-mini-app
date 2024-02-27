const path = require("path");

const { DllPlugin, ProgressPlugin } = require("webpack");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const PRO_DLL_LIBRARY = [
  "react",
  "react-dom",
  "redux",
  "react-redux",
  "redux-saga",
  "dva-core",
  "dva-loading",
  "dva-model-creator",
  "@linaria/react",
  "@linaria/core",
  "@gmsoft-mini-app/react-hanger",
  "@gmsoft-mini-app/state-container",
];

const DEV_DLL_LIBRARY = PRO_DLL_LIBRARY.concat("react-reconciler");

module.exports = function configFactory(params) {
  const {
    mode = "development",
    globalObject = "wx",
    entry = "remote",
    outputPath = "./",
  } = params;

  return {
    mode,
    devtool: false,
    context: process.cwd(),
    entry: {
      [entry]: mode === "development" ? DEV_DLL_LIBRARY : PRO_DLL_LIBRARY,
    },
    target: ["web", "es5"],
    output: {
      path: path.resolve(process.cwd(), "./dist", outputPath),
      filename: "[name].js",
      library: {
        name: "[name]",
        type: "global",
      },
      globalObject,
    },
    resolve: {
      symlinks: true,
      extensions: [".js", ".jsx"],
      mainFields: ["browser", "module", "jsnext:main", "main"], // taro 模块解析字段序列  必须与  taro 的 策略保持一致，因为webpack对模块的识别是通过包path识别的
    },
    module: {
      rules: [
        {
          test: /\.(?:js|mjs|cjs)$/,
          use: [
            {
              loader: "babel-loader",
            },
            {
              loader: "@linaria/webpack-loader",
              options: {
                sourceMap: mode !== "production",
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new ProgressPlugin(),
      new CleanWebpackPlugin(),
      new DllPlugin({
        context: path.resolve(process.cwd(), "../../"),
        path: path.resolve(process.cwd(), "./dist", outputPath, "[name].json"),
        name: "[name]",
        format: true,
      }),
    ],
  };
};
